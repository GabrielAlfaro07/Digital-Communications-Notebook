import React, { useState } from "react";
import { View, Text } from "react-native";
import Input from "../components/inputs/Input";
import Button from "../components/buttons/Button";
import TextButton from "../components/buttons/TextButton";
import { useNavigation } from "@react-navigation/native";
import { signIn } from "../services/authService";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const { session, user } = await signIn(email, password);
      console.log("Logged in:", { session, user });
      navigation.navigate("Classes");
    } catch (error) {
      console.error("Login error:", error.message);
      alert(`Login failed: ${error.message}`);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#02367b] px-6">
      <Text className="text-2xl font-bold mb-6 text-white">Log In</Text>
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
