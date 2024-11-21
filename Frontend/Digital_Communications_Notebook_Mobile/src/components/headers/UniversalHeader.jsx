import React from "react";
import { Text, View, ActivityIndicator } from "react-native";
import Header from "./Header";
import ProfileButton from "../buttons/ProfileButton"; // Adjust ProfileButton for React Native

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
    <Header>
      {/* Center: Title */}
      <Text className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold">
        {title}
      </Text>

      {/* Right Side: Profile Button */}
      <View className="ml-auto">
        {isLoading ? (
          <ActivityIndicator size="small" color="#888" />
        ) : errorMessage ? (
          <Text className="text-sm text-red-500">{errorMessage}</Text>
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
