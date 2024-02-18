'use strict';
const {
  Model,
  UUID,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUID,
      primaryKey: true,
      allowNull: false
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: DataTypes.INTEGER,
    order_number: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'Orders',
    modelName: 'Order',
    freezeTableName: true,
    paranoid: false
  });
  return Order;
};