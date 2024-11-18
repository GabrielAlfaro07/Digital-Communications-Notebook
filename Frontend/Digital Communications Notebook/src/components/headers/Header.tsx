import React from "react";

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="flex items-center justify-between w-full px-4 py-2 border-b border-gray-300">
      {children}
    </header>
  );
};

export default Header;
