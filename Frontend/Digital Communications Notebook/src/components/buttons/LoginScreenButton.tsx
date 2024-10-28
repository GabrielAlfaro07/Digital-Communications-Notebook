// src/components/BackToLoginButton.tsx
import React from "react";
import TextButton from "./TextButton";

interface LoginScreenButtonProps {
  onClick: () => void;
}

const LoginScreenButton: React.FC<LoginScreenButtonProps> = ({ onClick }) => (
  <TextButton onClick={onClick}>Already have an account? Log in</TextButton>
);

export default LoginScreenButton;
