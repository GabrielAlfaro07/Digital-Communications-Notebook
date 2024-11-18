import React from "react";
import { useNavigate } from "react-router-dom";
import AddButton from "./AddButton";

const AddClassButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/addClass");
  };

  return <AddButton onClick={handleClick} hoverText="Add a new class" />;
};

export default AddClassButton;
