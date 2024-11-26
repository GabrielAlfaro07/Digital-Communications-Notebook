const express = require("express");
const authenticateUser = require("../middlewares/authenticateUser");
const supabase = require("../config/supabaseClient");

const router = express.Router();

router.get("/me", authenticateUser, async (req, res) => {
  try {
    // Use the authenticated user's ID from the middleware
    const userId = req.auth.user.id;

    // Query user data with related roles and grades
    const { data: userData, error: userFetchError } = await supabase
      .from("Users")
      .select(
        `user_id, username, email, information, status, profile_picture_url, created_at, Grades (grade_id, name), Roles (role_id, name)`
      )
      .eq("user_id", userId)
      .single();

    if (userFetchError) {
      return res.status(500).json({ error: userFetchError.message });
    }

    if (!userData) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.json(userData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user data." });
  }
});

module.exports = router;
