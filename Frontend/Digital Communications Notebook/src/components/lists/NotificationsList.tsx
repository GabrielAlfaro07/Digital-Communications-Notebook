import React from "react";

interface Notification {
  notification_id: string;
  content: string;
  time: string;
}

interface NotificationsListProps {
  notifications: Notification[];
}

const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
}) => {
  return (
    <ul className="divide-y divide-gray-200">
      {notifications.length === 0 ? (
        <li className="text-gray-500 text-sm">No notifications available</li>
      ) : (
        notifications.map((notification) => (
          <li key={notification.notification_id} className="py-2">
            <p className="text-gray-800">{notification.content}</p>
            <p className="text-gray-500 text-xs">
              {new Date(notification.time).toLocaleString()}
            </p>
          </li>
        ))
      )}
    </ul>
  );
};

export default NotificationsList;
