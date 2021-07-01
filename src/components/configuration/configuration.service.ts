import { groupBy } from 'lodash';
import { ErrorHandler } from '../../middleware/error-handler';
import { ConfigurationValue } from '../configuration-value/configuration-value.class';
import { ConsommationHouseModelPosteConso } from '../consommation-house-model-poste-conso/consommation-house-model-poste-conso.class';
import { Consommation } from '../consommation/consommation.class';
import { HouseModel } from '../house-model/house-model.class';
import { OptionConf } from '../option-conf/option-conf.class';
import { PosteConso } from '../poste-conso/poste-conso.class';
import { ValuePosteConso } from '../value-poste-conso/value-poste-conso.class';
import { Value } from '../value/value.class';
import { Configuration } from './configuration.class';

export interface Consommations {
  title: string;
  context: {
    occupants: number;
    options: {
      option: string;
      value: string;
    }[];
  };
  global: {
    reference: number;
    config: number;
    diffPercentage: string;
  };
  byPosteConso: {
    reference: {
      conso: number;
      posteConso: {
        name: string;
        description: string;
      };
      percentageOfGlobal: number;
    }[];
    config: {
      conso: number;
      posteConso: string;
      percentageOfGlobalConfig: number;
      diffPercentageOfPosteConsoReference: string;
    }[];
  };
}

interface EstimateValue {
  value: any;
  option: OptionConf;
}

interface Estimate {
  houseModel: any;
  estimate: EstimateValue[];
  total: string;
  title: string;
}

export default class ConfigurationService {
  public static async getConsommations(id: number): Promise<Consommations> {
    const config = await Configuration.findByPk(id, {
      include: [
        {
          model: ConfigurationValue,
          as: 'configurationValues',
          include: [
            {
              model: Value,
              as: 'value',
              attributes: ['name'],
              include: [
                {
                  model: OptionConf,
                  as: 'optionConf',
                  attributes: ['name'],
                },
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
          attributes: ['id_Value'],
        },
        {
          model: HouseModel,
          as: 'houseModel',
          include: [
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
        },
      ],
      attributes: ['name'],
    });
    if (!config) throw new ErrorHandler(404, `Configuration with id '${id}' not found`);
    const consoReference = config.houseModel.consommationHouseModelPosteConsos
      .filter((consommationHouseModelPosteConso) => consommationHouseModelPosteConso.consommation.is_reference === 1)
      .map((consommationHouseModelPosteConso) => ({
        conso: consommationHouseModelPosteConso.consommation.conso,
        posteConso: {
          name: consommationHouseModelPosteConso.posteConso.name,
          description: consommationHouseModelPosteConso.posteConso.description,
        },
      }));
    const consoBase = config.houseModel.consommationHouseModelPosteConsos.filter(
      (consommationHouseModelPosteConso) => consommationHouseModelPosteConso.consommation.is_reference === 0
    );
    const consoBaseTotal = consoBase.reduce((a, b) => a + b.consommation.conso, 0);
    const globalReference = consoReference.reduce((a, b) => a + b.conso, 0);
    const valuePosteConsos = config.configurationValues.flatMap(
      (configurationValue) => configurationValue.value.valuePosteConsos
    );
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
      title: config.name,
      context: {
        occupants: config.houseModel.occupants,
        options: config.configurationValues.map((configurationValue) => ({
          option: configurationValue.value.optionConf.name,
          value: configurationValue.value.name,
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

  public static async getEstimate(id: number): Promise<Estimate> {
    const configuration = await Configuration.findByPk(id, {
      include: [
        'houseModel',
        {
          model: ConfigurationValue,
          as: 'configurationValues',
          include: [
            {
              model: Value,
              as: 'value',
              include: ['optionConf'],
            },
          ],
        },
      ],
    });
    if (!configuration) {
      throw new ErrorHandler(404, 'Configuration not found');
    }

    const estimate: EstimateValue[] = configuration.configurationValues.map((cv) => ({
      value: { name: cv.value.name, price: parseFloat(cv.value.price.toString()).toFixed(2) },
      option: cv.value.optionConf,
    }));

    const total: number =
      configuration.houseModel.price +
      estimate
        .map((e) => e.value.price)
        .reduce((sum, val) => parseFloat(sum.toString()) + parseFloat(val.toString()), 0);

    return {
      houseModel: { name: configuration.houseModel.name, price: configuration.houseModel.price.toFixed(2) },
      estimate,
      total: total.toFixed(2),
      title: configuration.name,
    };
  }

  public static async linkConfigurationToValues(configuration: Configuration, values: number[]) {
    const optionConfs = await OptionConf.findAll({
      include: ['values'],
      where: { id_HouseModel: configuration.id_HouseModel },
    });

    await ConfigurationValue.destroy({
      where: {
        id_Configuration: configuration.id,
      },
    });

    optionConfs.forEach((oc) => {
      const value = oc.values.find((val) => values.includes(val.id)) || oc.values.find((val) => val.is_default);

      // Use value if it belongs to this optionConf, otherwise use default
      if (value) {
        ConfigurationValue.create({
          id_Value: value.id,
          id_Configuration: configuration.id,
        });
      }
    });
  }
}
