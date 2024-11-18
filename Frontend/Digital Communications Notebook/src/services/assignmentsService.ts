import { supabase } from "../../supabaseClient";

export interface Assignment {
  assignment_id: string; // Unique ID for the assignment
  title: string; // Title of the assignment
  description: string; // Description of the assignment
  assigned_at: string; // Timestamp when the assignment was assigned
  due_for: string; // Timestamp for when the assignment is due
  created_at?: string; // Timestamp when the assignment was created
  class_id?: string; // Class ID associated with the assignment
}

const BASE_URL = "http://localhost:5000/api/assignments"; // Base URL for assignment API endpoints

// Helper to get the Supabase session token
const getToken = async (): Promise<string> => {
  const session = await supabase.auth.getSession();
  const token = session?.data?.session?.access_token;

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  return token;
};

/**
 * Fetches the details of a specific assignment by ID.
 * @param assignmentId - The ID of the assignment to fetch
 * @returns A Promise resolving to the assignment details
 */
export const getAssignmentById = async (
  assignmentId: string
): Promise<Assignment> => {
  const token = await getToken();

  const response = await fetch(`${BASE_URL}/${assignmentId}`, {
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

/**
 * Creates a new assignment.
 * @param assignmentData - The data for the new assignment
 * @returns A Promise resolving to the newly created assignment
 */
export const createAssignment = async (
  assignmentData: Omit<Assignment, "assignment_id" | "created_at">
): Promise<Assignment> => {
  const token = await getToken();

  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(assignmentData),
  });

  if (!response.ok) {
    throw new Error("Failed to create assignment");
  }

  return response.json();
};

/**
 * Deletes an assignment by ID.
 * @param assignmentId - The ID of the assignment to delete
 * @returns A Promise resolving to a success message
 */
export const deleteAssignment = async (assignmentId: string): Promise<void> => {
  const token = await getToken();

  const response = await fetch(`${BASE_URL}/${assignmentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete assignment");
  }
};
