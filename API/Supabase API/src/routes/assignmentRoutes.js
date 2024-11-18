const express = require("express");
const authenticateUser = require("../middlewares/authenticateUser");
const supabase = require("../config/supabaseClient");

const router = express.Router();

// Endpoint to fetch details of a specific assignment
router.get("/:assignment_id", authenticateUser, async (req, res) => {
  const { assignment_id } = req.params;

  try {
    // Fetch assignment details
    const { data: assignment, error } = await supabase
      .from("Assignments")
      .select("*") // Select all columns
      .eq("assignment_id", assignment_id)
      .single(); // Expect one result

    if (error) {
      console.error("Error fetching assignment:", error.message);
      return res.status(404).json({ error: "Assignment not found" });
    }

    res.status(200).json(assignment); // Return the assignment details
  } catch (err) {
    console.error("Unexpected error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to create a new assignment
router.post("/", authenticateUser, async (req, res) => {
  const { title, description, assigned_at, due_for, class_id } = req.body;

  try {
    // Validate input
    if (!title || !description || !assigned_at || !due_for || !class_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data: newAssignment, error } = await supabase
      .from("Assignments")
      .insert([
        {
          title,
          description,
          assigned_at,
          due_for,
          class_id,
          created_at: new Date().toISOString(), // Automatically set created_at
        },
      ])
      .select()
      .single(); // Return the inserted assignment

    if (error) {
      console.error("Error creating assignment:", error.message);
      return res.status(500).json({ error: "Failed to create assignment" });
    }

    res.status(201).json(newAssignment); // Return the newly created assignment
  } catch (err) {
    console.error("Unexpected error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to delete an assignment
router.delete("/:assignment_id", authenticateUser, async (req, res) => {
  const { assignment_id } = req.params;

  try {
    const { error } = await supabase
      .from("Assignments")
      .delete()
      .eq("assignment_id", assignment_id);

    if (error) {
      console.error("Error deleting assignment:", error.message);
      return res.status(500).json({ error: "Failed to delete assignment" });
    }

    res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
