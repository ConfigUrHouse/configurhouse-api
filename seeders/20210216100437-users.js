'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'User',
      [
        {
          email: 'johnmcclane@yipee-ki-yay-motherfucker.com',
          password: '$2a$08$iX2wl04gXsz7QRBqzwxSzO18rCodIpJwdz03SOJ/kEg',
          first_name: 'John',
          last_name: 'MCCLANE',
          phone_number: null,
          email_verified_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: 'doc@back-to-the-future.com',
          password: '$2a$08$iX2wl04gXsz7QRBqzwxSzO18rCodIpJwdz03SOJ/kEg',
          first_name: 'Emmett',
          last_name: 'BROWN',
          phone_number: '+0699999999',
          email_verified_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: 'barney@awesome.com',
          password: '$2a$08$3VBieeL1ZBCEfexSYJiXheEdRofwSmufYfmODfHDYve',
          first_name: 'Barney',
          last_name: 'STINSON',
          phone_number: '+351483773',
          email_verified_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User', null, {});
  },
};
