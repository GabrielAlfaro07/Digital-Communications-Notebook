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

  const handleRegister = async () => {
    try {
      // Register in auth
      const authResponse = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          nombre: username,
        }),
      });

      if (!authResponse.ok) {
        throw new Error("Signup failed. Please try again.");
      }

      const authData = await authResponse.json();
      const userId = authData.user.id;

      // Set up for inserting additional data based on userType
      let apiUrl = "http://localhost:5000/api/";
      let extraData: any = { id_usuario: userId };

      switch (userType) {
        case "estudiante":
          apiUrl += "estudiantes";
          extraData.grado = extraField;
          break;
        case "encargado":
          apiUrl += "encargados";
          extraData.telefono_emergencia = extraField;
          break;
        case "docente":
          apiUrl += "docentes";
          extraData.especialidad = extraField;
          break;
      }

      const insertResponse = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData.session.access_token}`, // Add the token if needed
        },
        body: JSON.stringify(extraData),
      });

      if (!insertResponse.ok) {
        throw new Error("Failed to insert additional user data.");
      }

      const insertData = await insertResponse.json();
      console.log("User registered successfully:", insertData);
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error("Registration error:", errorMessage);
      alert(errorMessage);
    }
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
