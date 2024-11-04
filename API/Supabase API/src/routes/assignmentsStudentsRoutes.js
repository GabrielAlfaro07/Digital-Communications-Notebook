// src/routes/studentAssignmentsRoute.js
const express = require("express");
const supabase = require("../config/supabaseClient");
const authenticateUser = require("../middlewares/authenticateUser");

const router = express.Router();

// Select (authenticated)
router.get("/", authenticateUser, async (req, res) => {
  const { data, error } = await supabase.rpc("select_asignaciones_estudiantes");

  if (error) return res.status(400).json({ error });

  res.status(200).json(data);
});

// Insert
router.post("/", authenticateUser, async (req, res) => {
  const { id_estudiante, id_asignacion } = req.body;

  const { data, error } = await supabase.rpc(
    "insert_asignaciones_estudiantes",
    {
      p_id_estudiante: id_estudiante,
      p_id_asignacion: id_asignacion,
    }
  );

  if (error) return res.status(400).json({ error });

  res
    .status(201)
    .json({ message: "Asignación-Estudiante registrado exitosamente", data });
});

// Delete (authenticated)
router.delete("/", authenticateUser, async (req, res) => {
  const { id_estudiante, id_asignacion } = req.body;

  const { data, error } = await supabase.rpc(
    "delete_asignaciones_estudiantes",
    {
      p_id_estudiante: id_estudiante,
      p_id_asignacion: id_asignacion,
    }
  );

  if (error) return res.status(400).json({ error });

  res
    .status(200)
    .json({ message: "Registro de Asignación-Estudiante eliminado", data });
});

module.exports = router;
