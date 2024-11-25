import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import {
  getNotifications,
  Notification,
} from "../../services/notificationsService"; // Import your service
import NotificationsList from "../lists/NotificationsList";

const NotificationsButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleNotifications = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      setError("Failed to fetch notifications.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Notifications Button */}
      <button
        onClick={toggleNotifications}
        className="hover:bg-blue-600 text-white py-3 px-4 rounded-full transition duration-300 ease-in-out"
      >
        <FontAwesomeIcon icon={faBell} size="lg" />
      </button>

      {/* Notifications List */}
      {isOpen && (
        <div
          className="absolute mt-4 z-10 bg-white shadow-lg rounded-lg p-4"
          style={{
            width: "300px", // Set a specific width for the notifications list
          }}
        >
          {loading && <p className="text-gray-500">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <NotificationsList notifications={notifications} />
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsButton;
