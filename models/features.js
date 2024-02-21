'use strict';
const {
  Model,
  UUID,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  Feature.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUID
    },
    colour: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    style: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, 
  {
    sequelize,
    tableName: 'Features',
    modelName: 'Feature',
  });
  return Feature;
};