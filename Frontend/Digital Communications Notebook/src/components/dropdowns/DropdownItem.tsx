// src/components/DropdownItem.tsx
import React from "react";

interface DropdownItemProps {
  value: string;
  children: React.ReactNode;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ value, children }) => (
  <option value={value}>{children}</option>
);

export default DropdownItem;
