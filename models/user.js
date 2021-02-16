'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
    firstName: {
      type: new DataTypes.STRING(50),
      field: "first_name",
      allowNull: false,
    },
    lastName: {
      type: new DataTypes.STRING(50),
      field: "last_name",
      allowNull: false,
    },
    phoneNumber: {
      type: new DataTypes.STRING(128),
      field: "phone_number",
      allowNull: true,
    },
    emailVerifiedAt: {
      type: DataTypes.DATE,
      field: "email_verified_at",
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};