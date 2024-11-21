import React from "react";
import { Pressable, Text } from "react-native";

const LogoutButton = ({ onLogout }) => {
  return (
    <Pressable onPress={onLogout} className="bg-red-600 px-4 py-2 rounded-full">
      <Text className="text-white text-sm">Log Out</Text>
    </Pressable>
  );
};

export default LogoutButton;
