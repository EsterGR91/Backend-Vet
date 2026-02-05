import express from "express";
import MedicalRecord from "../models/MedicalRecord.js";

const router = express.Router();

// ===============================
// LISTAR FICHAS MÉDICAS
// ===============================
router.get("/", async (req, res) => {
  try {
    const records = await MedicalRecord
      .find()
      .populate("patient"); // 👈 reemplaza include

    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener fichas médicas" });
  }
});

// ===============================
// OBTENER UNA FICHA
// ===============================
router.get("/:id", async (req, res) => {
  try {
    const record = await MedicalRecord
      .findById(req.params.id)
      .populate("patient");

    if (!record) {
      return res.status(404).json({ msg: "Ficha no encontrada" });
    }

    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "ID inválido" });
  }
});

// ===============================
// CREAR FICHA
// ===============================
router.post("/", async (req, res) => {
  try {
    const record = await MedicalRecord.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al crear ficha médica" });
  }
});

// ===============================
// ACTUALIZAR FICHA
// ===============================
router.put("/:id", async (req, res) => {
  try {
    const record = await MedicalRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!record) {
      return res.status(404).json({ msg: "Ficha no encontrada" });
    }

    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al actualizar ficha médica" });
  }
});

// ===============================
// ELIMINAR FICHA
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await MedicalRecord.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ msg: "Ficha no encontrada" });
    }

    res.json({ msg: "Ficha eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al eliminar ficha médica" });
  }
});

export default router;

