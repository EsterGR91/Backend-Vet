import { Sequelize } from "sequelize";

const sequelize = new Sequelize("vet_system", "root", "", {
  host: "localhost",
  port: 3306, // Laragon usa 3306 para MySQL, aunque el servidor web esté en 80
  dialect: "mysql",
  logging: false,
});

export default sequelize;
