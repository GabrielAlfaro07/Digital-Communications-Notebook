// src/components/LoginButton.tsx
import React from "react";
import Button from "./Button";

interface LoginButtonProps {
  onClick: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onClick }) => (
  <Button onClick={onClick} hoverText="Log In">
    Log in
  </Button>
);

export default LoginButton;
