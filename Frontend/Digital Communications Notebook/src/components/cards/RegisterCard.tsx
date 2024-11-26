import React, { useState, useEffect } from "react";
import Title from "../titles/Title";
import Input from "../inputs/Input";
import RolesDropdown from "../dropdowns/RolesDropdown";
import GradesDropdown from "../dropdowns/GradesDropdown";
import RegisterButton from "../buttons/RegisterAccountButton";

interface Role {
  role_id: string;
  name: string;
}

interface RegisterCardProps {
  username: string;
  email: string;
  password: string;
  role: string;
  grade: string;
  setUsername: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setRole: (value: string) => void;
  setGrade: (value: string) => void;
  onRegister: () => void;
}

const RegisterCard: React.FC<RegisterCardProps> = ({
  username,
  email,
  password,
  role,
  grade,
  setUsername,
  setEmail,
  setPassword,
  setRole,
  setGrade,
  onRegister,
}) => {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/roles");
        const data = await response.json();
        setRoles(data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const selectedRoleName = roles.find((r) => r.role_id === role)?.name;

  return (
    <div className="flex flex-col items-center bg-white shadow-md p-8 rounded-lg w-full max-w-sm">
      <div className="mb-4">
        <Title>Sign Up</Title>
      </div>
      <Input
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <RolesDropdown value={role} onChange={(e) => setRole(e.target.value)} />
      {selectedRoleName === "Student" && (
        <GradesDropdown
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
      )}
      <RegisterButton onClick={onRegister} />
    </div>
  );
};

export default RegisterCard;
