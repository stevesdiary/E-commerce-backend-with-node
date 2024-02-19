'use strict';
const {
  Model,
  UUID,
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
      Product.hasMany(models.ProductDetail, { foreignKey: 'product_id', type: DataTypes.UUID, as: 'products' });
      
    }
  }
  Product.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey:true,
      defaultValue: UUID
    },
    descripption: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Product description cannot be empty.",
        },
      },
    },
  }, {
    sequelize,
    tableName: 'Products',
    modelName: 'Product',
    freezeTableName: true,
    paranoid: true
  });
  return Product;
};