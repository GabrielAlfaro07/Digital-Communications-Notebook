import React from "react";

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <header className="bg-gray-800 text-white h-16 flex items-center justify-between px-4 relative">
      {children}
    </header>
  );
};

export default Header;
