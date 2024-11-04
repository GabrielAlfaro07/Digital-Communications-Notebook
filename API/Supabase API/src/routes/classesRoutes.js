// src/routes/classesRoute.js
const express = require("express");
const supabase = require("../config/supabaseClient");
const authenticateUser = require("../middlewares/authenticateUser");

const router = express.Router();

// Select (autenticado)
router.get("/", authenticateUser, async (req, res) => {
  const { data, error } = await supabase.rpc("select_clases");

  if (error) return res.status(400).json({ error });

  res.status(200).json(data);
});

// Insert
router.post("/", authenticateUser, async (req, res) => {
  const { nombre, horario, id_docente } = req.body;

  const { data, error } = await supabase.rpc("insert_clase", {
    p_nombre: nombre,
    p_horario: horario,
    p_id_docente: id_docente,
  });

  if (error) return res.status(400).json({ error });

  res.status(201).json({ message: "Clase creada exitosamente", data });
});

// Update (autenticado)
router.put("/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { nombre, horario, id_docente } = req.body;

  const { data, error } = await supabase.rpc("update_clase", {
    p_id_clase: id,
    p_nombre: nombre,
    p_horario: horario,
    p_id_docente: id_docente,
  });

  if (error) return res.status(400).json({ error });

  res.status(200).json({ message: "Clase actualizada", data });
});

// Delete (autenticado)
router.delete("/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase.rpc("delete_clase", {
    p_id_clase: id,
  });

  if (error) return res.status(400).json({ error });

  res.status(200).json({ message: "Clase eliminada", data });
});

module.exports = router;
