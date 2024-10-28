// src/routes/teacherRoutes.js
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

  // Obtener información del docente
  const { data: teacherData, error: teacherError } = await supabase.rpc(
    "select_docente",
    {
      auth_user: id,
    }
  );

  if (teacherError) return res.status(400).json({ error: teacherError });

  res.status(200).json({ user: data, teacher: teacherData });
});

// Insert
router.post("/", authenticateUser, async (req, res) => {
  const { id } = req.auth.user;
  const { especialidad } = req.body;

  // Insertar docente usando la función insert_docente
  const { data, error } = await supabase.rpc("insert_docente", {
    p_id_docente: id,
    p_especialidad: especialidad,
  });

  if (error) return res.status(400).json({ error });

  res.status(201).json({ message: "Docente creado exitosamente", data });
});

// Update (autenticado)
router.put("/", authenticateUser, async (req, res) => {
  const { id } = req.auth.user;
  const { especialidad } = req.body;

  const { data, error } = await supabase.rpc("update_docente", {
    auth_user: id,
    p_especialidad: especialidad,
  });

  if (error) return res.status(400).json({ error });

  res.status(200).json({ message: "Docente actualizado", data });
});

// Delete (autenticado)
router.delete("/", authenticateUser, async (req, res) => {
  const { id } = req.auth.user;

  const { data, error } = await supabase.rpc("delete_docente", {
    auth_user: id,
  });

  if (error) return res.status(400).json({ error });

  res.status(200).json({ message: "Docente eliminado", data });
});

module.exports = router;
