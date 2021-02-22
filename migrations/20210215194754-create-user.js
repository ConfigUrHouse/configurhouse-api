'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      email: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING(50),
        field: 'first_name',
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(50),
        field: 'last_name',
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING(128),
        field: 'phone_number',
        allowNull: true,
      },
      emailVerifiedAt: {
        type: Sequelize.DATE,
        field: 'email_verified_at',
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User');
  },
};
