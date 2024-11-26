// src/services/usersService.js
import { supabase } from "../../supabaseClient"; // Assuming supabaseClient.js is in src/config

export interface UserProfile {
  username: string;
  email: string;
  profilePicture: string | null;
  role: string | null;
  grade: string | null;
}

export const fetchUserData = async (): Promise<UserProfile | null> => {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error("Error fetching authenticated user:", authError?.message);
      return null;
    }

    // Fetch user data from your backend API
    const token = (await supabase.auth.getSession())?.data?.session
      ?.access_token;

    const response = await fetch(`http://localhost:5000/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Pass the token here
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
