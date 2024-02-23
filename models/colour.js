'use strict';
const {
  Model,
  UUID,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Colour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  Colour.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUID
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    colour: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, 
  {
    sequelize,
    tableName: 'Colours',
    modelName: 'Colour',
    paranoid: true,
  });
  return Colour;
};