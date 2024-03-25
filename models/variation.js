'use strict';
const {
  Model,
  UUID
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Variation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Variation.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUID,
      allowNull: false
    },
    colour: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true
    },
    style: {
      type: DataTypes.STRING,
      allowNull: true
    },
    quantity: {
      type: DataTypes.TINYINT,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'Variations',
    modelName: 'Variation',
    freezeTableName: true,
    paranoid: true
  });
  return Variation;
};