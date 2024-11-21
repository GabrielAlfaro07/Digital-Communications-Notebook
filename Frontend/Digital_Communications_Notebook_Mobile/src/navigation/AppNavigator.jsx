import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import UniversalHeader from "../components/headers/UniversalHeader"; // Adapted for React Native
import { fetchUserData } from "../services/usersService"; // Import your user fetching service
import HomeScreen from "../screens/HomeScreen";
import AssignmentsScreen from "../screens/AssignmentsScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  // Fetch user data
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setIsLoading(true);
        const profile = await fetchUserData();
        setUserProfile(profile || null);
      } catch (error) {
        setErrorMessage("Error fetching user data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Map screen names to header titles
  const screenToTitle = {
    Home: "Home",
    Assignments: "Assignments",
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          header: () =>
            route.name === "Login" || route.name === "Register" ? null : (
              <UniversalHeader
                title={screenToTitle[route.name] || "Dashboard"}
                profileName={userProfile?.username}
                profileEmail={userProfile?.email}
                profilePicture={userProfile?.profilePicture || ""}
                userRole={userProfile?.role || undefined}
                userGrade={userProfile?.grade || undefined}
                isLoading={isLoading}
                errorMessage={errorMessage}
              />
            ),
        })}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Assignments" component={AssignmentsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
