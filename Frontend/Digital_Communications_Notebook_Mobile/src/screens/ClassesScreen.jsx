import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { fetchStudentClasses } from "../services/classesService";
import ClassesCard from "../components/cards/ClassesCard";
import ScreenBackground from "./ScreenBackground";

const ClassesScreen = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Fetch classes
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

    // Get current date
    const today = new Date();
    const formattedDate = today.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
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
    <ScreenBackground>
      <ScrollView className="flex-1 px-4 pt-6">
        {/* Title and Date Row */}
        <View className="flex-row justify-between items-center mb-4">
          {/* Title */}
          <Text
            className="text-2xl font-bold text-gray-800 flex-1"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            My Classes
          </Text>

          {/* Date */}
          <Text className="text-lg text-gray-600 text-right">
            {currentDate}
          </Text>
        </View>

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
    </ScreenBackground>
  );
};

export default ClassesScreen;
