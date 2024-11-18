import { supabase } from "../../supabaseClient"; // Assuming this is the same Supabase client used in usersService
import { Assignment } from "./assignmentsService";

export interface ClassDetails {
  class_id: string;
  name: string;
  day: string;
  start_time: string;
  end_time: string;
  Grades: {
    grade_id: string;
    name: string;
  };
  teacher_username: string; // Teacher's username attached
  activeAssignments?: Assignment[]; // Active assignments for this class
  expiredAssignments?: Assignment[]; // Expired assignments for this class
}

export const fetchUserClasses = async (): Promise<ClassDetails[]> => {
  try {
    // Get the access token from Supabase
    const token = (await supabase.auth.getSession())?.data?.session
      ?.access_token;

    if (!token) {
      throw new Error("Authentication token not found.");
    }

    // Fetch classes for the authenticated user from the backend
    const response = await fetch(`http://localhost:5000/api/classes/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Use the token retrieved from Supabase
      },
    });

    if (!response.ok) {
      const errorText = await response.text(); // Log raw response if parsing JSON fails
      console.error("Classes API error response:", errorText);
      throw new Error(`Failed to fetch classes: ${response.statusText}`);
    }

    // The API now returns an array of classes, with the teacher's username attached
    const data: ClassDetails[] = await response.json();

    // If the data is empty, return an empty array or handle it in the component
    if (data.length === 0) {
      return []; // Return an empty array if no classes are found
    }

    return data;
  } catch (error) {
    console.error("Error fetching user classes:", error);
    throw new Error("An error occurred while fetching user classes.");
  }
};

export const fetchClassDetails = async (
  classId: string
): Promise<ClassDetails> => {
  try {
    // Get the access token from Supabase
    const token = (await supabase.auth.getSession())?.data?.session
      ?.access_token;

    if (!token) {
      throw new Error("Authentication token not found.");
    }

    // Fetch class details for the specified class ID
    const response = await fetch(
      `http://localhost:5000/api/classes/${classId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Use the token retrieved from Supabase
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text(); // Log raw response if parsing JSON fails
      console.error("Class Details API error response:", errorText);
      throw new Error(`Failed to fetch class details: ${response.statusText}`);
    }

    const data: ClassDetails = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching class details:", error);
    throw new Error("An error occurred while fetching class details.");
  }
};
