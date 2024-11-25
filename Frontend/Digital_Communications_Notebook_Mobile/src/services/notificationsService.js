import { supabase } from "../../supabaseClient";

const API_BASE_URL = "http://10.0.2.2:5000/api/notifications";

/**
 * Retrieve notifications for the authenticated user.
 * @returns {Promise<Array>} List of notifications for the user.
 */
export const getNotifications = async () => {
  try {
    const token = (await supabase.auth.getSession())?.data?.session
      ?.access_token;

    if (!token) {
      throw new Error("Authentication token is missing");
    }

    const response = await fetch(`${API_BASE_URL}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch notifications");
    }

    const notifications = await response.json();

    // Always return an array
    return Array.isArray(notifications) ? notifications : [];
  } catch (err) {
    console.error("Error fetching notifications:", err.message);
    throw err;
  }
};
