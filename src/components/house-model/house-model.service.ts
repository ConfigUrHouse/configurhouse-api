import { ErrorHandler } from '../../middleware/error-handler';
import { OptionConf } from '../option-conf/option-conf.class';
import { Value } from '../value/value.class';
import { HouseModel } from './house-model.class';

export interface EstimateValue {
  value: Value;
  option: OptionConf;
}

export interface Estimate {
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
}
