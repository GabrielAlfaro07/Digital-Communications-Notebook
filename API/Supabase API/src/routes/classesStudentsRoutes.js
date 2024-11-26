const express = require("express");
const authenticateUser = require("../middlewares/authenticateUser");
const supabase = require("../config/supabaseClient");

const router = express.Router();

// Endpoint to fetch classes for a student
router.get("/me", authenticateUser, async (req, res) => {
  try {
    const studentId = req.auth.user.id; // Get the authenticated student's ID

    // Step 1: Fetch classes where the student is enrolled
    const { data: enrolledClasses, error: enrolledClassesError } =
      await supabase
        .from("Classes_Students")
        .select("class_id")
        .eq("student_id", studentId);

    if (enrolledClassesError) {
      console.error(
        "Error fetching enrolled classes:",
        enrolledClassesError.message
      );
      return res
        .status(500)
        .json({ error: "Failed to fetch enrolled classes" });
    }

    if (!enrolledClasses || enrolledClasses.length === 0) {
      return res.status(200).json([]); // Return an empty array if the student is not enrolled in any class
    }

    const classIds = enrolledClasses.map((enrolled) => enrolled.class_id);

    // Step 2: Fetch detailed class information
    const { data: classes, error: classesError } = await supabase
      .from("Classes")
      .select(
        `class_id, name, day, start_time, end_time, Grades (grade_id, name), teacher_id`
      )
      .in("class_id", classIds);

    if (classesError) {
      console.error("Error fetching class details:", classesError.message);
      return res.status(500).json({ error: "Failed to fetch class details" });
    }

    // Step 3: Fetch the usernames of the teachers for the classes
    const teacherIds = [
      ...new Set(classes.map((classItem) => classItem.teacher_id)),
    ];

    const { data: teachers, error: teachersError } = await supabase
      .from("Users")
      .select("user_id, username")
      .in("user_id", teacherIds);

    if (teachersError) {
      console.error(
        "Error fetching teachers' usernames:",
        teachersError.message
      );
      return res.status(500).json({ error: "Failed to fetch teacher details" });
    }

    // Create a map of teacher IDs to usernames for quick lookup
    const teacherMap = Object.fromEntries(
      teachers.map((teacher) => [teacher.user_id, teacher.username])
    );

    // Step 4: Attach the teacher's username to each class
    const response = classes.map((classItem) => ({
      ...classItem,
      teacher_username: teacherMap[classItem.teacher_id] || "Unknown",
    }));

    // Step 5: Return the enriched class data
    res.status(200).json(response);
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
