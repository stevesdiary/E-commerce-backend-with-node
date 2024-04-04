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
      WishList.belongsTo(models.User, {foreignKey: 'user_id', type: DataTypes.UUID });
      WishList.belongsTo(models.Product, {foreignKey: 'product_id', type: DataTypes.UUID });
    }
  }
  WishList.init({
    wish_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUID
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "product_id must not be empty"
        }
      }
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "user_id must not be empty"
        }
      }
    },
  }, {
    sequelize,
    tableName: 'WishLists',
    modelName: 'WishList',
    freezeTableName: true,
    paranoid: true
  });
  return WishList;
};