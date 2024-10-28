// src/screens/LoginScreen.tsx
import React, { useState } from "react";
import Title from "../titles/Title";
import Input from "../inputs/Input";
import LoginButton from "../buttons/LoginButton";
import CreateNewAccountScreenButton from "../buttons/RegisterAccountScreenButton";

interface LoginScreenProps {
  onRegisterClick: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onRegisterClick }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    // Lógica para manejar el login
    console.log("Login:", { email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Title>Login</Title>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <LoginButton onClick={handleLogin} />
      <CreateNewAccountScreenButton onClick={onRegisterClick} />
    </div>
  );
};

export default LoginScreen;
