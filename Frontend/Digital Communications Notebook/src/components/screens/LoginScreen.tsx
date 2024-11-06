import React, { useState } from "react";
import Title from "../titles/Title";
import Input from "../inputs/Input";
import LoginButton from "../buttons/LoginButton";
import CreateNewAccountScreenButton from "../buttons/RegisterAccountScreenButton";
import { useNavigate } from "react-router-dom";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  const handleAssignment = () => {
    navigate("/addAssignment");
  };

  const handleLogin = () => {
    navigate("/classes");
    console.log("Login:", { email, password });
  };

  return (
    <div className="flex flex-col items-center bg-gray-100">
      <div className="flex flex-col items-center justify-center h-screen w-80">
        <div className="mb-4">
          <Title>Login</Title>
        </div>
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
        <CreateNewAccountScreenButton onClick={handleRegister} />
        <button className="text-blue-500 underline" onClick={handleAssignment}>
          Ir a Crear Asignación
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
