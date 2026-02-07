import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";


const router = express.Router();

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
router.post("/login", async (req, res) => {
  try {
    const email = String(req.body?.email || "").toLowerCase().trim();
    const password = String(req.body?.password || "");

    if (!email || !password) {
      return res.status(400).json({ msg: "Datos incompletos" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("LOGIN ERROR: JWT_SECRET no configurado");
      return res.status(500).json({ msg: "Error interno del servidor" });
    }

    // Debug (puedes quitarlo luego)
    
    const user = await User.findOne({ email }).select("+password");
    

    if (!user) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }

    if (user.is_active === false) {
      return res.status(403).json({ msg: "Usuario deshabilitado" });
    }

    const ok = await bcrypt.compare(password, user.password);
    console.log(ok)
    if (!ok) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }

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