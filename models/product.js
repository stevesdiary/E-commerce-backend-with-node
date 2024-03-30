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
      Product.hasMany(models.Variation, { foreignKey: 'product_id', type: DataTypes.UUID, as: 'variations' });
      // Product.hasMany(models.Image, { foreignKey: 'image_id', type: DataTypes.UUID, as: 'image' });
      // Product.hasMany(models.Quantity, { foreignKey: 'quantity_id', type: DataTypes.UUID, as: 'quantity' });
    }
  }
  Product.init({
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey:true,
      defaultValue: UUIDV4
    },
    variation_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
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

    price: {
      type: DataTypes.FLOAT(5,2),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Price must not be null. Use 0 if it's free"
        }
      }
    },

    discount: {
      type: DataTypes.FLOAT(3,2),
      allowNull: true,
      defaultValue: 0
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