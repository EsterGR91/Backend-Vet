import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import ownersRoutes from "./routes/owners.js";
import patientsRoutes from "./routes/patients.js";
import medicalRecordRoutes from "./routes/medicalrecord.js";
import appointmentRoutes from "./routes/appointment.js";

const app = express();

/* 🔥 CORS CORRECTO */
app.use(
  cors({
    origin: "*", // para desarrollo
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

connectDB();

app.get("/api", (req, res) => {
  res.json({ msg: "API funcionando 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/owners", ownersRoutes);
app.use("/api/patients", patientsRoutes);
app.use("/api/records", medicalRecordRoutes);
app.use("/api/appointments", appointmentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🌍 Server running on port ${PORT}`)
);
