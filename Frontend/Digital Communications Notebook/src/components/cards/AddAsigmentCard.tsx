import React from "react";

interface AssignmentItemProps {
  assignment: {
    title: string;
    startTime: string;
    endTime: string;
  };
}

const AddAssigmentCard: React.FC<AssignmentItemProps> = ({ assignment }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors">
      <h4 className="text-lg font-semibold text-gray-800 mb-2">{assignment.title}</h4>
      <p className="text-sm text-gray-600">
        <strong>Inicio:</strong> {assignment.startTime}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Fin:</strong> {assignment.endTime}
      </p>
    </div>
  );
};

export default AddAssigmentCard;
