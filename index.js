import express from "express";
import sequelize from "./config/db.js";
import cors from "cors";

import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import ownerRoute from "./routes/owners.js";
import patientsRoute from "./routes/patients.js";
import medicalRecordRoute from "./routes/medicalrecord.js";
import appointmentsRoute from "./routes/appointment.js";

const app = express();

// ✅ PUERTO PARA CPANEL (OBLIGATORIO)
const PORT = process.env.PORT || 3000;

// ==================
// MIDDLEWARES
// ==================
app.use(express.json());

app.use(
  cors({
    origin: "*", // SOLO para pruebas
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ==================
// DB
// ==================
sequelize
  .authenticate()
  .then(() => console.log("✅ Conectado a MySQL"))
  .catch((err) => console.error("❌ Error DB:", err));

sequelize.sync({ alter: false }).then(() => {
  console.log("🧩 Modelos sincronizados");
});

// ==================
// ENDPOINTS DE PRUEBA
// ==================

// 🔴 ESTE ERA EL QUE FALTABA
app.get("/", (req, res) => {
  res.json({ msg: "API viva en cPanel 🚀" });
});

app.get("/api", (req, res) => {
  res.json({ msg: "API funcionando correctamente 🚀" });
});

// ==================
// ROUTES
// ==================
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/owners", ownerRoute);
app.use("/api/patients", patientsRoute);
app.use("/api/records", medicalRecordRoute);
app.use("/api/appointments", appointmentsRoute);

// ==================
// START SERVER
// ==================
app.listen(PORT, () => {
  console.log(`🌍 Server corriendo en puerto ${PORT}`);
});

