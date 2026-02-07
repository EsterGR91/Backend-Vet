import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
router.post("/login", async (req, res) => {
  try {
    const rawEmail = req.body?.email;
    const password = req.body?.password;

    // Validación básica
    if (typeof rawEmail !== "string" || typeof password !== "string") {
      return res.status(400).json({ msg: "Datos incompletos" });
    }

    const email = rawEmail.toLowerCase().trim();
    if (!email || !password) {
      return res.status(400).json({ msg: "Datos incompletos" });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ msg: "JWT_SECRET no configurado" });
    }

    // Buscar usuario por email y traer el hash (si está select:false)
    const user = await User.findOne({ email }).select("+password_hash");

    // Recomendación de seguridad: mensaje genérico para no filtrar si existe el email
    if (!user) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }

    // Usuario activo
    if (user.is_active === false) {
      return res.status(403).json({ msg: "Usuario deshabilitado" });
    }

    // Si por alguna razón no existe hash (usuario legacy / corrupción)
    if (!user.password_hash) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }

    // Comparar password plano vs hash
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }

    // Crear JWT
    const token = jwt.sign(
      { id: user._id.toString(), role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.status(200).json({
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
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
});

export default router;