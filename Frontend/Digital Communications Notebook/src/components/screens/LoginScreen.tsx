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

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();
      console.log("Login successful:", data);
      // Save session token or redirect the user
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error("Login error:", errorMessage);
      alert(errorMessage);
    }
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
