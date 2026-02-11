import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

/* =====================================================
   🟢 GET - Obtener todos los usuarios
   GET /api/user
===================================================== */
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error("GET USERS ERROR:", error);
    res.status(500).json({ msg: "Error al obtener usuarios" });
  }
});

/* =====================================================
   🟢 POST - Crear usuario
   POST /api/user
   Body: { full_name, email, password, role }
===================================================== */
router.post("/", async (req, res) => {
  try {
    const full_name = String(req.body?.full_name || "").trim();
    const email = String(req.body?.email || "").toLowerCase().trim();
    const password = String(req.body?.password || "");
    const role = req.body?.role;

    if (!full_name || !email || !password) {
      return res.status(400).json({ msg: "Datos incompletos" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ msg: "Usuario ya existe" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      full_name,
      email,
      password: password_hash,
      role: role === "ADMIN" ? "ADMIN" : "STAFF",
      is_active: true,
    });

    res.status(201).json({
      msg: "Usuario creado correctamente",
      user: {
        id: user._id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        is_active: user.is_active,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
});

/* =====================================================
   🟢 PUT - Actualizar usuario
   PUT /api/user/:id
===================================================== */
router.put("/:id", async (req, res) => {
  try {
    const { full_name, email, password, role, is_active } = req.body;

    const updateData = {
      full_name,
      email,
      role,
      is_active,
    };

    // Si envían nueva contraseña, la encriptamos
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("UPDATE USER ERROR:", error);
    res.status(500).json({ msg: "Error al actualizar usuario" });
  }
});

/* =====================================================
   🟢 DELETE - Eliminar usuario
   DELETE /api/user/:id
===================================================== */
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.json({ msg: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("DELETE USER ERROR:", error);
    res.status(500).json({ msg: "Error al eliminar usuario" });
  }
});

export default router;
