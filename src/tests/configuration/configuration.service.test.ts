import { Configuration } from '../../components/configuration/configuration.class';
import ConfigurationService from '../../components/configuration/configuration.service';
import { testHelpers } from '../__mocks__/test-helpers';

describe('Configuration Service', () => {
  const configuration = {
    name: 'Configuration T2',
    configurationValues: [
      {
        id_Value: 1,
        value: {
          name: 'Pompe à chaleur',
          optionConf: {
            name: 'Système de chauffage',
          },
          valuePosteConsos: [
            {
              conso: 80,
              posteConso: {
                name: 'Chauffage',
                description: 'Energie consommée par les équipements de chauffage',
              },
            },
            {
              conso: 90,
              posteConso: {
                name: 'Eau chaude',
                description: "Energie consommée pour la production d'eau chaude",
              },
            },
          ],
        },
      },
      {
        id_Value: 3,
        value: {
          name: 'Bois',
          optionConf: {
            name: 'Charpente',
          },
          valuePosteConsos: [
            {
              conso: 150,
              posteConso: {
                name: 'Chauffage',
                description: 'Energie consommée par les équipements de chauffage',
              },
            },
          ],
        },
      },
    ],
    houseModel: {
      id: 1,
      name: 'T2',
      occupants: 2,
      id_ModelType: 1,
      id_Asset: 1,
      consommationHouseModelPosteConsos: [
        {
          id_HouseModel: 1,
          id_PosteConso: 1,
          id_Consommation: 2,
          consommation: {
            id: 2,
            name: 'Chauffage référence 2 personnes 30m²',
            conso: 4092,
            is_reference: 1,
          },
          posteConso: {
            id: 1,
            name: 'Chauffage',
            description: 'Energie consommée par les équipements de chauffage',
          },
        },
        {
          id_HouseModel: 1,
          id_PosteConso: 2,
          id_Consommation: 3,
          consommation: {
            id: 3,
            name: 'Eau chaude référence 2 personnes 30m²',
            conso: 462,
            is_reference: 1,
          },
          posteConso: {
            id: 2,
            name: 'Eau chaude',
            description: "Energie consommée pour la production d'eau chaude",
          },
        },
        {
          id_HouseModel: 1,
          id_PosteConso: 3,
          id_Consommation: 1,
          consommation: {
            id: 1,
            name: 'Ampoules',
            conso: 200,
            is_reference: 0,
          },
          posteConso: {
            id: 3,
            name: 'Eclairage',
            description: "Energie consommée pour l'éclairage",
          },
        },
        {
          id_HouseModel: 1,
          id_PosteConso: 3,
          id_Consommation: 4,
          consommation: {
            id: 4,
            name: 'Eclairage référence 2 personnes 30m²',
            conso: 100,
            is_reference: 1,
          },
          posteConso: {
            id: 3,
            name: 'Eclairage',
            description: "Energie consommée pour l'éclairage",
          },
        },
      ],
    },
  };

  afterEach(() => {
    testHelpers.resetAll();
  });

  describe('getConsommations', () => {
    it('should return estimated consommation for a configuration', async () => {
      jest.spyOn(Configuration, 'findByPk').mockResolvedValue(configuration as any);

      const result = await ConfigurationService.getConsommations(1);

      expect(result).toEqual({
        context: {
          occupants: 2,
          options: [
            {
              option: 'Système de chauffage',
              value: 'Pompe à chaleur',
            },
            {
              option: 'Charpente',
              value: 'Bois',
            },
          ],
        },
        title: 'Configuration T2',
        global: {
          reference: 4654,
          config: 520,
          diffPercentage: '-89',
        },
        byPosteConso: {
          reference: [
            {
              conso: 4092,
              posteConso: {
                name: 'Chauffage',
                description: 'Energie consommée par les équipements de chauffage',
              },
              percentageOfGlobal: 88,
            },
            {
              conso: 462,
              posteConso: {
                name: 'Eau chaude',
                description: "Energie consommée pour la production d'eau chaude",
              },
              percentageOfGlobal: 10,
            },
            {
              conso: 100,
              posteConso: {
                name: 'Eclairage',
                description: "Energie consommée pour l'éclairage",
              },
              percentageOfGlobal: 2,
            },
          ],
          config: [
            {
              posteConso: 'Eclairage',
              conso: 200,
              percentageOfGlobalConfig: 38,
              diffPercentageOfPosteConsoReference: '+100',
            },
            {
              posteConso: 'Chauffage',
              conso: 230,
              percentageOfGlobalConfig: 44,
              diffPercentageOfPosteConsoReference: '-94',
            },
            {
              posteConso: 'Eau chaude',
              conso: 90,
              percentageOfGlobalConfig: 17,
              diffPercentageOfPosteConsoReference: '-81',
            },
          ],
        },
      });
    });
  });
});
