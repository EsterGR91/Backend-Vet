import express from "express";
import MedicalRecord from "../models/MedicalRecord.js";
import Patient from "../models/Patient.js";

const router = express.Router();

// Listar fichas médicas
router.get("/", async (req, res) => {
  const records = await MedicalRecord.findAll({ include: Patient });
  res.json(records);
});

// Obtener una ficha
router.get("/:id", async (req, res) => {
  const record = await MedicalRecord.findByPk(req.params.id, { include: Patient });
  record ? res.json(record) : res.status(404).json({ msg: "Ficha no encontrada" });
});

// Crear ficha
router.post("/", async (req, res) => {
  const record = await MedicalRecord.create(req.body);
  res.json(record);
});

// Actualizar ficha
router.put("/:id", async (req, res) => {
  const record = await MedicalRecord.findByPk(req.params.id);
  if (!record) return res.status(404).json({ msg: "Ficha no encontrada" });
  await record.update(req.body);
  res.json(record);
});

// Eliminar ficha
router.delete("/:id", async (req, res) => {
  const deleted = await MedicalRecord.destroy({ where: { id: req.params.id } });
  res.json({ deleted });
});

export default router;
