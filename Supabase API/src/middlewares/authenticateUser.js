// src/middlewares/authenticateUser.js
const supabase = require("../config/supabaseClient");

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token provided" });

  const { data: user, error } = await supabase.auth.getUser(token);

  if (error || !user) return res.status(401).json({ error: "Unauthorized" });

  req.auth = user;
  next();
};

module.exports = authenticateUser;
