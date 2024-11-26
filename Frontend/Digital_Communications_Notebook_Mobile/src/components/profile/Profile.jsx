import React from "react";
import { View, Text, Image } from "react-native";
import LogoutButton from "../buttons/LogoutButton";
import { signOut } from "../../services/authService";
import { useNavigation } from "@react-navigation/native";

const Profile = ({ name, email, profilePicture, userRole, userGrade }) => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(); // Call the service function to log out the user
      console.log("Logged out successfully");
      // You can also navigate to a login screen here if necessary
      navigation.replace("Login"); // Navigate to the login screen
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View className="flex-col items-center bg-white shadow-md rounded-2xl p-4 w-64">
      <Image
        source={{
          uri:
            profilePicture ||
            "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg",
        }}
        className="h-24 w-24 rounded-full mb-4"
      />
      <Text className="text-xl font-bold">{name}</Text>
      <Text className="text-gray-500">{email}</Text>
      <Text className="text-gray-500">{userRole}</Text>
      <Text className="text-gray-500">{userGrade}</Text>

      {/* Pass the handleLogout function to the LogoutButton */}
      <LogoutButton onLogout={handleLogout} />
    </View>
  );
};

export default Profile;
