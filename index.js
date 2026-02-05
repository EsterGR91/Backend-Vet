import express from "express";
import cors from "cors";

// routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import ownerRoutes from "./routes/owners.js";
import patientRoutes from "./routes/patients.js";
import appointmentRoutes from "./routes/appointment.js";
import medicalRecordRoutes from "./routes/medicalrecord.js";

const app = express();

app.use(cors());
app.use(express.json());

// 🔍 test rápido
app.get("/", (req, res) => {
  res.send("API Backend Vet funcionando 🚀");
});

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/owners", ownerRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/medicalrecords", medicalRecordRoutes); // 👈 ESTA ES LA CLAVE

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
