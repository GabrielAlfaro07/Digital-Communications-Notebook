import React, { useState, useEffect } from "react";
import {
  Pressable,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { getNotifications } from "../../services/notificationsService";
import NotificationsList from "../lists/NotificationsList";

const NotificationsButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const screenWidth = Dimensions.get("window").width;
  const notificationListWidth = screenWidth * 0.8; // Set to 80% of the screen width

  return (
    <View style={{ position: "relative" }}>
      {/* Notifications Button */}
      <Pressable
        onPress={toggleNotifications}
        className="bg-yellow-500 p-3 rounded-full"
      >
        <Icon name="bell" size={24} color="white" />
      </Pressable>

      {/* Notifications List */}
      {isOpen && (
        <View className="absolute left-0 mt-16 bg-white shadow-md rounded-2xl p-4 w-64">
          {loading && <ActivityIndicator size="small" color="#000" />}
          {error && <Text style={{ color: "red", fontSize: 14 }}>{error}</Text>}
          {!loading && !error && (
            <NotificationsList notifications={notifications} />
          )}
        </View>
      )}
    </View>
  );
};

export default NotificationsButton;
