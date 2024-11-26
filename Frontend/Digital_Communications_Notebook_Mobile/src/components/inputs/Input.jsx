import React from "react";
import { TextInput } from "react-native";

const Input = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}) => {
  return (
    <TextInput
      className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white"
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default Input;
