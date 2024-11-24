import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

const backgroundColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
]; // Replace with your color palette

const ClassesCard = ({
  classId,
  className,
  gradeName,
  day,
  startTime,
  endTime,
  teacherName,
}) => {
  const navigation = useNavigation();

  // Generate persistent color based on `classId`
  const colorIndex = parseInt(classId.slice(-1), 16) % backgroundColors.length;
  const colorClass = backgroundColors[colorIndex];

  const handleCardPress = () => {
    navigation.navigate("ClassDetails", { classId }); // Navigate to ClassDetails with classId
  };

  return (
    <TouchableOpacity
      onPress={handleCardPress}
      className={`flex flex-col rounded-2xl ${colorClass} p-4 w-full max-w-md relative`}
    >
      {/* Background Image */}
      <ImageBackground
        source={require("../../../assets/class_logo.png")} // Replace with your image path
        resizeMode="contain"
        className="absolute inset-0 opacity-20 rounded-2xl"
      />

      {/* Overlay */}
      <View className="absolute inset-0 bg-black opacity-10 rounded-2xl"></View>

      {/* First Row: Class Name and Grade */}
      <View className="flex-row justify-between items-center mb-2 z-10">
        <Text className="text-white text-xl font-bold">{className}</Text>
        <Text className="text-white text-sm">{gradeName}</Text>
      </View>

      {/* Second Row: Schedule */}
      <View className="mb-2 z-10">
        <Text className="text-white text-sm">
          {day}, {startTime} - {endTime}
        </Text>
      </View>

      {/* Third Row: Teacher Name */}
      <View className="z-10">
        <Text className="text-white text-sm">Teacher: {teacherName}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ClassesCard;
