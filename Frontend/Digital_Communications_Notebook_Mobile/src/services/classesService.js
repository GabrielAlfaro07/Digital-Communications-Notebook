import { supabase } from "../../supabaseClient"; // Ensure this path is correct

const API_BASE_URL = "http://10.0.2.2:5000";

// Fetch classes for the authenticated student
export const fetchStudentClasses = async () => {
  try {
    // Get the access token from Supabase
    const token = (await supabase.auth.getSession())?.data?.session
      ?.access_token;

    if (!token) {
      console.error("Error: No access token found");
      throw new Error("Authentication token is missing");
    }

    // Make the API request with the Authorization header
    const response = await fetch(`${API_BASE_URL}/api/classes/students/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error Response Text:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching student classes:", err.message);
    throw err;
  }
};

// Fetch details for a specific class
export const fetchClassDetails = async (classId) => {
  try {
    const token = (await supabase.auth.getSession())?.data?.session
      ?.access_token;

    if (!token) {
      console.error("Error: No access token found");
      throw new Error("Authentication token is missing");
    }

    const response = await fetch(`${API_BASE_URL}/api/classes/${classId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error Response Text:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching class details:", err.message);
    throw err;
  }
};
