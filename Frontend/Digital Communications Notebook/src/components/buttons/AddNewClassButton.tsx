import React from "react";
import Button from "./Button";

interface AddNewClassButtonProps {
  onClick: () => void;
}

const AddNewClassButton: React.FC<AddNewClassButtonProps> = ({ onClick }) => (
  <Button onClick={onClick} hoverText="Add New Class">
    Add Class
  </Button>
);

export default AddNewClassButton;
