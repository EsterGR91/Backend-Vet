import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// ⚠️ NUNCA hardcodear en producción
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

// ===============================
// REGISTRO
// ===============================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    // ✅ MONGOOSE (sin where)
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ msg: "El correo ya está registrado" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      full_name: name,
      email,
      password_hash,
      role: role || "STAFF",
      is_active: true,
    });

    res.status(201).json({
      msg: "Usuario creado correctamente",
      user: {
        id: user._id,          // 👈 Mongo usa _id
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ msg: "Error en el registro" });
  }
});

// ===============================
// LOGIN
// ===============================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Datos incompletos" });
    }

    // ✅ MONGOOSE
    const user = await User.findOne({ email });
    if (!user || !user.password_hash) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ msg: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      {
        id: user._id,          // 👈 Mongo
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      msg: "Login exitoso",
      token,
      user: {
        id: user._id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ msg: "Error al iniciar sesión" });
  }
});

export default router;
