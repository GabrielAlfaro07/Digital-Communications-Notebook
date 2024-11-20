import React from "react";
import { View, Text } from "react-native";

const AssignmentsScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <Text className="text-xl font-bold">Assignments List</Text>
      {/* Fetch and display assignments from your API here */}
    </View>
  );
};

export default AssignmentsScreen;
