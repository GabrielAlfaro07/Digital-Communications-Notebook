// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware global

// Define allowed origins
const allowedOrigins = [
  "http://localhost:3000", // React web app (local)
  "http://localhost:19006", // React Native app (Expo local)
  "http://192.168.1.100:19006", // React Native app on physical device
  "http://10.0.2.2:19006", // React Native app on Android emulator
];

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., mobile apps or server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // If you want to allow cookies or authorization headers
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// Importar rutas
const gradesRoutes = require("./src/routes/gradesRoutes");
const rolesRoutes = require("./src/routes/rolesRoutes");
const userRoutes = require("./src/routes/userRoutes");
const classesRoutes = require("./src/routes/classesRoutes");
const assignmentRoutes = require("./src/routes/assignmentRoutes");
const studentRoutes = require("./src/routes/studentRoutes");

const guardianRoutes = require("./src/routes/guardianRoutes");
const teacherRoutes = require("./src/routes/teacherRoutes");
const classesStudentsRoutes = require("./src/routes/classesStudentsRoutes");
const classesAssignmentsRoutes = require("./src/routes/classesAssignmentsRoutes");
const assignmentsStudentsRoutes = require("./src/routes/assignmentsStudentsRoutes");

// Usar las rutas
app.use("/api/grades", gradesRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/users", userRoutes);
app.use("/api/classes", classesRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/students", studentRoutes);

app.use("/api/encargados", guardianRoutes);
app.use("/api/docentes", teacherRoutes);
app.use("/api/clases-estudiantes", classesStudentsRoutes);
app.use("/api/clases-asignaciones", classesAssignmentsRoutes);
app.use("/api/asignaciones-estudiantes", assignmentsStudentsRoutes);

// Iniciar el servidor
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
});
