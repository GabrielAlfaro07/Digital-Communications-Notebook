import React from "react";
import { useNavigate } from "react-router-dom";
import AddButton from "./AddButton";

const AddStudentButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/students");
  };

  return (
    <AddButton
      className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 hover:text-black"
      onClick={handleClick}
      hoverText="Ver Lista Estudiantes"
    />
  );
};

export default AddStudentButton;
