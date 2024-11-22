import React from "react";
import { View, Text } from "react-native";

const AssignmentsCard = ({ assignment }) => {
  const formattedAssignedAt = new Date(assignment.assigned_at).toLocaleString();
  const formattedDueFor = new Date(assignment.due_for).toLocaleString();

  return (
    <View className="p-4 border rounded-lg shadow-sm bg-white hover:bg-gray-100 transition-all">
      <Text className="text-lg font-semibold text-gray-800 mb-2">
        {assignment.title}
      </Text>
      <Text className="text-sm text-gray-600 mb-2">
        <Text className="font-bold">Assigned:</Text> {formattedAssignedAt}
      </Text>
      <Text className="text-sm text-gray-600">
        <Text className="font-bold">Due:</Text> {formattedDueFor}
      </Text>
    </View>
  );
};

export default AssignmentsCard;
