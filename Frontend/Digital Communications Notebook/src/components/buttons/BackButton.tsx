// src/components/BackButton.tsx
import React from "react";
import Button from "./Button";

interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => (
  <Button onClick={onClick} hoverText="Back">
    Back
  </Button>
);

export default BackButton;
