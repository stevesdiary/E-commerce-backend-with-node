'use strict';
const {
  Model,
  UUID
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Size.belongsToMany(models.Product, {foreignKey: 'size_id', as: 'size'})
    }
  }
  Size.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey:true,
      defaultValue: UUID
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'Sizes',
    modelName: 'Size',
    paranoid: true
  });
  return Size;
};