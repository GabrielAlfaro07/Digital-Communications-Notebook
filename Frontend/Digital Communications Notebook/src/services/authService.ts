import { supabase } from "../../supabaseClient";

// Define types for user data and additional sign-up data
interface AdditionalUserData {
  username: string;
  information?: string | null;
  role_id?: string | null;
  grade_id?: string | null;
  profile_picture_url?: string | null;
}

interface User {
  id: string;
  email: string;
  username: string;
  information?: string | null;
  role_id?: string | null;
  grade_id?: string | null;
  profile_picture_url?: string | null;
  status: string;
  created_at: string;
}

interface SignInResponse {
  session: any; // Replace `any` with the exact session type if available from Supabase
  user: User;
}

/**
 * Sign up a new user
 * @param email - User's email
 * @param password - User's password
 * @param additionalData - Additional user information
 * @returns The created user
 */
export const signUp = async (
  email: string,
  password: string,
  additionalData: AdditionalUserData
): Promise<User> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  if (!data.user) throw new Error("User creation failed");

  const { error: dbError } = await supabase.from("Users").insert({
    user_id: data.user.id,
    email,
    username: additionalData.username,
    information: additionalData.information || null,
    role_id: additionalData.role_id || null,
    grade_id: additionalData.grade_id || null,
    profile_picture_url: additionalData.profile_picture_url || null,
    status: "offline",
    created_at: new Date().toISOString(),
  });

  if (dbError) throw new Error(dbError.message);

  return {
    id: data.user.id,
    email,
    username: additionalData.username,
    information: additionalData.information || null,
    role_id: additionalData.role_id || null,
    grade_id: additionalData.grade_id || null,
    profile_picture_url: additionalData.profile_picture_url || null,
    status: "offline",
    created_at: new Date().toISOString(),
  };
};

/**
 * Sign in an existing user
 * @param email - User's email
 * @param password - User's password
 * @returns The session and user data
 */
export const signIn = async (
  email: string,
  password: string
): Promise<SignInResponse> => {
  const { data: session, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  const { data: userData, error: fetchError } = await supabase
    .from("Users")
    .select("*")
    .eq("email", email)
    .single();

  if (fetchError || !userData)
    throw new Error("User not found in the database.");

  const { error: statusError } = await supabase
    .from("Users")
    .update({ status: "online" })
    .eq("user_id", userData.user_id);

  if (statusError) throw new Error("Failed to update user status.");

  return { session, user: userData as User };
};

/**
 * Sign out the current user
 */
export const signOut = async (): Promise<void> => {
  // Get the current authenticated user
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Failed to fetch user data.");
  }

  // Update the user's status to 'offline'
  const { error: statusError } = await supabase
    .from("Users")
    .update({ status: "offline" })
    .eq("user_id", user.user.id);

  if (statusError) throw new Error("Failed to update user status.");

  // Now that the status has been updated, sign the user out
  const { error: signOutError } = await supabase.auth.signOut();

  if (signOutError) throw new Error(signOutError.message);

  console.log("User logged out and status updated to offline.");
};
