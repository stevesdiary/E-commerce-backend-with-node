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
      Product.hasMany(models.Variation, { foreignKey: 'variation_id', type: DataTypes.UUID, as: 'variation' });
      // Product.hasMany(models.Size, { foreignKey: 'size_id', type: DataTypes.UUID, as: 'size' });
      // Product.hasMany(models.Order, { foreignKey: 'order_id', type: DataTypes.UUID, as: 'order' });
      // Product.hasMany(models.Colour, { foreignKey: 'colour_id', type: DataTypes.UUID, as: 'colour' });
      Product.hasMany(models.Image, { foreignKey: 'image_id', type: DataTypes.UUID, as: 'image' });
      // Product.hasMany(models.Quantity, { foreignKey: 'quantity_id', type: DataTypes.UUID, as: 'quantity' });
    }
  }
  Product.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey:true,
      defaultValue: UUID
    },
    // variation_id: {
    //   type: DataTypes.STRING,
    //   allowNull: true
    // },
    // image_id: {
    //   type: DataTypes.STRING,
    //   allowNull: true
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Product name cannot be empty.",
        },
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Product category cannot be empty.",
        },
      },
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