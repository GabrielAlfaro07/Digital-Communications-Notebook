import { supabase } from "../../supabaseClient";

export interface Assignment {
  assignment_id: string;
  title: string;
  description: string;
  assigned_at: string;
  due_for: string;
  created_at?: string;
  class_id?: string;
  documents?: {
    document_id: string;
    file_url: string;
    file_type: string;
    uploaded_by: string;
    associated_with: string;
  }[];
}

const BASE_URL = "http://localhost:5000/api/assignments";

const getToken = async (): Promise<string> => {
  const session = await supabase.auth.getSession();
  const token = session?.data?.session?.access_token;

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  return token;
};

/**
 * Fetches the details of a specific assignment by ID, including documents.
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
