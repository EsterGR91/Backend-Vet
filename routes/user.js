import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// REGISTRO
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Datos incompletos" });
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(400).json({ msg: "Usuario ya existe" });
    }

    const user = new User({
      name,
      email: email.toLowerCase(),
      password, // 🔐 se encripta SOLO
    });

    await user.save();

    res.status(201).json({ msg: "Usuario creado correctamente" });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ msg: "Error interno" });
  }
});

export default router;
