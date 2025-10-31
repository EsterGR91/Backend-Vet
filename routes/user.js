import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Obtener todos
router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Obtener uno
router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  user ? res.json(user) : res.status(404).json({ msg: "Usuario no encontrado" });
});

// Crear
router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// Actualizar
router.put("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
  await user.update(req.body);
  res.json(user);
});

// Eliminar
router.delete("/:id", async (req, res) => {
  const deleted = await User.destroy({ where: { id: req.params.id } });
  res.json({ deleted });
});

export default router;
