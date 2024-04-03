'use strict';
const {
  Model,
  UUID
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WishList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Price.belongsTo(models.Product, {foreignKey: 'price_id' });
    }
  }
  WishList.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUID
    },
    product_id: {
      type: DataTypes.SRING,
      allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false,
      },
    discount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
    sale_price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
  }, {
    sequelize,
    tableName: 'WishLists',
    modelName: 'Wishlist',
    freezeTableName: true,
    paranoid: true
  });
  return WishList;
};