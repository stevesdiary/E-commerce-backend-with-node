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
      Order.belongsTo(models.Product, {foreignKey: 'order_id', as: 'order' });
    }
  }
  Order.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUID,
      primaryKey: true,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(6,2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    order_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    }
  }, {
    sequelize,
    tableName: 'Orders',
    modelName: 'Order',
    freezeTableName: true,
    paranoid: true
  });
  return Order;
};