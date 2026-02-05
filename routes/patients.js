
import express from "express";
import Patient from "../models/Patient.js";
import Owner from "../models/Owner.js";
import MedicalRecord from "../models/MedicalRecord.js";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// ===============================
// LISTAR PACIENTES
// ===============================
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find()
      .populate("owner");

    const fullPatients = await Promise.all(
      patients.map(async (patient) => {
        const records = await MedicalRecord.find({ patient: patient._id });
        const appointments = await Appointment.find({ patient: patient._id });

        return {
          ...patient.toObject(),
          medical_records: records,
          appointments: appointments,
        };
      })
    );

    res.json(fullPatients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener pacientes" });
  }
});

// ===============================
// OBTENER UN PACIENTE
// ===============================
router.get("/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate("owner");

    if (!patient) {
      return res.status(404).json({ msg: "Paciente no encontrado" });
    }

    const records = await MedicalRecord.find({ patient: patient._id });
    const appointments = await Appointment.find({ patient: patient._id });

    res.json({
      ...patient.toObject(),
      medical_records: records,
      appointments: appointments,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "ID inválido" });
  }
});

// ===============================
// CREAR PACIENTE
// ===============================
router.post("/", async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al crear paciente" });
  }
});

// ===============================
// ACTUALIZAR PACIENTE
// ===============================
router.put("/:id", async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({ msg: "Paciente no encontrado" });
    }

    res.json(patient);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al actualizar paciente" });
  }
});

// ===============================
// ELIMINAR PACIENTE
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Patient.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ msg: "Paciente no encontrado" });
    }

    // Limpieza opcional de dependencias
    await MedicalRecord.deleteMany({ patient: req.params.id });
    await Appointment.deleteMany({ patient: req.params.id });

    res.json({ msg: "Paciente eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al eliminar paciente" });
  }
});

export default router;
