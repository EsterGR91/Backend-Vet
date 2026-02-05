import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "vet_secret";

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Datos incompletos" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ msg: "El correo ya existe" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || "STAFF",
    });

    res.status(201).json({ msg: "Usuario creado", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error al registrar" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase().trim();
const password = req.body.password;


    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "Usuario no existe" });

   const ok = await bcrypt.compare(password, user.password_hash);

    if (!ok) return res.status(401).json({ msg: "Credenciales inválidas" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error en login" });
  }
});

export default router;
