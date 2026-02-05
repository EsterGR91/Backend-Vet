
import express from "express";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// ===============================
// LISTAR CITAS
// ===============================
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment
      .find()
      .populate("patient"); // 👈 MongoDB reemplaza "include"

    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener citas" });
  }
});

// ===============================
// OBTENER UNA CITA
// ===============================
router.get("/:id", async (req, res) => {
  try {
    const appointment = await Appointment
      .findById(req.params.id)
      .populate("patient");

    if (!appointment) {
      return res.status(404).json({ msg: "Cita no encontrada" });
    }

    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "ID inválido" });
  }
});

// ===============================
// CREAR CITA
// ===============================
router.post("/", async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al crear cita" });
  }
});

// ===============================
// ACTUALIZAR CITA
// ===============================
router.put("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ msg: "Cita no encontrada" });
    }

    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al actualizar cita" });
  }
});

// ===============================
// ELIMINAR CITA
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ msg: "Cita no encontrada" });
    }

    res.json({ msg: "Cita eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al eliminar cita" });
  }
});

export default router;
