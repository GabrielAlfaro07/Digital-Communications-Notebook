// src/screens/RegisterScreen.tsx
import React, { useState } from "react";
import Title from "../titles/Title";
import Input from "../inputs/Input";
import UserTypeDropdown from "../dropdowns/UserTypeDropdown";
import RegisterButton from "../buttons/RegisterAccountButton";
import BackToLoginButton from "../buttons/LoginScreenButton";

interface RegisterScreenProps {
  onBackClick: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onBackClick }) => {
  const [userType, setUserType] = useState<string>("estudiante");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [extraField, setExtraField] = useState<string>("");

  const handleRegister = () => {
    console.log("Registro:", {
      username,
      email,
      password,
      userType,
      extraField,
    });
  };

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserType(e.target.value);
    setExtraField("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Title>Sign Up</Title>
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
      <BackToLoginButton onClick={onBackClick} />
    </div>
  );
};

export default RegisterScreen;
