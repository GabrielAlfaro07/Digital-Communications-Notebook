import React, { useState } from "react";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterAccountScreen";
import CreateAssignmentScreen from "./components/screens/CreateAssigmentsScreen";
const App: React.FC = () => {
  const [screen, setScreen] = useState<'login' | 'register' | 'assignment'>('login');

  const handleRegisterClick = () => {
    setScreen('register');
  };

  const handleBackToLogin = () => {
    setScreen('login');
  };

  const handleGoToAssignment = () => {
    setScreen('assignment');
  };

  return (
    <div>
      {screen === 'login' && (
        <LoginScreen onRegisterClick={handleRegisterClick} onAssignmentClick={handleGoToAssignment} />
      )}
      {screen === 'register' && (
        <RegisterScreen onBackClick={handleBackToLogin} />
      )}
      {screen === 'assignment' && (
        <CreateAssignmentScreen onBackClick={handleBackToLogin} />
      )}
    </div>
  );
};

export default App;