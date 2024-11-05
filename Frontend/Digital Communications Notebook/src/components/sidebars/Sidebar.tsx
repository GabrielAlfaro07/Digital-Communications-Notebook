import React from "react";
import SidebarLink from "./SidebarLink";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-16 left-0 w-64 bg-blue-700 border-r border-gray-600 h-full z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <nav className="flex flex-col p-4">
        <SidebarLink to="/" onClick={onClose}>
          Example
        </SidebarLink>
      </nav>
    </div>
  );
};

export default Sidebar;
