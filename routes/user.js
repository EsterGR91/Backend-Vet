import express from "express";
import User from "../models/User.js";

const router = express.Router();

// ===============================
// OBTENER TODOS LOS USUARIOS
// ===============================
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password_hash"); // no enviar password
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener usuarios" });
  }
});

// ===============================
// OBTENER UN USUARIO
// ===============================
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password_hash");

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "ID inválido" });
  }
});

// ===============================
// CREAR USUARIO
// ===============================
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      id: user._id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
      is_active: user.is_active,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al crear usuario" });
  }
});

// ===============================
// ACTUALIZAR USUARIO
// ===============================
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password_hash");

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al actualizar usuario" });
  }
});

// ===============================
// ELIMINAR USUARIO
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.json({ msg: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al eliminar usuario" });
  }
});

export default router;
