import React from "react";
import Title from "../titles/Title";
import Input from "../inputs/Input";
import LoginButton from "../buttons/LoginButton";

interface LoginCardProps {
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  onLogin: () => void;
}

const LoginCard: React.FC<LoginCardProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  onLogin,
}) => {
  return (
    <div className="flex flex-col items-center bg-white shadow-md p-8 rounded-lg w-full max-w-sm">
      <div className="mb-4">
        <Title>Log In</Title>
      </div>
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
      <LoginButton onClick={onLogin} />
    </div>
  );
};

export default LoginCard;
