import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterAccountScreen";
import CreateAssignmentScreen from "./components/screens/CreateAssigmentsScreen";
import ClassesScreen from "./components/screens/ClassesScreen";

const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Redirect to login by default */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/addAssignment" element={<CreateAssignmentScreen />} />
        <Route path="/classes" element={<ClassesScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
