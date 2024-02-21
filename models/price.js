'use strict';
const {
  Model,
  UUID
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Price.belongsTo(models.Product, {foreignKey: 'price_id', type: DataTypes.UUID, as: 'order' });
    }
  }
  Price.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUID
    },
    price: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false,
      },
    discount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    sale_price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
  }, {
    sequelize,
    tableName: 'Price',
    modelName: 'Price',
    paranoid: true
  });
  return Price;
};