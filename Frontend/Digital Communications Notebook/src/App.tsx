import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterAccountScreen";
import CreateAssignmentScreen from "./components/screens/CreateAssigmentsScreen";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect to login by default */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/addAssignment" element={<CreateAssignmentScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
