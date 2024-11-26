// src/components/Button.tsx
import React from "react";

interface ButtonProps {
  onClick: () => void;
  hoverText: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, hoverText }) => (
  <button
    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl mb-4 w-full transition duration-300 ease-in-out"
    onClick={onClick}
    title={hoverText}
  >
    {children}
  </button>
);

export default Button;
