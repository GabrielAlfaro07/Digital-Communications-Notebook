// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware global
app.use(cors());
app.use(express.json());

// Importar rutas
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const studentRoutes = require("./src/routes/studentRoutes");
const guardianRoutes = require("./src/routes/guardianRoutes");
const teacherRoutes = require("./src/routes/teacherRoutes");

// Usar las rutas
app.use("/auth", authRoutes);
app.use("/api/usuarios", userRoutes);
app.use("/api/estudiantes", studentRoutes);
app.use("/api/encargados", guardianRoutes);
app.use("/api/docentes", teacherRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
