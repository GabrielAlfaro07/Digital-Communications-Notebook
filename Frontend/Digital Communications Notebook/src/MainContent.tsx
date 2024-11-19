import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  matchPath,
} from "react-router-dom";
import UniversalHeader from "./components/headers/UniversalHeader";
import { fetchUserData, UserProfile } from "./services/usersService";
import ClassesScreen from "./components/screens/ClassesScreen";
import AddClassScreen from "./components/screens/AddClassScreen";
import AddStudentsScreen from "./components/screens/AddStudentsScreen";
import StudentListScreen from "./components/screens/StudentListScreen";
import LoginRegisterScreen from "./components/screens/LoginRegisterScreen";
import ClassDetailsScreen from "./components/screens/ClassDetailsScreen";
import AddAssignmentScreen from "./components/screens/AddAssignmentScreen";

const MainContent: React.FC = () => {
  const location = useLocation();
  const isLoginScreen = location.pathname === "/login-register";

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch user data when the component mounts or when the route changes to `/classes`
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

    if (location.pathname === "/classes") {
      loadUserData();
    }
  }, [location.pathname]);

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
        <Route path="/addStudent" element={<AddStudentsScreen />} />
        <Route path="/addAssignment" element={<AddAssignmentScreen />} />
        <Route path="/addClass" element={<AddClassScreen />} />
      </Routes>
    </>
  );
};

export default MainContent;
