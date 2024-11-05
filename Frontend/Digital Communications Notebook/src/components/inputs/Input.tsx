// src/components/Input.tsx
import React from "react";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
}) => (
  <input
    type={type}
    className="py-2 px-4 mb-4 border rounded-xl w-full"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

export default Input;
