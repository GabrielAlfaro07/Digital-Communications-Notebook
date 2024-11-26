// src/components/Dropdown.tsx
import React from "react";

interface DropdownProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ value, onChange, children }) => (
  <select
    className="py-2 px-3 mb-4 border rounded-xl w-full"
    value={value}
    onChange={onChange}
  >
    {children}
  </select>
);

export default Dropdown;
