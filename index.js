import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import appointmentRoutes from "./routes/appointment.js";
import ownerRoutes from "./routes/owners.js";
import patientRoutes from "./routes/patients.js";
import medicalRecordRoutes from "./routes/medicalrecord.js";

const app = express();

// ===============================
// Middlewares
// ===============================
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// ===============================
// Conexión a Mongo
// ===============================
connectDB();

// ===============================
// Rutas base
// ===============================
app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

app.get("/api", (req, res) => {
  res.json({ msg: "API funcionando 🚀" });
});

// ===============================
// Rutas API
// ===============================
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/owners", ownerRoutes);
app.use("/api/patients", patientRoutes);

// 🔥 Aquí dejamos el nombre consistente
app.use("/api/medicalrecords", medicalRecordRoutes);

// ===============================
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
