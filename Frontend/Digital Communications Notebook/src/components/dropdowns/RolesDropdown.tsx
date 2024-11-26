import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";

interface Role {
  role_id: string;
  name: string;
}

interface RolesDropdownProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const RolesDropdown: React.FC<RolesDropdownProps> = ({ value, onChange }) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/roles");
        if (!response.ok) {
          throw new Error("Failed to fetch roles");
        }
        const data: Role[] = await response.json();
        setRoles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  if (loading) return <div>Loading roles...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Dropdown value={value} onChange={onChange}>
      <DropdownItem value="">Select a role</DropdownItem>
      {roles.map((role) => (
        <DropdownItem key={role.role_id} value={role.role_id}>
          {role.name}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

export default RolesDropdown;
