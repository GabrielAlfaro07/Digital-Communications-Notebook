// src/screens/RegisterScreen.js
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Input from "../components/inputs/Input";
import Button from "../components/buttons/Button";
import TextButton from "../components/buttons/TextButton";
import { useNavigation } from "@react-navigation/native";
import Dropdown from "../components/dropdowns/Dropdown";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [role, setRole] = useState(""); // Start with empty value
  const [roles, setRoles] = useState([]);
  const [grade, setGrade] = useState(""); // Start with empty value
  const [grades, setGrades] = useState([]);

  const handleRegister = () => {
    console.log("Register:", { username, email, password, role, grade });
  };

  useEffect(() => {
    setRoles([
      { label: "Student", value: "1" },
      { label: "Teacher", value: "2" },
    ]);
    setGrades([
      { label: "Grade 1", value: "1" },
      { label: "Grade 2", value: "2" },
    ]);
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 px-6">
      <Text className="text-2xl font-bold mb-6">Register</Text>
      <Input
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <View className="h-4" />
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <View className="h-4" />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Dropdown value={role} onChange={setRole} items={roles} />
      {role === "1" && ( // Show grades dropdown only for students
        <Dropdown value={grade} onChange={setGrade} items={grades} />
      )}
      <View className="h-6" />
      <Button title="Register" onPress={handleRegister} />
      <View className="h-4" />
      <TextButton
        title="Already have an account? Log In"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

export default RegisterScreen;
