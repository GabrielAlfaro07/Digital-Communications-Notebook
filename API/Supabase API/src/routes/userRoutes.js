// src/routes/userRoutes.js
const express = require("express");
const supabase = require("../config/supabaseClient");
const authenticateUser = require("../middlewares/authenticateUser");

const router = express.Router();

// Select (autenticado)
router.get("/", authenticateUser, async (req, res) => {
  const { id } = req.auth.user;

  const { data, error } = await supabase.rpc("select_usuario", {
    auth_user: id,
  });

  if (error) return res.status(400).json({ error });
  res.status(200).json(data);
});

// Update (autenticado)
router.put("/", authenticateUser, async (req, res) => {
  const { id } = req.auth.user;
  const { nombre, email } = req.body;

  const { data, error } = await supabase.rpc("update_usuario", {
    auth_user: id,
    p_nombre: nombre,
    p_email: email,
  });

  if (error) return res.status(400).json({ error });
  res.status(200).json({ message: "Usuario actualizado", data });
});

// Delete (autenticado)
router.delete("/", authenticateUser, async (req, res) => {
  const { id } = req.auth.user;

  const { error: deleteAuthError } = await supabase.auth.admin.deleteUser(id);

  if (deleteAuthError)
    return res.status(400).json({ error: deleteAuthError.message });

  const { data, error: deleteDbError } = await supabase.rpc("delete_usuario", {
    auth_user: id,
  });

  if (deleteDbError)
    return res.status(400).json({ error: deleteDbError.message });

  res.status(200).json({ message: "Usuario eliminado", data });
});

module.exports = router;
