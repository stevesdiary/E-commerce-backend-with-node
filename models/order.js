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
      Order.belongsTo(models.Product, {foreignKey: 'product_id' });
      Order.belongsTo(models.User, {foreignKey: 'user_id' })
    }
  }
  Order.init({
    order_id: {
      type: DataTypes.UUID,
      defaultValue: UUID,
      primaryKey: true,
      allowNull: false
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    quantity: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    order_number: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(['Successful', 'Pending', 'Failed']),
      allowNull: false,
      validate: {
        notNull: {
          msg: `Status must be one of 'Successful', 'Pending' or 'Failed'`
        }
      }
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