// src/components/UserTypeDropdown.tsx
import React from "react";
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";

interface UserTypeDropdownProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const UserTypeDropdown: React.FC<UserTypeDropdownProps> = ({
  value,
  onChange,
}) => (
  <Dropdown value={value} onChange={onChange}>
    <DropdownItem value="estudiante">Student</DropdownItem>
    <DropdownItem value="encargado">Guardian</DropdownItem>
    <DropdownItem value="docente">Teacher</DropdownItem>
  </Dropdown>
);

export default UserTypeDropdown;
