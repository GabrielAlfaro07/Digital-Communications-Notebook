// src/middlewares/authenticateUser.js
const supabase = require("../config/supabaseClient");

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Token received:", token); // Log token for debugging

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Try to get the user associated with the token
    const { data: user, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      console.error("Supabase error:", error); // Log any error from Supabase
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.auth = user; // Attach user info to request
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = authenticateUser;
