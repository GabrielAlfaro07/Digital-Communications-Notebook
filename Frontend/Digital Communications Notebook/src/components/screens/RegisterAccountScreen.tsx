// src/screens/RegisterScreen.tsx
import React, { useState } from "react";
import Title from "../titles/Title";
import Input from "../inputs/Input";
import UserTypeDropdown from "../dropdowns/UserTypeDropdown";
import RegisterButton from "../buttons/RegisterAccountButton";
import BackToLoginButton from "../buttons/LoginScreenButton";
import { useNavigate } from "react-router-dom";

const RegisterScreen: React.FC = () => {
  const [userType, setUserType] = useState<string>("estudiante");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [extraField, setExtraField] = useState<string>("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleRegister = async () => {
    navigate("/classes");
  };

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserType(e.target.value);
    setExtraField("");
  };

  return (
    <div className="flex flex-col items-center bg-gray-100">
      <div className="flex flex-col items-center justify-center h-screen w-80">
        <div className="mb-4">
          <Title>Sign Up</Title>
        </div>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <UserTypeDropdown value={userType} onChange={handleUserTypeChange} />

        {userType === "estudiante" && (
          <Input
            type="text"
            placeholder="Grade"
            value={extraField}
            onChange={(e) => setExtraField(e.target.value)}
          />
        )}
        {userType === "encargado" && (
          <Input
            type="tel"
            placeholder="Phone Number"
            value={extraField}
            onChange={(e) => setExtraField(e.target.value)}
          />
        )}
        {userType === "docente" && (
          <Input
            type="text"
            placeholder="Specialty"
            value={extraField}
            onChange={(e) => setExtraField(e.target.value)}
          />
        )}

        <RegisterButton onClick={handleRegister} />
        <BackToLoginButton onClick={handleBack} />
      </div>
    </div>
  );
};

export default RegisterScreen;
