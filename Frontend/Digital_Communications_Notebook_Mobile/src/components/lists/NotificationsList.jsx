import React from "react";
import { FlatList, Text, View } from "react-native";

const NotificationsList = ({ notifications }) => {
  console.log("Rendered Notifications:", notifications); // Log the notifications
  if (notifications.length === 0) {
    return (
      <Text className="text-gray-500 text-sm">No notifications available</Text>
    );
  }

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item, index) => item.notification_id || index.toString()}
      renderItem={({ item }) => (
        <View className="py-2 border-b border-gray-200">
          <Text className="text-gray-800 mb-2">{item.content}</Text>
          <Text className="text-gray-500 text-xs">
            {item.time
              ? new Date(item.time.replace(" ", "T")).toLocaleString()
              : "Unknown Time"}
          </Text>
        </View>
      )}
    />
  );
};

export default NotificationsList;
