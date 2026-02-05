import express from "express";
import Owner from "../models/Owner.js";
import Patient from "../models/Patient.js";

const router = express.Router();

// ===============================
// OBTENER TODOS LOS PROPIETARIOS
// ===============================
router.get("/", async (req, res) => {
  try {
    const owners = await Owner.find();

    // opcional: traer pacientes de cada owner
    const ownersWithPatients = await Promise.all(
      owners.map(async (owner) => {
        const patients = await Patient.find({ owner: owner._id });
        return { ...owner.toObject(), patients };
      })
    );

    res.json(ownersWithPatients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener propietarios" });
  }
});

// ===============================
// OBTENER UN PROPIETARIO
// ===============================
router.get("/:id", async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    if (!owner) {
      return res.status(404).json({ msg: "Propietario no encontrado" });
    }

    const patients = await Patient.find({ owner: owner._id });
    res.json({ ...owner.toObject(), patients });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "ID inválido" });
  }
});

// ===============================
// CREAR PROPIETARIO
// ===============================
router.post("/", async (req, res) => {
  try {
    const owner = await Owner.create(req.body);
    res.status(201).json(owner);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al crear propietario" });
  }
});

// ===============================
// ACTUALIZAR PROPIETARIO
// ===============================
router.put("/:id", async (req, res) => {
  try {
    const owner = await Owner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!owner) {
      return res.status(404).json({ msg: "Propietario no encontrado" });
    }

    res.json(owner);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al actualizar propietario" });
  }
});

// ===============================
// ELIMINAR PROPIETARIO
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Owner.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ msg: "Propietario no encontrado" });
    }

    res.json({ msg: "Propietario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al eliminar propietario" });
  }
});

export default router;
