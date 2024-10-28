const express = require("express");
const bcrypt = require("bcrypt"); // Requiere bcrypt
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

  // Hashear la contraseña antes de guardarla
  const hashedPassword = await bcrypt.hash(password, 10); // 10 es el factor de costo (cost factor)

  // Usar la función insert_usuario de Supabase para insertar el usuario en la tabla
  const { data, error: insertError } = await supabase.rpc("insert_usuario", {
    p_id_usuario: user.id,
    p_nombre: nombre,
    p_email: user.email,
    p_password: hashedPassword, // Almacenar la contraseña hasheada
  });

  if (insertError) return res.status(400).json({ error: insertError.message });

  res.status(201).json({ message: "User created successfully", user: data });
});

// Signin (Iniciar sesión)
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  // Primero, obtener el usuario y la contraseña encriptada de la tabla 'usuarios'
  const { data: userData, error: selectError } = await supabase.rpc(
    "select_usuario",
    { p_email: email }
  );

  if (selectError || !userData.length)
    return res.status(400).json({ error: "Invalid email or password" });

  const user = userData[0];

  // Comparar la contraseña ingresada con la contraseña hasheada
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid)
    return res.status(400).json({ error: "Invalid email or password" });

  // Si la contraseña es válida, proceder con la autenticación de Supabase
  const { data: session, error: signInError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (signInError) return res.status(400).json({ error: signInError.message });

  res.status(200).json({ message: "User signed in successfully", session });
});

module.exports = router;

// Signout
router.post("/signout", async (req, res) => {
  const { error: signOutError } = await supabase.auth.signOut();

  if (signOutError)
    return res.status(400).json({ error: signOutError.message });

  res.status(200).json({ message: "User signed out successfully" });
});

module.exports = router;
