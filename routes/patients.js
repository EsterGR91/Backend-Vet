import express from "express";
import Patient from "../models/Patient.js";
import Owner from "../models/Owner.js";
import MedicalRecord from "../models/MedicalRecord.js";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// Listar pacientes
router.get("/", async (req, res) => {
  const patients = await Patient.findAll({ include: [Owner, MedicalRecord, Appointment] });
  res.json(patients);
});

// Obtener uno
router.get("/:id", async (req, res) => {
  const patient = await Patient.findByPk(req.params.id, { include: [Owner, MedicalRecord, Appointment] });
  patient ? res.json(patient) : res.status(404).json({ msg: "Paciente no encontrado" });
});

// Crear paciente
router.post("/", async (req, res) => {
  const patient = await Patient.create(req.body);
  res.json(patient);
});

// Actualizar paciente
router.put("/:id", async (req, res) => {
  const patient = await Patient.findByPk(req.params.id);
  if (!patient) return res.status(404).json({ msg: "Paciente no encontrado" });
  await patient.update(req.body);
  res.json(patient);
});

// Eliminar paciente
router.delete("/:id", async (req, res) => {
  const deleted = await Patient.destroy({ where: { id: req.params.id } });
  res.json({ deleted });
});

export default router;
