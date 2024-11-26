import { supabase } from "../../supabaseClient"; // Ensure this path is correct

const API_BASE_URL = "http://10.0.2.2:5000"; // Base URL for your API

/**
 * Fetches user data from Supabase and your backend API
 * @returns {Promise<Object|null>} User profile or null if an error occurs
 */
export const fetchUserData = async () => {
  try {
    // Get the authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error("Error fetching authenticated user:", authError?.message);
      return null;
    }

    // Get the access token
    const token = (await supabase.auth.getSession())?.data?.session
      ?.access_token;

    if (!token) {
      console.error("Error: No access token found");
      return null;
    }

    // Fetch additional user data from your backend API
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error(
        "Error fetching additional user data:",
        response.statusText
      );
      return null;
    }

    const data = await response.json();

    return {
      username: data.username,
      email: data.email,
      profilePicture: data.profile_picture_url,
      role: data.Roles?.name || null,
      grade: data.Grades?.name || null,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
