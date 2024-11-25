import React from "react";
import { Text, View, ActivityIndicator } from "react-native";
import Header from "./Header";
import ProfileButton from "../buttons/ProfileButton"; // Adjust ProfileButton for React Native
import NotificationsButton from "../buttons/NotificationsButton"; // Import your NotificationsButton

const UniversalHeader = ({
  title,
  profileName = "Loading...",
  profileEmail = "Loading...",
  profilePicture = "",
  userRole = "",
  userGrade = "",
  isLoading = false,
  errorMessage = "",
}) => {
  return (
    <Header className="flex-row items-center justify-between px-4 py-2 bg-blue-600">
      {/* Left Side: Notifications Button */}
      <View className="flex-row items-center">
        <NotificationsButton />
      </View>

      {/* Center: Title */}
      <Text className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold text-black">
        {title}
      </Text>

      {/* Right Side: Profile Button */}
      <View className="ml-auto">
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : errorMessage ? (
          <Text className="text-sm text-red-400">{errorMessage}</Text>
        ) : (
          <ProfileButton
            name={profileName}
            email={profileEmail}
            profilePicture={profilePicture}
            userRole={userRole}
            userGrade={userGrade}
          />
        )}
      </View>
    </Header>
  );
};

export default UniversalHeader;
