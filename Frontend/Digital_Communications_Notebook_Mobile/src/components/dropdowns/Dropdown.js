// src/components/Dropdown.js
import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { View } from "react-native";

const Dropdown = ({ value, onChange, items }) => {
  return (
    <View className="w-full my-4">
      <RNPickerSelect
        value={value}
        onValueChange={(selectedValue) => {
          console.log("Selected:", selectedValue); // For debugging
          onChange(selectedValue); // This should call the passed `onChange` prop
        }}
        items={items}
        style={{
          inputAndroid: {
            paddingVertical: 2,
            paddingHorizontal: 12,
            borderWidth: 1,
            borderColor: "#D1D5DB", // Equivalent to `border-gray-300`
            borderRadius: 8,
            width: "100%",
          },
          inputIOS: {
            paddingVertical: 2,
            paddingHorizontal: 12,
            borderWidth: 3,
            borderColor: "#D1D5DB", // Equivalent to `border-gray-300`
            borderRadius: 8,
            width: "100%",
          },
        }}
      />
    </View>
  );
};

export default Dropdown;
