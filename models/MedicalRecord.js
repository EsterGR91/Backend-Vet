import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Patient from "./Patient.js";

const MedicalRecord = sequelize.define("medical_records", {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
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

// Relación
Patient.hasMany(MedicalRecord, {
  foreignKey: {
    name: "patient_id",
    type: DataTypes.BIGINT.UNSIGNED,
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

MedicalRecord.belongsTo(Patient, {
  foreignKey: {
    name: "patient_id",
    type: DataTypes.BIGINT.UNSIGNED,
  },
});

export default MedicalRecord;
