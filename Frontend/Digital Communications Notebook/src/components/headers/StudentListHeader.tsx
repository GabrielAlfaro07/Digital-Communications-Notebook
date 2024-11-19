import React from "react";

const StudentListHeader: React.FC = () => {
  return (
    <header className="flex justify-between items-center w-full px-6 py-2 bg-gray-100 border-b border-gray-300">
      <span className="font-semibold text-gray-600 w-1/2">Name</span>
      <span className="font-semibold text-gray-600 w-1/2">Email</span>
    </header>
  );
};

export default StudentListHeader;
