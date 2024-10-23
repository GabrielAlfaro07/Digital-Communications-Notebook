import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';

const App: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);

  const handleRegisterClick = () => {
    setShowLogin(false);
  };

  const handleBackToLogin = () => {
    setShowLogin(true);
  };

  return (
    <div>
      {showLogin ? (
        <LoginScreen onRegisterClick={handleRegisterClick} />
      ) : (
        <RegisterScreen onBackClick={handleBackToLogin} />
      )}
    </div>
  );
};

export default App;
