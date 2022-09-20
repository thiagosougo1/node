const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("nodesequelize", "root", "Franqueza1-", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
