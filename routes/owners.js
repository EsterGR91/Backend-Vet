import express from "express";
import Owner from "../models/Owner.js";
import Patient from "../models/Patient.js";

const router = express.Router();

// Obtener todos los propietarios
router.get("/", async (req, res) => {
  const owners = await Owner.findAll({ include: Patient });
  res.json(owners);
});

// Obtener un propietario
router.get("/:id", async (req, res) => {
  const owner = await Owner.findByPk(req.params.id, { include: Patient });
  owner ? res.json(owner) : res.status(404).json({ msg: "Propietario no encontrado" });
});

// Crear propietario
router.post("/", async (req, res) => {
  const owner = await Owner.create(req.body);
  res.json(owner);
});

// Actualizar propietario
router.put("/:id", async (req, res) => {
  const owner = await Owner.findByPk(req.params.id);
  if (!owner) return res.status(404).json({ msg: "Propietario no encontrado" });
  await owner.update(req.body);
  res.json(owner);
});

// Eliminar propietario
router.delete("/:id", async (req, res) => {
  const deleted = await Owner.destroy({ where: { id: req.params.id } });
  res.json({ deleted });
});

export default router;
