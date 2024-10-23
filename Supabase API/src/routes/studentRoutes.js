// src/routes/studentRoutes.js
const express = require("express");
const supabase = require("../config/supabaseClient");
const authenticateUser = require("../middlewares/authenticateUser");

const router = express.Router();

// Select (autenticado)
router.get("/", authenticateUser, async (req, res) => {
  const { id } = req.auth.user;

  // Obtener información del usuario
  const { data, error } = await supabase.rpc("select_usuario", {
    auth_user: id,
  });

  if (error) return res.status(400).json({ error });

  // Obtener información del estudiante
  const { data: studentData, error: studentError } = await supabase.rpc(
    "select_estudiante",
    {
      auth_user: id,
    }
  );

  if (studentError) return res.status(400).json({ error: studentError });

  res.status(200).json({ user: data, student: studentData });
});

// Insert
router.post("/", authenticateUser, async (req, res) => {
  const { id } = req.auth.user;
  const { grado } = req.body;

  // Insertar estudiante usando la función insert_estudiante
  const { data, error } = await supabase.rpc("insert_estudiante", {
    p_id_estudiante: id,
    p_grado: grado,
  });

  if (error) return res.status(400).json({ error });

  res.status(201).json({ message: "Estudiante creado exitosamente", data });
});

// Update (autenticado)
router.put("/", authenticateUser, async (req, res) => {
  const { id } = req.auth.user;
  const { grado } = req.body;

  const { data, error } = await supabase.rpc("update_estudiante", {
    auth_user: id,
    p_grado: grado,
  });

  if (error) return res.status(400).json({ error });

  res.status(200).json({ message: "Estudiante actualizado", data });
});

// Delete (autenticado)
router.delete("/", authenticateUser, async (req, res) => {
  const { id } = req.auth.user;

  const { data, error } = await supabase.rpc("delete_estudiante", {
    auth_user: id,
  });

  if (error) return res.status(400).json({ error });

  res.status(200).json({ message: "Estudiante eliminado", data });
});

module.exports = router;
