import React from "react";
import Button from "./Button";

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  return <Button onClick={onLogout}>Log Out</Button>;
};

export default LogoutButton;
