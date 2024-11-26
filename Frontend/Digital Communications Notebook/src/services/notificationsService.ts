import { supabase } from "../../supabaseClient";

export interface Notification {
  notification_id: string;
  content: string;
  time: string;
}

export interface UserNotification extends Notification {
  is_read: boolean;
}

const BASE_URL = "http://localhost:5000/api/notifications";

const getToken = async (): Promise<string> => {
  const session = await supabase.auth.getSession();
  const token = session?.data?.session?.access_token;

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  return token;
};

/**
 * Create a notification for all users in a class.
 * @param classId - The ID of the class.
 * @param content - The notification content.
 */
export const createNotificationForClass = async (
  classId: string,
  content: string
): Promise<void> => {
  const token = await getToken();

  const response = await fetch(`${BASE_URL}/class`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ class_id: classId, content }),
  });

  if (!response.ok) {
    throw new Error("Failed to create notification for class");
  }
};

/**
 * Create a notification for a specific user.
 * @param userId - The ID of the user.
 * @param content - The notification content.
 */
export const createNotificationForUser = async (
  userId: string,
  content: string
): Promise<void> => {
  const token = await getToken();

  const response = await fetch(`${BASE_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user_id: userId, content }),
  });

  if (!response.ok) {
    throw new Error("Failed to create notification for user");
  }
};

/**
 * Retrieve notifications for the authenticated user.
 * @returns A list of notifications for the user.
 */
export const getNotifications = async (): Promise<UserNotification[]> => {
  const token = await getToken();

  const response = await fetch(`${BASE_URL}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  const notifications = await response.json();

  // Always return an array
  return Array.isArray(notifications) ? notifications : [];
};
