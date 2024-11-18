import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  matchPath,
} from "react-router-dom";
import UniversalHeader from "./components/headers/UniversalHeader"; // Import your header component
import { fetchUserData, UserProfile } from "./services/usersService"; // Import the fetchUserData function
import ClassesScreen from "./components/screens/ClassesScreen";
import AddClassScreen from "./components/screens/AddClassScreen";
import AddStudentScreen from "./components/screens/AddStudentScreen";
import StudentListScreen from "./components/screens/StudentListScreen";
import LoginRegisterScreen from "./components/screens/LoginRegisterScreen";
import "react-toastify/dist/ReactToastify.css";
import ClassDetailsScreen from "./components/screens/ClassDetailsScreen";
import AddAssignmentScreen from "./components/screens/AddAssignmentScreen";

const MainContent: React.FC = () => {
  const location = useLocation();
  const isLoginScreen = location.pathname === "/login-register";

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch user data when the component mounts
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const profile = await fetchUserData();
        if (profile) {
          setUserProfile(profile);
        } else {
          setErrorMessage("Failed to load user profile.");
        }
      } catch (error) {
        setErrorMessage("Error fetching user data.");
      } finally {
        setIsLoading(false);
      }
    };
    loadUserData();
  }, []);

  // Mapping of pathnames to header titles
  const pathnameToTitle: Record<string, string> = {
    "/classes": "Classes",
    "/addClass": "Add Class",
    "/students": "Student List",
    "/addStudent": "Add Student",
    "/addAssignment": "Add Assignment",
  };

  // Check if the path matches the dynamic class route
  const match = matchPath("/class/:classId", location.pathname);

  // Determine the title
  const title = match
    ? "Class Details"
    : pathnameToTitle[location.pathname] || "Dashboard";

  return (
    <>
      {!isLoginScreen && (
        <UniversalHeader
          title={title}
          profileName={userProfile?.username}
          profileEmail={userProfile?.email}
          profilePicture={userProfile?.profilePicture || ""}
          userRole={userProfile?.role || undefined}
          userGrade={userProfile?.grade || undefined}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      )}
      {/* Main content with routing */}
      <Routes>
        <Route path="/" element={<Navigate to="/login-register" replace />} />
        <Route path="/login-register" element={<LoginRegisterScreen />} />
        <Route path="/classes" element={<ClassesScreen />} />
        <Route path="/class/:classId" element={<ClassDetailsScreen />} />
        <Route path="/students" element={<StudentListScreen />} />
        <Route path="/addStudent" element={<AddStudentScreen />} />
        <Route path="/addAssignment" element={<AddAssignmentScreen />} />
        <Route path="/addClass" element={<AddClassScreen />} />
      </Routes>
    </>
  );
};

export default MainContent;
