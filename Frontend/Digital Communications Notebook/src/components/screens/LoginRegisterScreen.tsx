import React, { useState } from "react";
import LoginCard from "../cards/LoginCard";
import RegisterCard from "../cards/RegisterCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signIn, signUp } from "../../services/authService";

const LoginRegisterScreen: React.FC = () => {
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [grade, setGrade] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { session, user } = await signIn(loginEmail, loginPassword);
      console.log("Session data:", session);
      toast.success("Login successful!");
      console.log("User data:", user);
      navigate("/classes");
    } catch (error) {
      toast.error(
        `Login failed: ${
          error instanceof Error
            ? error.message
            : "An unexpected error occurred."
        }`
      );
    }
  };

  const handleRegister = async () => {
    try {
      // Ensure role is selected
      if (!role) {
        toast.error("Please select a role.");
        return;
      }

      // Validate grade for students
      if (role.toLowerCase() === "student" && !grade) {
        toast.error("Please select a grade for the student.");
        return;
      }

      const currentGrade = grade; // Capture grade explicitly
      console.log("Captured grade_id:", currentGrade); // Debugging log
      console.log("Captured role:", role);

      // Construct additional data
      const additionalData = {
        username,
        information: null,
        role_id: role,
        grade_id:
          role === "de9333c1-bae7-4677-99d1-c82b5097ffe5" ? grade : null,
        profile_picture_url: null,
      };

      console.log("Additional data being sent:", additionalData); // Debugging log

      const user = await signUp(
        registerEmail,
        registerPassword,
        additionalData
      );

      toast.success("Registration successful!");
      console.log("Registered user:", user);
      navigate("/classes");
    } catch (error) {
      toast.error(
        `Registration failed: ${
          error instanceof Error
            ? error.message
            : "An unexpected error occurred."
        }`
      );
    }
  };

  return (
    <div
      className="flex flex-col lg:flex-row items-center justify-center h-screen space-y-4 lg:space-y-0 lg:space-x-8"
      style={{
        backgroundColor: "#02367b",
      }}
    >
      {" "}
      <LoginCard
        email={loginEmail}
        password={loginPassword}
        setEmail={setLoginEmail}
        setPassword={setLoginPassword}
        onLogin={handleLogin}
      />
      <RegisterCard
        username={username}
        email={registerEmail}
        password={registerPassword}
        role={role}
        grade={grade}
        setUsername={setUsername}
        setEmail={setRegisterEmail}
        setPassword={setRegisterPassword}
        setRole={setRole}
        setGrade={setGrade}
        onRegister={handleRegister}
      />
    </div>
  );
};

export default LoginRegisterScreen;
