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

// Endpoint to fetch details for a specific class
router.get("/:class_id", authenticateUser, async (req, res) => {
  console.log("Authenticated user:", req.auth); // Log the authenticated user
  const { class_id } = req.params;

  try {
    // Fetch the class details
    const { data: classDetails, error: classError } = await supabase
      .from("Classes")
      .select(
        `class_id, name, day, start_time, end_time, Grades (grade_id, name), teacher_id`
      )
      .eq("class_id", class_id)
      .single(); // Expecting one result

    if (classError) {
      console.error("Error fetching class details:", classError.message);
      return res.status(404).json({ error: "Class not found" });
    }

    // Fetch the teacher's username
    const { data: teacher, error: teacherError } = await supabase
      .from("Users")
      .select("username")
      .eq("user_id", classDetails.teacher_id)
      .single(); // Expecting one result

    if (teacherError) {
      console.error("Error fetching teacher's username:", teacherError.message);
      return res.status(500).json({ error: "Failed to fetch teacher details" });
    }

    // Fetch assignments for the class
    const { data: assignments, error: assignmentsError } = await supabase
      .from("Assignments")
      .select("assignment_id, description, title, assigned_at, due_for")
      .eq("class_id", class_id); // Assume `class_id` exists in `Assignments` table

    if (assignmentsError) {
      console.error("Error fetching assignments:", assignmentsError.message);
      return res
        .status(500)
        .json({ error: "Failed to fetch assignments for the class" });
    }

    // Categorize assignments as active or expired
    const currentTime = new Date();
    const activeAssignments = assignments.filter(
      (assignment) => new Date(assignment.due_for) >= currentTime
    );
    const expiredAssignments = assignments.filter(
      (assignment) => new Date(assignment.due_for) < currentTime
    );

    // Combine all data into the response object
    const response = {
      ...classDetails,
      teacher_username: teacher.username, // Attach the teacher's username
      activeAssignments,
      expiredAssignments,
    };

    res.status(200).json(response); // Return the full response
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to create a new class
router.post("/", authenticateUser, async (req, res) => {
  const { name, grade_id, day, start_time, end_time } = req.body;
  const userId = req.auth.user.id; // Get the authenticated user's ID

  try {
    // Validate input
    if (!name || !grade_id || !day || !start_time || !end_time) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Insert the new class into the Classes table
    const { data: newClass, error } = await supabase
      .from("Classes")
      .insert([
        {
          name,
          grade_id,
          day,
          start_time,
          end_time,
          teacher_id: userId,
        },
      ])
      .select()
      .single(); // Return the inserted row

    if (error) {
      console.error("Error inserting class:", error.message);
      return res.status(500).json({ error: "Failed to create class" });
    }

    res.status(201).json(newClass); // Return the newly created class
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to delete a class
router.delete("/:class_id", authenticateUser, async (req, res) => {
  const { class_id } = req.params;
  const userId = req.auth.user.id; // Get the authenticated user's ID

  try {
    // Check if the authenticated user is the teacher of the class
    const { data: classDetails, error: fetchError } = await supabase
      .from("Classes")
      .select("teacher_id")
      .eq("class_id", class_id)
      .single();

    if (fetchError || !classDetails) {
      console.error(
        "Error fetching class:",
        fetchError?.message || "Not found"
      );
      return res.status(404).json({ error: "Class not found" });
    }

    if (classDetails.teacher_id !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this class" });
    }

    // Delete the class
    const { error: deleteError } = await supabase
      .from("Classes")
      .delete()
      .eq("class_id", class_id);

    if (deleteError) {
      console.error("Error deleting class:", deleteError.message);
      return res.status(500).json({ error: "Failed to delete class" });
    }

    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
