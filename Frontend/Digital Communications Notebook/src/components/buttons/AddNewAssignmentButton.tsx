import React from "react";
import Button from "./Button";

interface AddNewAssignmentButtonProps {
  onClick: () => void;
}

const AddNewAssignmentButton: React.FC<AddNewAssignmentButtonProps> = ({
  onClick,
}) => (
  <Button onClick={onClick} hoverText="Add New Assignment">
    Add Assignment
  </Button>
);

export default AddNewAssignmentButton;
