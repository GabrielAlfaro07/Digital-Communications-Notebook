import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AssignmentsCard from "../components/cards/AssignmentsCard";
import { fetchClassDetails } from "../services/classesService";
import Button from "../components/buttons/Button";

const ClassDetailsScreen = () => {
  const [classDetails, setClassDetails] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [expiredAssignments, setExpiredAssignments] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { classId } = route.params;

  useEffect(() => {
    const loadClassDetails = async () => {
      try {
        const details = await fetchClassDetails(classId);
        setClassDetails(details);
        setAssignments(details.activeAssignments || []);
        setExpiredAssignments(details.expiredAssignments || []);
      } catch (error) {
        console.error("Failed to fetch class details:", error.message);
      }
    };

    loadClassDetails();
  }, [classId]);

  const handleBack = () => {
    navigation.goBack();
  };

  if (!classDetails) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text>Loading class details...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      {/* Class Name */}
      <Text className="text-2xl font-bold text-center mb-6">
        {classDetails.name}
      </Text>

      {/* Class Information */}
      <View className="mb-6">
        <Text className="text-lg text-gray-700 mb-2">
          <Text className="font-semibold">Grade:</Text>{" "}
          {classDetails.Grades.name}
        </Text>
        <Text className="text-lg text-gray-700 mb-2">
          <Text className="font-semibold">Schedule:</Text> {classDetails.day},{" "}
          {classDetails.start_time} - {classDetails.end_time}
        </Text>
        <Text className="text-lg text-gray-700">
          <Text className="font-semibold">Teacher:</Text>{" "}
          {classDetails.teacher_username}
        </Text>
      </View>

      {/* Assignments */}
      <View className="mb-6">
        <Text className="text-xl font-semibold text-green-600 mb-4">
          Active Assignments
        </Text>
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <AssignmentsCard
              key={assignment.assignment_id}
              assignment={assignment}
            />
          ))
        ) : (
          <Text className="text-gray-500">No active assignments</Text>
        )}
      </View>

      <View className="mb-6">
        <Text className="text-xl font-semibold text-red-600 mb-4">
          Expired Assignments
        </Text>
        {expiredAssignments.length > 0 ? (
          expiredAssignments.map((assignment) => (
            <AssignmentsCard
              key={assignment.assignment_id}
              assignment={assignment}
            />
          ))
        ) : (
          <Text className="text-gray-500">No expired assignments</Text>
        )}
      </View>

      {/* Back Button */}
      <Button title="Back to Classes" onPress={handleBack} />
    </ScrollView>
  );
};

export default ClassDetailsScreen;
