import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getAssignmentById } from "../services/assignmentsService";
import Button from "../components/buttons/Button";
import ScreenBackground from "./ScreenBackground";

const AssignmentDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { assignmentId } = route.params;

  const [assignment, setAssignment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      try {
        const fetchedAssignment = await getAssignmentById(assignmentId);
        setAssignment(fetchedAssignment);
      } catch (err) {
        setError("Failed to load assignment details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignmentDetails();
  }, [assignmentId]);

  const handleBack = () => {
    navigation.goBack();
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#00bcd4" />
        <Text className="text-gray-600 mt-4">
          Loading assignment details...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-600 text-lg font-semibold">{error}</Text>
      </View>
    );
  }

  return (
    <ScreenBackground>
      <ScrollView className="p-4">
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          {assignment.title}
        </Text>
        <Text className="text-base text-gray-800 mb-4">
          {assignment.description}
        </Text>
        <Text className="text-sm text-gray-600 mb-2">
          <Text className="font-semibold">Assigned At: </Text>
          {new Date(assignment.assigned_at).toLocaleString()}
        </Text>
        <Text className="text-sm text-gray-600 mb-4">
          <Text className="font-semibold">Due For: </Text>
          {new Date(assignment.due_for).toLocaleString()}
        </Text>

        <Text className="text-lg font-semibold text-gray-900 mb-2">
          Documents
        </Text>
        {assignment.documents && assignment.documents.length > 0 ? (
          assignment.documents.map((doc) => (
            <Text key={doc.document_id} className="text-sm text-blue-500 mb-1">
              - {doc.file_url}
            </Text>
          ))
        ) : (
          <Text className="text-sm text-gray-600 mb-4">
            No documents available.
          </Text>
        )}

        <Button title="Back to Class" onPress={handleBack} />
      </ScrollView>
    </ScreenBackground>
  );
};

export default AssignmentDetailsScreen;
