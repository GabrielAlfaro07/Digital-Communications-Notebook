import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <Text className="text-xl font-bold">Welcome to the App</Text>
      <Button
        title="View Assignments"
        onPress={() => navigation.navigate("Assignments")}
      />
    </View>
  );
};

export default HomeScreen;
