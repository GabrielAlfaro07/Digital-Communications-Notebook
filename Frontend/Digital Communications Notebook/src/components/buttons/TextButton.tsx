// src/components/TextButton.tsx
import React from "react";

interface TextButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const TextButton: React.FC<TextButtonProps> = ({ onClick, children }) => (
  <button className="text-blue-500 underline" onClick={onClick}>
    {children}
  </button>
);

export default TextButton;
