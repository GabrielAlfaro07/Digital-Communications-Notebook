import { supabase } from "../../supabaseClient"; // Assuming this is the same Supabase client used in usersService

export interface Class {
  class_id: string;
  name: string;
  day: string;
  start_time: string;
  end_time: string;
  Grades: {
    grade_id: string;
    name: string;
  };
  teacher_username: string; // The teacher's username is directly attached to each class
}

export const fetchUserClasses = async (): Promise<Class[]> => {
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
    const data: Class[] = await response.json();

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
