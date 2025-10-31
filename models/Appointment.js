import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Patient from "./Patient.js";

const Appointment = sequelize.define("appointments", {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  scheduled_for: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("PENDING", "COMPLETED", "CANCELLED"),
    defaultValue: "PENDING",
  },
  notes: DataTypes.TEXT,
});

Patient.hasMany(Appointment, {
  foreignKey: {
    name: "patient_id",
    type: DataTypes.BIGINT.UNSIGNED,
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Appointment.belongsTo(Patient, {
  foreignKey: {
    name: "patient_id",
    type: DataTypes.BIGINT.UNSIGNED,
  },
});

export default Appointment;
