import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { fetchStudentClasses } from "../services/classesService";
import ClassesCard from "../components/cards/ClassesCard";

const ClassesScreen = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const data = await fetchStudentClasses();
        setClasses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadClasses();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-2 text-gray-500">Loading classes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 text-center">
          Error: {error}. Please try again later.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-100 px-4 pt-6">
      {/* Title */}
      <Text className="text-2xl font-bold text-gray-800 mb-4">My Classes</Text>

      {/* Classes List */}
      <View className="space-y-4">
        {classes.map((classItem) => (
          <ClassesCard
            key={classItem.class_id}
            classId={classItem.class_id}
            className={classItem.name}
            gradeName={classItem.Grades.name}
            day={classItem.day}
            startTime={classItem.start_time}
            endTime={classItem.end_time}
            teacherName={classItem.teacher_username}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default ClassesScreen;
