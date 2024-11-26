import { supabase } from "../../supabaseClient";

const BASE_URL = "http://localhost:5000/api/students";

// Helper to get the Supabase session token
const getToken = async (): Promise<string> => {
  const session = await supabase.auth.getSession();
  const token = session?.data?.session?.access_token;

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  return token;
};

export const fetchStudentsWithSameGrade = async (classId: string) => {
  const token = await getToken();

  const response = await fetch(`${BASE_URL}/${classId}/grade-students`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 404) {
    // Return an empty array if the API responds with 404
    return [];
  }

  if (!response.ok) {
    throw new Error("Failed to fetch students in the class");
  }

  return response.json();
};

export const fetchStudentsInClass = async (classId: string) => {
  const token = await getToken();

  const response = await fetch(`${BASE_URL}/${classId}/students`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 404) {
    // Return an empty array if the API responds with 404
    return [];
  }

  if (!response.ok) {
    throw new Error("Failed to fetch students in the class");
  }

  return response.json();
};

export const addStudentsToClass = async (
  classId: string,
  studentIds: string[]
) => {
  const token = await getToken();

  const response = await fetch(`${BASE_URL}/${classId}/add-students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ student_ids: studentIds }),
  });

  if (!response.ok) {
    throw new Error("Failed to add students to the class");
  }

  return response.json();
};
