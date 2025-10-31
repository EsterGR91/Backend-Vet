import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Patient from "./Patient.js";

const Appointment = sequelize.define("Appointment", {
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

// Relación: una mascota puede tener muchas citas
Patient.hasMany(Appointment, {
  foreignKey: "patient_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Appointment.belongsTo(Patient, {
  foreignKey: "patient_id",
});

export default Appointment;
