import { supabase } from "../../supabaseClient";

const API_BASE_URL = "http://10.0.2.2:5000/api/assignments";

const getToken = async () => {
  const session = await supabase.auth.getSession();
  const token = session?.data?.session?.access_token;

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  return token;
};

/**
 * Fetches the details of a specific assignment by ID, including documents.
 * @param {string} assignmentId - The ID of the assignment to fetch
 * @returns {Promise<Object>} A Promise resolving to the assignment details
 */
export const getAssignmentById = async (assignmentId) => {
  const token = await getToken();

  const response = await fetch(`${API_BASE_URL}/${assignmentId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch assignment details");
  }

  return response.json();
};
