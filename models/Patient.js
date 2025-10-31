import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Owner from "./Owner.js";

const Patient = sequelize.define("Patient", {
  name: {
    type: DataTypes.STRING(120),
    allowNull: false,
  },
  species: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  breed: DataTypes.STRING(120),
  sex: {
    type: DataTypes.ENUM("M", "F", "U"),
    defaultValue: "U",
  },
  birth_date: DataTypes.DATE,
  weight_kg: DataTypes.DECIMAL(5, 2),
  color: DataTypes.STRING(60),
  microchip_id: DataTypes.STRING(100),
  notes: DataTypes.TEXT,
});

// Relación: un propietario puede tener muchas mascotas
Owner.hasMany(Patient, {
  foreignKey: "owner_id",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});

Patient.belongsTo(Owner, {
  foreignKey: "owner_id",
});

export default Patient;
