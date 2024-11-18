import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import CreateAssignmentScreen from "./components/screens/CreateAssigmentsScreen";
import ClassesScreen from "./components/screens/ClassesScreen";
import AddClassScreen from "./components/screens/AddClassScreen";
import AddStudentScreen from "./components/screens/AddStudentScreen";
import StudentListScreen from "./components/screens/StudentListScreen";
import LoginRegisterScreen from "./components/screens/LoginRegisterScreen";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // Or "dark"
      />
      <Routes>
        {/* Redirect to login by default */}
        <Route path="/" element={<Navigate to="/login-register" replace />} />
        <Route path="/login-register" element={<LoginRegisterScreen />} />
        <Route path="/students" element={<StudentListScreen />} />
        <Route path="/addStudent" element={<AddStudentScreen />} />
        <Route path="/addAssignment" element={<CreateAssignmentScreen />} />
        <Route path="/classes" element={<ClassesScreen />} />
        <Route path="/class" element={<AddClassScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
