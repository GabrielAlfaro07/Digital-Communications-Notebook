// src/routes/classAssignmentsRoute.js
const express = require("express");
const supabase = require("../config/supabaseClient");
const authenticateUser = require("../middlewares/authenticateUser");

const router = express.Router();

// Select (authenticated)
router.get("/", authenticateUser, async (req, res) => {
  const { data, error } = await supabase.rpc("select_clases_asignaciones");

  if (error) return res.status(400).json({ error });

  res.status(200).json(data);
});

// Insert
router.post("/", authenticateUser, async (req, res) => {
  const { id_clase, id_asignacion } = req.body;

  const { data, error } = await supabase.rpc("insert_clases_asignaciones", {
    p_id_clase: id_clase,
    p_id_asignacion: id_asignacion,
  });

  if (error) return res.status(400).json({ error });

  res
    .status(201)
    .json({ message: "Clase-Asignación registrado exitosamente", data });
});

// Delete (authenticated)
router.delete("/", authenticateUser, async (req, res) => {
  const { id_clase, id_asignacion } = req.body;

  const { data, error } = await supabase.rpc("delete_clases_asignaciones", {
    p_id_clase: id_clase,
    p_id_asignacion: id_asignacion,
  });

  if (error) return res.status(400).json({ error });

  res
    .status(200)
    .json({ message: "Registro de Clase-Asignación eliminado", data });
});

module.exports = router;
