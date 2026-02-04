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
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// DB
sequelize
  .authenticate()
  .then(() => console.log("✅ Conectado a MySQL"))
  .catch((err) => console.error("❌ Error DB:", err));

sequelize.sync({ alter: false }).then(() => {
  console.log("🧩 Modelos sincronizados");
});

// Test
app.get("/", (req, res) => {
  res.json({ msg: "API funcionando 🚀" });
});

// ROUTES
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/owners", ownerRoute);
app.use("/api/patients", patientsRoute);
app.use("/api/records", medicalRecordRoute);
app.use("/api/appointments", appointmentsRoute);

app.listen(3000, () =>
  console.log("🌍 Server http://localhost:3000")
);
