import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

/**
 * POST /api/users
 * Body: { full_name, email, password, role? }
 */
router.post("/", async (req, res) => {
  try {
    const full_name = String(req.body?.full_name || "").trim();
    const email = String(req.body?.email || "").toLowerCase().trim();
    const password = String(req.body?.password || "");
    const role = req.body?.role; // opcional

    if (!full_name || !email || !password) {
      return res.status(400).json({ msg: "Datos incompletos" });
    }

    const exists = await User.findOne({ email }).lean();
    if (exists) {
      return res.status(400).json({ msg: "Usuario ya existe" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      full_name,
      email,
      password:password_hash,
      role: role === "ADMIN" ? "ADMIN" : "STAFF", // opcional y validado
      is_active: true,
    });

    return res.status(201).json({
      msg: "Usuario creado correctamente",
      user: {
        id: user._id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ msg: "Error interno" });
  }
});

export default router;
