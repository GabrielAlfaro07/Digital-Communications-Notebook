const express = require("express");
const authenticateUser = require("../middlewares/authenticateUser");
const supabase = require("../config/supabaseClient");

const router = express.Router();

// Create a notification for all students in a class
router.post("/class/:class_id", authenticateUser, async (req, res) => {
  const { class_id } = req.params;
  const { content } = req.body;

  try {
    // Validate input
    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    // Create the notification
    const { data: notification, error: notificationError } = await supabase
      .from("Notifications")
      .insert([{ content, time: new Date().toISOString() }])
      .select()
      .single();

    if (notificationError) {
      console.error("Error creating notification:", notificationError.message);
      return res.status(500).json({ error: "Failed to create notification" });
    }

    // Get all students in the class
    const { data: students, error: studentsError } = await supabase
      .from("Classes_Students")
      .select("student_id")
      .eq("class_id", class_id);

    if (studentsError) {
      console.error("Error fetching students:", studentsError.message);
      return res.status(500).json({ error: "Failed to fetch students" });
    }

    // Map students to create notification-user relationships
    const notificationsUsers = students.map((student) => ({
      notification_id: notification.notification_id,
      user_id: student.student_id,
      is_read: false,
    }));

    // Insert into Notifications_Users table
    const { error: notificationsUsersError } = await supabase
      .from("Notifications_Users")
      .insert(notificationsUsers);

    if (notificationsUsersError) {
      console.error(
        "Error creating notifications for users:",
        notificationsUsersError.message
      );
      return res
        .status(500)
        .json({ error: "Failed to create notifications for users" });
    }

    res.status(201).json({ message: "Notification created for all students" });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a notification for a specific user
router.post("/user/:user_id", authenticateUser, async (req, res) => {
  const { user_id } = req.params;
  const { content } = req.body;

  try {
    // Validate input
    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    // Create the notification
    const { data: notification, error: notificationError } = await supabase
      .from("Notifications")
      .insert([{ content, time: new Date().toISOString() }])
      .select()
      .single();

    if (notificationError) {
      console.error("Error creating notification:", notificationError.message);
      return res.status(500).json({ error: "Failed to create notification" });
    }

    // Add notification to the user
    const { error: notificationsUsersError } = await supabase
      .from("Notifications_Users")
      .insert([
        {
          notification_id: notification.notification_id,
          user_id,
          is_read: false,
        },
      ]);

    if (notificationsUsersError) {
      console.error(
        "Error creating notification for user:",
        notificationsUsersError.message
      );
      return res
        .status(500)
        .json({ error: "Failed to create notification for user" });
    }

    res.status(201).json({ message: "Notification created for the user" });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retrieve all notifications for the authenticated user
router.get("/me", authenticateUser, async (req, res) => {
  try {
    // Use the authenticated user's ID
    const userId = req.auth.user.id;

    // Fetch notifications for the user
    const { data: notifications, error: notificationsError } = await supabase
      .from("Notifications_Users")
      .select(
        `
          Notifications(notification_id, content, time),
          is_read
        `
      )
      .eq("user_id", userId);

    // Handle any database errors
    if (notificationsError) {
      console.error(
        "Error fetching notifications for user:",
        notificationsError.message
      );
      return res
        .status(500)
        .json({ error: "Failed to fetch notifications for user" });
    }

    // Return an empty array if no notifications are found
    res.status(200).json(notifications || []);
  } catch (err) {
    console.error("Unexpected error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
