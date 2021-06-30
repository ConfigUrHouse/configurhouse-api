import { groupBy } from 'lodash';
import { ErrorHandler } from '../../middleware/error-handler';
import { Consommations } from '../configuration/configuration.service';
import { ConsommationHouseModelPosteConso } from '../consommation-house-model-poste-conso/consommation-house-model-poste-conso.class';
import { Consommation } from '../consommation/consommation.class';
import { OptionConf } from '../option-conf/option-conf.class';
import { PosteConso } from '../poste-conso/poste-conso.class';
import { ValuePosteConso } from '../value-poste-conso/value-poste-conso.class';
import { Value } from '../value/value.class';
import { HouseModel } from './house-model.class';

interface EstimateValue {
  value: Value;
  option: OptionConf;
}

interface Estimate {
  estimate: EstimateValue[];
  total: number;
  title: string;
}

export default class HouseModelService {
  public static async getEstimate(id: number): Promise<Estimate> {
    const model = await HouseModel.findByPk(id, {
      include: ['optionConfs'],
    });
    if (!model) {
      throw new ErrorHandler(404, 'HouseModel not found');
    }

    const estimate: EstimateValue[] = [];
    for (const option of model.optionConfs) {
      const value = await Value.findOne({ where: { is_default: true, id_OptionConf: option.id } });
      if (value) {
        estimate.push({ value, option });
      }
    }

    const total = estimate
      .map((e) => e.value.price)
      .reduce((sum, val) => parseFloat(sum.toString()) + parseFloat(val.toString()), 0);

    return {
      estimate,
      total,
      title: `Devis du modèle ${model.name}`,
    } as Estimate;
  }

  public static async getConsommations(id: number, valuesId?: number[]): Promise<Consommations> {
    const whereClause = valuesId ? { id: valuesId } : { is_default: 1 };
    const houseModel = await HouseModel.findByPk(id, {
      include: [
        {
          model: OptionConf,
          as: 'optionConfs',
          include: [
            {
              model: Value,
              as: 'values',
              where: whereClause,
              include: [
                {
                  model: ValuePosteConso,
                  as: 'valuePosteConsos',
                  include: [
                    {
                      model: PosteConso,
                      as: 'posteConso',
                      attributes: ['name', 'description'],
                    },
                  ],
                  attributes: ['conso'],
                },
              ],
            },
          ],
          attributes: ['name'],
        },
        {
          model: ConsommationHouseModelPosteConso,
          as: 'consommationHouseModelPosteConsos',
          include: [
            {
              model: Consommation,
              as: 'consommation',
            },
            {
              model: PosteConso,
              as: 'posteConso',
            },
          ],
        },
      ],
      attributes: ['name', 'occupants'],
    });
    if (!houseModel) throw new ErrorHandler(404, `House Model with id '${id}' not found`);
    const consoReference = houseModel.consommationHouseModelPosteConsos
      .filter((consommationHouseModelPosteConso) => consommationHouseModelPosteConso.consommation.is_reference === 1)
      .map((consommationHouseModelPosteConso) => ({
        conso: consommationHouseModelPosteConso.consommation.conso,
        posteConso: {
          name: consommationHouseModelPosteConso.posteConso.name,
          description: consommationHouseModelPosteConso.posteConso.description,
        },
      }));
    const consoBase = houseModel.consommationHouseModelPosteConsos.filter(
      (consommationHouseModelPosteConso) => consommationHouseModelPosteConso.consommation.is_reference === 0
    );
    const consoBaseTotal = consoBase.reduce((a, b) => a + b.consommation.conso, 0);
    const globalReference = consoReference.reduce((a, b) => a + b.conso, 0);
    const valuePosteConsos = houseModel.optionConfs.flatMap((optionConf) => optionConf.values[0].valuePosteConsos);
    const posteConsos = groupBy(valuePosteConsos, (valuePosteConso) => valuePosteConso.posteConso.name);
    const consoBasePosteConsos = groupBy(
      consoBase,
      (consommationHouseModelPosteConso) => consommationHouseModelPosteConso.posteConso.name
    );
    const consoBaseByPoste = Object.keys(consoBasePosteConsos).map((posteConso) => ({
      posteConso,
      conso: consoBasePosteConsos[posteConso].reduce((a, b) => a + b.consommation.conso, 0),
    }));
    const consoOptionsByPoste = Object.keys(posteConsos).map((posteConso) => ({
      posteConso,
      conso: posteConsos[posteConso].reduce((a, b) => a + b.conso, 0),
    }));
    const consoConfigByPoste = consoBaseByPoste
      .concat(consoOptionsByPoste)
      .reduce((a: Array<{ posteConso: string; conso: number }>, b) => {
        const index = a.findIndex((item) => item.posteConso === b.posteConso);
        if (index === -1) {
          return a.concat(b);
        } else {
          a[index].conso += b.conso;
          return a;
        }
      }, []);
    const globalConfig = valuePosteConsos.reduce((a, b) => a + b.conso, 0) + consoBaseTotal;
    const diffPercentage = Math.round(((globalConfig - globalReference) / globalReference) * 100);
    return {
      context: {
        occupants: houseModel.occupants,
        options: houseModel.optionConfs.map((optionConf) => ({
          option: optionConf.name,
          value: optionConf.values[0].name,
        })),
      },
      global: {
        reference: globalReference,
        config: globalConfig,
        diffPercentage: diffPercentage >= 0 ? '+' + diffPercentage + '%' : diffPercentage + '%',
      },
      byPosteConso: {
        reference: consoReference.map((conso) => ({
          ...conso,
          percentageOfGlobal: Math.round((conso.conso / globalReference) * 100),
        })),
        config: consoConfigByPoste.map((conso) => {
          const reference = consoReference.find((someConso) => someConso.posteConso.name === conso.posteConso);
          const diffPercentageOfPosteConsoReference = Math.round(
            ((conso.conso - (reference as any).conso) / (reference as any).conso) * 100
          );
          return {
            ...conso,
            percentageOfGlobalConfig: Math.round((conso.conso / globalConfig) * 100),
            diffPercentageOfPosteConsoReference:
              diffPercentageOfPosteConsoReference >= 0
                ? '+' + diffPercentageOfPosteConsoReference + '%'
                : diffPercentageOfPosteConsoReference + '%',
          };
        }),
      },
    };
  }
}
