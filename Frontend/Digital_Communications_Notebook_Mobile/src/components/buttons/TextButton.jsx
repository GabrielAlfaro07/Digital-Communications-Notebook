import React from "react";
import { Text, TouchableOpacity } from "react-native";

const TextButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text className="text-blue-300 underline">{title}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;
