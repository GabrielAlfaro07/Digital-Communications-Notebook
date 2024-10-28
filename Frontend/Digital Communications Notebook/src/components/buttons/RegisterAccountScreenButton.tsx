// src/components/CreateNewAccountScreenButton.tsx
import React from "react";
import TextButton from "./TextButton";

interface RegisterAccountScreenButtonProps {
  onClick: () => void;
}

const RegisterAccountScreenButton: React.FC<
  RegisterAccountScreenButtonProps
> = ({ onClick }) => (
  <TextButton onClick={onClick}>Not registered? Sign up</TextButton>
);

export default RegisterAccountScreenButton;
