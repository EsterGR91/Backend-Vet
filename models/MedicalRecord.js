import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Patient from "./Patient.js";

const MedicalRecord = sequelize.define("MedicalRecord", {
  record_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  reason: DataTypes.STRING(200),
  symptoms: DataTypes.TEXT,
  diagnosis: DataTypes.TEXT,
  treatment: DataTypes.TEXT,
  vet_notes: DataTypes.TEXT,
});

// Relación: una mascota puede tener muchas fichas médicas
Patient.hasMany(MedicalRecord, {
  foreignKey: "patient_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

MedicalRecord.belongsTo(Patient, {
  foreignKey: "patient_id",
});

export default MedicalRecord;
