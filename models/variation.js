'use strict';
const {
  Model,
  UUIDV4
} = require('sequelize');
const product = require('./product');
module.exports = (sequelize, DataTypes) => {
  class Variation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Variation.belongsTo(models.Product, {as: 'products', targetKey: 'product_id', sourceKey: 'product_id', foreignKey: 'product_id'});
    }
  }
  Variation.init({
    variation_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      allowNull: false
    },
    product_id: {
      type: DataTypes.STRING,
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