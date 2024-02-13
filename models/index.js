const Sequelize = require("sequelize");
const path = require('path');
const dbConfig = require('../config/dbConfig');
const fs = require('fs');
const basename = path.basename(__filename);

const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    dialect: dbConfig.DIALECT || 'mysql',
    host: dbConfig.HOST,
  });
const db = {};
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.models = {};

db.models.models = require('./user')(sequelize, Sequelize.DataTypes);

module.exports = db;
