// src/routes/assignmentsRoute.js
const express = require("express");
const supabase = require("../config/supabaseClient");
const authenticateUser = require("../middlewares/authenticateUser");

const router = express.Router();

// Select (autenticado)
router.get("/", authenticateUser, async (req, res) => {
  const { data, error } = await supabase.rpc("select_asignaciones");

  if (error) return res.status(400).json({ error });

  res.status(200).json(data);
});

// Insert
router.post("/", authenticateUser, async (req, res) => {
  const { titulo, descripcion, fecha_asignacion, fecha_entrega } = req.body;

  const { data, error } = await supabase.rpc("insert_asignacion", {
    p_titulo: titulo,
    p_descripcion: descripcion,
    p_fecha_asignacion: fecha_asignacion,
    p_fecha_entrega: fecha_entrega,
  });

  if (error) return res.status(400).json({ error });

  res.status(201).json({ message: "Asignación creada exitosamente", data });
});

// Update (autenticado)
router.put("/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, fecha_asignacion, fecha_entrega } = req.body;

  const { data, error } = await supabase.rpc("update_asignacion", {
    p_id_asignacion: id,
    p_titulo: titulo,
    p_descripcion: descripcion,
    p_fecha_asignacion: fecha_asignacion,
    p_fecha_entrega: fecha_entrega,
  });

  if (error) return res.status(400).json({ error });

  res.status(200).json({ message: "Asignación actualizada", data });
});

// Delete (autenticado)
router.delete("/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase.rpc("delete_asignacion", {
    p_id_asignacion: id,
  });

  if (error) return res.status(400).json({ error });

  res.status(200).json({ message: "Asignación eliminada", data });
});

module.exports = router;
