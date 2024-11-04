// src/routes/studentClassesRoutes.js
const express = require("express");
const supabase = require("../config/supabaseClient");
const authenticateUser = require("../middlewares/authenticateUser");

const router = express.Router();

// Select (authenticated)
router.get("/", authenticateUser, async (req, res) => {
  const { data, error } = await supabase.rpc("select_clases_estudiantes");

  if (error) return res.status(400).json({ error });

  res.status(200).json(data);
});

// Insert
router.post("/", authenticateUser, async (req, res) => {
  const { id_estudiante, id_clase } = req.body;

  const { data, error } = await supabase.rpc("insert_clases_estudiantes", {
    p_id_estudiante: id_estudiante,
    p_id_clase: id_clase,
  });

  if (error) return res.status(400).json({ error });

  res
    .status(201)
    .json({ message: "Estudiante-Clase registrado exitosamente", data });
});

// Delete (authenticated)
router.delete("/", authenticateUser, async (req, res) => {
  const { id_estudiante, id_clase } = req.body;

  const { data, error } = await supabase.rpc("delete_clases_estudiantes", {
    p_id_estudiante: id_estudiante,
    p_id_clases: id_clase,
  });

  if (error) return res.status(400).json({ error });

  res
    .status(200)
    .json({ message: "Registro de Estudiante-Clase eliminado", data });
});

module.exports = router;
