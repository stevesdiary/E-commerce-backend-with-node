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
      Product.hasMany(models.Price, { foreignKey: 'price_id', type: DataTypes.UUID, as: 'price' });
      Product.hasMany(models.Feature, { foreignKey: 'feature_id', type: DataTypes.UUID, as: 'feature' })
      Product.hasMany(models.Order, { foreignKey: 'order_id', type: DataTypes.UUID, as: 'order' })
    }
  }
  Product.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey:true,
      defaultValue: UUID
    },
    feature_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price_id: {
      type: DataTypes.STRING,
      allowNull: false
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