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
      Price.belongsTo(models.Product, {foreignKey: 'price_id' });
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
        defaultValue: 0
      },
    sale_price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
  }, {
    sequelize,
    tableName: 'Price',
    modelName: 'Price',
    freezeTableName: true,
    paranoid: true
  });
  return Price;
};