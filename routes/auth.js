import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

/**
 * POST /api/auth/login
 */
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase().trim();
    const password = req.body.password;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({ msg: "Datos incompletos" });
    }

    // Buscar usuario + incluir hash
    const user = await User.findOne({ email }).select("+password_hash");

    if (!user) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }

    // Usuario activo
    if (!user.is_active) {
      return res.status(403).json({ msg: "Usuario deshabilitado" });
    }

    // Comparar password
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }

    // Crear JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    // Respuesta limpia
    res.json({
      token,
      user: {
        id: user._id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
});

export default router;

