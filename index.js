import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import ownersRoutes from "./routes/owners.js";
import patientsRoutes from "./routes/patients.js";
import medicalRecordRoutes from "./routes/medicalrecord.js";
import appointmentRoutes from "./routes/appointment.js";

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB
connectDB();

// Test
app.get("/api", (req, res) => {
  res.json({ msg: "API funcionando 🚀" });
});

// Routes
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
