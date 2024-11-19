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
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
