require("dotenv").config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    dialect: process.env.DIALECT || "mysql",
    host: process.env.HOST,
  }
);
console.log("ENV VALUES", process.env.HOST)
try {
  sequelize.authenticate();
  console.log("Connection has been established.");
} catch (error) {
  console.log("Unable to connect to the database", error);
}

module.exports = sequelize;

// require("dotenv").config();
// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(
//   process.env.DATABASE,
//   process.env.USERNAME,
//   process.env.PASSWORD,
//   {
//     dialect: process.env.DIALECT || "mysql",
//     host: process.env.HOST,
//   }
// );

// // Authenticating and logging success message
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection to the database has been established successfully.");
//   })
//   .catch((error) => {
//     console.error("Unable to connect to the database:", error);
//   });
// module.exports = sequelize;
