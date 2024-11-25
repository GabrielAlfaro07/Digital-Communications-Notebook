import React from "react";
import { FlatList, Text, View } from "react-native";

const NotificationsList = ({ notifications }) => {
  if (notifications.length === 0) {
    return (
      <Text className="text-gray-500 text-sm">No notifications available</Text>
    );
  }

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.notification_id}
      renderItem={({ item }) => (
        <View className="py-2 border-b border-gray-200">
          <Text className="text-gray-800">{item.content}</Text>
          <Text className="text-gray-500 text-xs">
            {new Date(item.time).toLocaleString()}
          </Text>
        </View>
      )}
    />
  );
};

export default NotificationsList;
