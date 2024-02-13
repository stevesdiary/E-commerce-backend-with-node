'use strict';
const {
  Model,
  UUIDV4,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey:true,
      defaultValue: UUIDV4
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Product name cannot be empty.",
        },
      },
    },
  }, {
    sequelize,
    tableName: 'Product',
    modelName: 'Product',
    freezeTableName: true,
    paranoid: true
  });
  return Product;
};