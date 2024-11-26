const express = require("express");
const supabase = require("../config/supabaseClient");

const router = express.Router();

// Endpoint to fetch all roles
router.get("/", async (req, res) => {
  try {
    const { data: roles, error } = await supabase
      .from("Roles")
      .select("role_id, name");

    if (error) {
      console.error("Error fetching roles:", error.message);
      return res.status(500).json({ error: "Failed to fetch roles" });
    }

    res.json(roles); // Send the roles as a JSON array
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
