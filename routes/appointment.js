import express from "express";
import Appointment from "../models/Appointment.js";
import Patient from "../models/Patient.js";

const router = express.Router();

// Listar citas
router.get("/", async (req, res) => {
  const appointments = await Appointment.findAll({ include: Patient });
  res.json(appointments);
});

// Obtener una cita
router.get("/:id", async (req, res) => {
  const appointment = await Appointment.findByPk(req.params.id, { include: Patient });
  appointment ? res.json(appointment) : res.status(404).json({ msg: "Cita no encontrada" });
});

// Crear cita
router.post("/", async (req, res) => {
  const appointment = await Appointment.create(req.body);
  res.json(appointment);
});

// Actualizar cita
router.put("/:id", async (req, res) => {
  const appointment = await Appointment.findByPk(req.params.id);
  if (!appointment) return res.status(404).json({ msg: "Cita no encontrada" });
  await appointment.update(req.body);
  res.json(appointment);
});

// Eliminar cita
router.delete("/:id", async (req, res) => {
  const deleted = await Appointment.destroy({ where: { id: req.params.id } });
  res.json({ deleted });
});

export default router;
