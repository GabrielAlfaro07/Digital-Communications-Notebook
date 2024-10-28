// src/routes/guardianRoutes.js
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

  // Obtener información del encargado
  const { data: guardianData, error: guardianError } = await supabase.rpc(
    "select_encargado",
    {
      auth_user: id,
    }
  );

  if (guardianError) return res.status(400).json({ error: guardianError });

  res.status(200).json({ user: data, guardian: guardianData });
});

// Insert
router.post("/", authenticateUser, async (req, res) => {
  const { id } = req.auth.user;
  const { telefono_emergencia } = req.body;

  // Insertar encargado usando la función insert_encargado
  const { data, error } = await supabase.rpc("insert_encargado", {
    p_id_encargado: id,
    p_telefono_emergencia: telefono_emergencia,
  });

  if (error) return res.status(400).json({ error });

  res.status(201).json({ message: "Encargado creado exitosamente", data });
});

// Update (autenticado)
router.put("/", authenticateUser, async (req, res) => {
  const { id } = req.auth.user;
  const { telefono_emergencia } = req.body;

  const { data, error } = await supabase.rpc("update_encargado", {
    auth_user: id,
    p_telefono_emergencia: telefono_emergencia,
  });

  if (error) return res.status(400).json({ error });

  res.status(200).json({ message: "Encargado actualizado", data });
});

// Delete (autenticado)
router.delete("/", authenticateUser, async (req, res) => {
  const { id } = req.auth.user;

  const { data, error } = await supabase.rpc("delete_encargado", {
    auth_user: id,
  });

  if (error) return res.status(400).json({ error });

  res.status(200).json({ message: "Encargado eliminado", data });
});

module.exports = router;
