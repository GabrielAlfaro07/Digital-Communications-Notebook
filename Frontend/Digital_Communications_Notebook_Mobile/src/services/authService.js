import { supabase } from "../../supabaseClient"; // Ensure this path is correct for your project

/**
 * Sign up a new user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {Object} additionalData - Additional user information
 * @returns {Promise<Object>} The created user
 */
export const signUp = async (email, password, additionalData) => {
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
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} The session and user data
 */
export const signIn = async (email, password) => {
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

  return { session, user: userData };
};

/**
 * Sign out the current user
 * @returns {Promise<void>}
 */
export const signOut = async () => {
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
