import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Input from "../components/inputs/Input";
import Button from "../components/buttons/Button";
import TextButton from "../components/buttons/TextButton";
import { useNavigation } from "@react-navigation/native";
import Dropdown from "../components/dropdowns/Dropdown";
import { fetchRoles } from "../services/rolesService";
import { fetchGrades } from "../services/gradesService";
import { signUp } from "../services/authService"; // Ensure the correct path to authService

const STUDENT_ROLE_ID = "de9333c1-bae7-4677-99d1-c82b5097ffe5"; // Role ID for "Student"

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [role, setRole] = useState(""); // Selected role ID
  const [roles, setRoles] = useState([]);
  const [grade, setGrade] = useState(""); // Selected grade ID
  const [grades, setGrades] = useState([]);

  // Fetch roles from the API
  useEffect(() => {
    const loadRoles = async () => {
      try {
        const rolesData = await fetchRoles();
        // Map roles to the format needed for the dropdown
        setRoles(
          rolesData.map((role) => ({
            label: role.name,
            value: role.role_id,
          }))
        );
      } catch (error) {
        console.error("Error fetching roles:", error.message);
      }
    };

    loadRoles();
  }, []);

  // Fetch grades from the API when the Student role is selected
  useEffect(() => {
    if (role === STUDENT_ROLE_ID) {
      const loadGrades = async () => {
        try {
          const gradesData = await fetchGrades();
          // Map grades to the format needed for the dropdown
          setGrades(
            gradesData.map((grade) => ({
              label: grade.name,
              value: grade.grade_id,
            }))
          );
        } catch (error) {
          console.error("Error fetching grades:", error.message);
        }
      };

      loadGrades();
    } else {
      // Clear grades when the role is not "Student"
      setGrades([]);
      setGrade("");
    }
  }, [role]);

  const handleRegister = async () => {
    try {
      // Prepare additional data for user
      const additionalData = {
        username,
        role_id: role,
        grade_id: grade,
      };

      // Call the signUp service
      const user = await signUp(email, password, additionalData);

      console.log("User registered:", user);

      // After a successful registration, navigate to the "Home" screen
      navigation.navigate("Classes");
    } catch (error) {
      console.error("Registration error:", error.message);
      // Optionally, display an error message to the user
    }
  };

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
      <Dropdown
        value={role}
        onChange={setRole}
        items={roles}
        placeholder="Select a role"
      />
      {role === STUDENT_ROLE_ID && ( // Show grades dropdown only for students
        <Dropdown
          value={grade}
          onChange={setGrade}
          items={grades}
          placeholder="Select a grade"
        />
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
