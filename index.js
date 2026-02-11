import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

//  Agregamos estas si existen en tu carpeta routes
import appointmentRoutes from "./routes/appointment.js";
import ownerRoutes from "./routes/owners.js";
import patientRoutes from "./routes/patients.js";
import medicalRecordRoutes from "./routes/medicalrecord.js";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

connectDB();

// Ruta base
app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

app.get("/api", (req, res) => {
  res.json({ msg: "API funcionando 🚀" });
});

// Rutas activas
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// 👇 Nuevas rutas
app.use("/api/appointments", appointmentRoutes);
app.use("/api/owners", ownerRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/medical-records", medicalRecordRoutes);

const PORT = process.env.PORT || 10000;

app.listen(PORT, () =>
  console.log(`Servidor corriendo en puerto ${PORT}`)
);

