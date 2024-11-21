import React from "react";
import { View } from "react-native";

const Header = ({ children }) => {
  return (
    <View className="bg-white">
      {/* Optional spacing for status bar */}
      <View className="mt-8"></View>

      {/* Main Header Container */}
      <View className="relative flex-row items-center px-4 py-2 bg-white border-b border-gray-300">
        {/* Children will be placed within this flexible layout */}
        {children}
      </View>
    </View>
  );
};

export default Header;
