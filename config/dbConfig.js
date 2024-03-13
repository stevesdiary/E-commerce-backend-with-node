require("dotenv").config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  database = process.env.DATABASE,
  username = process.env.USERNAME,
  password = process.env.PASSWORD,
  {
    dialect: process.env.DIALECT || "mysql",
    host: process.env.HOST,
  }
);

try {
  sequelize.authenticate();
  console.log("Connection has been established.");
} catch (error) {
  console.log("Unable to connect to the database", error);
}

module.exports = sequelize;