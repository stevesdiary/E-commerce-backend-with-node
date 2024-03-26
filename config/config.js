require('dotenv').config();
const dbConfig = require('./dbConfig')
module.exports = {
  "development": {
    "username": dbConfig.USERNAME,
    "password": dbConfig.PASSWORD,
    "database": dbConfig.DATABASE,
    "host": dbConfig.HOST,
    "dialect": dbConfig.DIALECT
  },
  "test": {
    "username": dbConfig.username,
    "password": dbConfig.password,
    "database": dbConfig.database,
    "host": dbConfig.host,
    "dialect": dbConfig.dialect
  },
  "production": {
    "username": dbConfig.username,
    "password": dbConfig.password,
    "database": dbConfig.database,
    "host": dbConfig.host,
    "dialect": dbConfig.dialect
  }
}
