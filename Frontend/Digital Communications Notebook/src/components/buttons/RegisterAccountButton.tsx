// src/components/RegisterButton.tsx
import React from "react";
import Button from "./Button";

interface RegisterAccountButtonProps {
  onClick: () => void;
}

const RegisterAccountButton: React.FC<RegisterAccountButtonProps> = ({
  onClick,
}) => <Button onClick={onClick}>Sign up</Button>;

export default RegisterAccountButton;
