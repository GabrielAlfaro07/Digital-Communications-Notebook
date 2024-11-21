import React, { useState } from "react";
import { View, Text } from "react-native";
import Input from "../components/inputs/Input";
import Button from "../components/buttons/Button";
import TextButton from "../components/buttons/TextButton";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    // Logic for logging in
    console.log("Login:", { email, password });
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 px-6">
      <Text className="text-2xl font-bold mb-6">Log In</Text>
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <View className="h-4" />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View className="h-6" />
      <Button title="Log in" onPress={handleLogin} />
      <View className="h-4" />
      <TextButton
        title="Don't have an account? Sign Up"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
};

export default LoginScreen;
