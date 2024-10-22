// src/routes/authRoutes.js
const express = require("express");
const supabase = require("../config/supabaseClient");

const router = express.Router();

// Signup (Registro de nuevo usuario)
router.post("/signup", async (req, res) => {
  const { email, password, nombre } = req.body;

  // Crear usuario en Supabase Auth
  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) return res.status(400).json({ error: signUpError.message });

  const user = authData.user;

  // Usar la función insert_usuario de Supabase para insertar el usuario en la tabla
  const { data, error: insertError } = await supabase.rpc("insert_usuario", {
    p_id_usuario: user.id,
    p_nombre: nombre,
    p_email: user.email,
    p_password: password, // Almacenar la contraseña aquí puede no ser seguro; es mejor hashear la contraseña.
  });

  if (insertError) return res.status(400).json({ error: insertError.message });

  res.status(201).json({ message: "User created successfully", user: data });
});

module.exports = router;

// Signin
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const { data: session, error: signInError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (signInError) return res.status(400).json({ error: signInError.message });

  res.status(200).json({ message: "User signed in successfully", session });
});

// Signout
router.post("/signout", async (req, res) => {
  const { error: signOutError } = await supabase.auth.signOut();

  if (signOutError)
    return res.status(400).json({ error: signOutError.message });

  res.status(200).json({ message: "User signed out successfully" });
});

module.exports = router;
