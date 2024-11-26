const express = require("express");
const supabase = require("../config/supabaseClient");

const router = express.Router();

// Endpoint to fetch all grades
router.get("/", async (req, res) => {
  try {
    const { data: grades, error } = await supabase
      .from("Grades")
      .select("grade_id, name");

    if (error) {
      console.error("Error fetching grades:", error.message);
      return res.status(500).json({ error: "Failed to fetch grades" });
    }

    res.json(grades); // Send the grades as a JSON array
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
