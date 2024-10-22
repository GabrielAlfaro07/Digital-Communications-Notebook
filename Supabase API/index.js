const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Cargar variables de entorno

const app = express();
const port = process.env.PORT || 5000;

// Middleware para manejo de CORS
app.use(cors());
app.use(express.json()); // Permitir JSON en las peticiones

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Ruta de prueba
// app.get("/", (req, res) => {
//   res.send("API funcionando");
// });

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
