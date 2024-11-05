import React from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`text-white text-lg mb-4 px-4 py-2 rounded-full transition duration-300 ease-in-out ${
        isActive ? "bg-blue-500 hover:bg-blue-400" : "hover:bg-blue-600"
      }`}
    >
      {children}
    </Link>
  );
};

export default SidebarLink;
