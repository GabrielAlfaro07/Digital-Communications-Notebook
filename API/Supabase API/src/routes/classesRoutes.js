const express = require("express");
const authenticateUser = require("../middlewares/authenticateUser");
const supabase = require("../config/supabaseClient");

const router = express.Router();

// Endpoint to fetch classes for the authenticated user
router.get("/me", authenticateUser, async (req, res) => {
  console.log("Authenticated user:", req.auth); // Log the authenticated user
  try {
    const userId = req.auth.user.id;

    // Query to fetch classes where the authenticated user is the teacher
    const { data: classes, error } = await supabase
      .from("Classes")
      .select(
        `class_id, name, day, start_time, end_time, Grades (grade_id, name)`
      )
      .eq("teacher_id", userId); // Filter by teacher_id for the authenticated user

    if (error) {
      console.error("Error fetching classes:", error.message);
      return res.status(500).json({ error: "Failed to fetch classes" });
    }

    // Now, retrieve the username for the authenticated user
    const { data: user, error: userError } = await supabase
      .from("Users")
      .select("username")
      .eq("user_id", userId)
      .single(); // Use single() to get just one user

    if (userError) {
      console.error("Error fetching user:", userError.message);
      return res.status(500).json({ error: "Failed to fetch user details" });
    }

    // Attach the username to each class object
    const response = classes.map((classItem) => ({
      ...classItem,
      teacher_username: user.username, // Attach the teacher's username
    }));

    // Return the updated classes with the teacher's username
    res.status(200).json(response); // Always return 200 OK
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
