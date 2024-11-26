const express = require("express");
const authenticateUser = require("../middlewares/authenticateUser");
const supabase = require("../config/supabaseClient");

const router = express.Router();

// Endpoint to fetch students with the same grade as the class, excluding those already in the class
router.get("/:class_id/grade-students", authenticateUser, async (req, res) => {
  const { class_id } = req.params;

  try {
    // Fetch the grade of the class
    const { data: classDetails, error: classError } = await supabase
      .from("Classes")
      .select("grade_id")
      .eq("class_id", class_id)
      .single();

    if (classError || !classDetails) {
      return res.status(404).json({ error: "Class not found" });
    }

    const gradeId = classDetails.grade_id;

    // Fetch students with the same grade but not enrolled in the class
    // First, fetch the student IDs already in the class
    const { data: classStudents, error: classStudentsError } = await supabase
      .from("Classes_Students")
      .select("student_id")
      .eq("class_id", class_id);

    if (classStudentsError) {
      console.error(
        "Error fetching class students:",
        classStudentsError.message
      );
      return res.status(500).json({ error: "Failed to fetch class students" });
    }

    // Extract the student IDs from the result
    const enrolledStudentIds = classStudents.map((cs) => cs.student_id);

    // If there are no enrolled students, the filter should not be applied
    const studentsQuery = supabase
      .from("Users")
      .select("user_id, username, email, profile_picture_url")
      .eq("role_id", "de9333c1-bae7-4677-99d1-c82b5097ffe5") // Student role
      .eq("grade_id", gradeId); // Same grade as the class

    // Apply the filter only if there are students already enrolled
    if (enrolledStudentIds.length > 0) {
      studentsQuery.not("user_id", "in", `(${enrolledStudentIds.join(",")})`);
    }

    // Now fetch students with the same grade but exclude those already enrolled
    const { data: students, error: studentsError } = await studentsQuery;

    if (studentsError) {
      console.error("Error fetching students:", studentsError.message);
      return res.status(500).json({ error: "Failed to fetch students" });
    }

    res.status(200).json(students);
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to fetch students in a specific class
router.get("/:class_id/students", authenticateUser, async (req, res) => {
  const { class_id } = req.params;

  try {
    // Fetch students associated with the class
    const { data: classStudents, error } = await supabase
      .from("Classes_Students")
      .select("student_id")
      .eq("class_id", class_id);

    if (error) {
      console.error("Error fetching class students:", error.message);
      return res
        .status(500)
        .json({ error: "Failed to fetch students for the class" });
    }

    if (classStudents.length === 0) {
      return res.status(200).json([]);
    }

    const studentIds = classStudents.map((cs) => cs.student_id);

    // Fetch detailed user information for the students
    const { data: students, error: studentsError } = await supabase
      .from("Users")
      .select("user_id, username, email, profile_picture_url")
      .in("user_id", studentIds);

    if (studentsError) {
      console.error("Error fetching student details:", studentsError.message);
      return res.status(500).json({ error: "Failed to fetch student details" });
    }

    res.status(200).json(students);
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

// Endpoint to add students to a class and notify them
router.post("/:class_id/add-students", authenticateUser, async (req, res) => {
  const { class_id } = req.params;
  const { student_ids } = req.body; // Expecting an array of student IDs

  if (!Array.isArray(student_ids) || student_ids.length === 0) {
    return res.status(400).json({ error: "Invalid or missing student IDs." });
  }

  try {
    // Get class details
    const { data: classData, error: classError } = await supabase
      .from("Classes")
      .select("name")
      .eq("class_id", class_id)
      .single();

    if (classError || !classData) {
      console.error("Error fetching class details:", classError?.message);
      return res.status(500).json({ error: "Failed to fetch class details." });
    }

    const className = classData.name;

    // Insert students into Classes_Students table
    const { error: insertError } = await supabase
      .from("Classes_Students")
      .insert(
        student_ids.map((student_id) => ({
          class_id,
          student_id,
        }))
      );

    if (insertError) {
      console.error(
        "Error inserting students into class:",
        insertError.message
      );
      return res
        .status(500)
        .json({ error: "Failed to add students to the class." });
    }

    // Send notifications to each student
    const notifications = student_ids.map((student_id) => ({
      content: `You have been added to the class "${className}"!`,
      time: new Date().toISOString(),
    }));

    const { data: notificationData, error: notificationError } = await supabase
      .from("Notifications")
      .insert(notifications)
      .select();

    if (notificationError || !notificationData) {
      console.error(
        "Error creating notifications:",
        notificationError?.message
      );
      return res.status(500).json({ error: "Failed to create notifications." });
    }

    // Link notifications to students
    const notificationsUsers = notificationData.map((notification, index) => ({
      notification_id: notification.notification_id,
      user_id: student_ids[index],
      is_read: false,
    }));

    const { error: linkError } = await supabase
      .from("Notifications_Users")
      .insert(notificationsUsers);

    if (linkError) {
      console.error(
        "Error linking notifications to students:",
        linkError.message
      );
      return res
        .status(500)
        .json({ error: "Failed to link notifications to students." });
    }

    res
      .status(200)
      .json({
        message: "Students successfully added to the class and notified.",
      });
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
