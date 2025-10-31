import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Owner = sequelize.define("Owner", {
  first_name: {
    type: DataTypes.STRING(80),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(120),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(190),
    unique: true,
  },
  phone: DataTypes.STRING(40),
  address: DataTypes.STRING(255),
  notes: DataTypes.TEXT,
});

export default Owner;
