import express from "express";
import sequelize from "./config/db.js";
import userRoute from "./routes/user.js";
import patientsRoute from "./routes/patients.js";
import ownerRoute from "./routes/owners.js";
import MedicalRecordRoute from "./routes/medicalrecord.js";
import appointmentsRoute from "./routes/appointment.js";


const app = express();
app.use(express.json());

// ✅ Conectar base de datos
sequelize
  .authenticate()
  .then(() => console.log("✅ Conectado a MySQL"))
  .catch((err) => console.error("❌ Error al conectar:", err));

// 🔄 Sincronizar modelos
sequelize.sync({ alter: false }).then(() => {
  console.log("🧩 Modelos sincronizados con la base de datos");
});

// 📍 Ruta básica
app.get("/", (req, res) => {
  res.json({ msg: "API del Sistema Veterinario funcionando 🚀" });
});

// Rutas principales
app.use("/api/users", userRoute);
app.use("/api/owners", ownerRoute);
app.use("/api/patients", patientsRoute );
app.use("/api/records", MedicalRecordRoute);
app.use("/api/appointments", appointmentsRoute );

app.listen(3000, () => console.log("🌍 Servidor corriendo en http://localhost:3000"));
