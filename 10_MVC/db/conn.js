const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nodemvc2", "root", "Franqueza1-", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Conectado ao banco");
} catch (error) {
  console.log("Não foi possível conectar " + error);
}

module.exports = sequelize;
