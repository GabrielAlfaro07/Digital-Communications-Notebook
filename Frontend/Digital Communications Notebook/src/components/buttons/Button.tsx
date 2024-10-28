// src/components/Button.tsx
import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => (
  <button
    className="bg-blue-500 text-white px-4 py-2 rounded-xl mb-4 w-80"
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
