import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// 🔑 Clave secreta para firmar los tokens (puedes moverla a un .env)
const JWT_SECRET = "mi_super_secreto_123";

// 🧾 Registro de usuario
router.post("/register", async (req, res) => {
  try {
    const { full_name, email, password, role } = req.body;

    // Validaciones
    if (!full_name || !email || !password)
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ msg: "El correo ya está registrado" });

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Crear usuario
    const newUser = await User.create({
      full_name,
      email,
      password_hash,
      role: role || "STAFF",
    });

    res.status(201).json({
      msg: "Usuario registrado exitosamente",
      user: { id: newUser.id, full_name: newUser.full_name, email: newUser.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al registrar el usuario" });
  }
});

// 🔐 Login de usuario
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validaciones básicas
    if (!email || !password)
      return res.status(400).json({ msg: "Correo y contraseña son obligatorios" });

    // Buscar usuario
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    // Comparar contraseña
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword)
      return res.status(401).json({ msg: "Contraseña incorrecta" });

    // Crear token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: "8h" } // duración del token
    );

    res.json({
      msg: "Inicio de sesión exitoso",
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al iniciar sesión" });
  }
});

// 🔒 Middleware para proteger rutas
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(403).json({ msg: "Token no proporcionado" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token inválido o expirado" });
  }
};

export default router;
