import React from "react";
import { TouchableOpacity, Text } from "react-native";

const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      className="w-full bg-blue-500 py-2 rounded-md items-center"
      onPress={onPress}
    >
      <Text className="text-white font-semibold">{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
