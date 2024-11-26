// src/components/Dropdown.js
import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { View } from "react-native";

const Dropdown = ({ value, onChange, items }) => {
  return (
    <View className="w-full mt-4 border border-gray-300 rounded">
      <RNPickerSelect
        value={value}
        onValueChange={(selectedValue) => {
          console.log("Selected:", selectedValue); // For debugging
          onChange(selectedValue); // This should call the passed `onChange` prop
        }}
        items={items}
        style={{
          inputAndroid: {
            paddingHorizontal: 12,
            borderRadius: 8,
            width: "100%",
          },
          inputIOS: {
            paddingHorizontal: 12,
            borderRadius: 8,
            width: "100%",
          },
        }}
      />
    </View>
  );
};

export default Dropdown;
