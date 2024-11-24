import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AssignmentsCard = ({ assignment }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("AssignmentDetails", {
      assignmentId: assignment.assignment_id,
    });
  };

  const formattedAssignedAt = new Date(assignment.assigned_at).toLocaleString();
  const formattedDueFor = new Date(assignment.due_for).toLocaleString();

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="my-2 p-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 transition-all"
    >
      <View>
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
    </TouchableOpacity>
  );
};

export default AssignmentsCard;
