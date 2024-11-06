import React from "react";
import ClassesScreenHeader from "../headers/ClassesScreenHeader";
import Title from "../titles/Title";
import Label from "../labels/Label";
import ClassesCard from "../cards/ClassesCard";
import { useNavigate } from "react-router-dom";

const ClassesScreen: React.FC = () => {
  const navigate = useNavigate();
  const teacher = "John Doe";

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <ClassesScreenHeader
        profileName={teacher}
        profileEmail="johndoe@example.com"
      />

      <div className="flex flex-col items-center h-screen px-6 w-full max-w-6xl mx-auto">
        {/* Title and teacher label */}
        <div className="mb-2">
          <Title>My Classes</Title>
        </div>
        <Label>{teacher}</Label>

        {/* Responsive grid for classes cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 w-full max-w-6xl">
          <ClassesCard
            onClick={handleRegister}
            name="Class 1"
            schedule={teacher}
          />
          <ClassesCard
            onClick={handleRegister}
            name="Class 2"
            schedule={teacher}
          />
          <ClassesCard
            onClick={handleRegister}
            name="Class 3"
            schedule={teacher}
          />
          <ClassesCard
            onClick={handleRegister}
            name="Class 4"
            schedule={teacher}
          />
          {/* Add more <ClassesCard /> components as needed */}
        </div>
      </div>
    </div>
  );
};

export default ClassesScreen;
