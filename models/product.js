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
      Product.hasMany(models.Size, { foreignKey: 'size_id', type: DataTypes.UUID, as: 'size' });
      Product.hasMany(models.Order, { foreignKey: 'order_id', type: DataTypes.UUID, as: 'order' });
      Product.hasMany(models.Colour, { foreignKey: 'colour_id', type: DataTypes.UUID, as: 'colour' });
      Product.hasMany(models.Image, { foreignKey: 'image_id', type: DataTypes.UUID, as: 'image' });
      Product.hasMany(models.Quantity, { foreignKey: 'quantity_id', type: DataTypes.UUID, as: 'quantity' });
    }
  }
  Product.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey:true,
      defaultValue: UUID
    },
    colour_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    quantity_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Product description cannot be empty.",
        },
      },
    },
    in_stock: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
    
  }, {
    sequelize,
    tableName: 'Products',
    modelName: 'Product',
    freezeTableName: true,
    paranoid: true
  });
  return Product;
};