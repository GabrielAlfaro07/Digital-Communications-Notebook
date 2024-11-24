import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import UniversalHeader from "../components/headers/UniversalHeader";
import { fetchUserData } from "../services/usersService";
import AssignmentDetailsScreen from "../screens/AssignmentDetailsScreen"; // Import the new screen
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ClassesScreen from "../screens/ClassesScreen";
import ClassDetailsScreen from "../screens/ClassDetailsScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

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

  const screenToTitle = {
    Classes: "Classes",
    ClassDetails: "Class Details",
    AssignmentDetails: "Assignment Details",
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
        <Stack.Screen name="Classes" component={ClassesScreen} />
        <Stack.Screen name="ClassDetails" component={ClassDetailsScreen} />
        <Stack.Screen
          name="AssignmentDetails"
          component={AssignmentDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
