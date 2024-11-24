import React from "react";
import { useNavigate } from "react-router-dom";
import { Assignment } from "../../services/assignmentsService";

interface AssignmentsCardProps {
  assignment: Assignment;
}

const AssignmentsCard: React.FC<AssignmentsCardProps> = ({ assignment }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/assignment/${assignment.assignment_id}`);
  };

  const formattedAssignedAt = new Date(assignment.assigned_at).toLocaleString();
  const formattedDueFor = new Date(assignment.due_for).toLocaleString();

  return (
    <div
      className="p-4 border rounded-lg shadow-sm bg-white hover:bg-gray-50 cursor-pointer"
      onClick={handleCardClick}
    >
      <h4 className="text-lg font-semibold text-gray-800 mb-2">
        {assignment.title}
      </h4>
      <p className="text-sm text-gray-600 mb-2">
        <strong>Assigned:</strong> {formattedAssignedAt}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Due:</strong> {formattedDueFor}
      </p>
    </div>
  );
};

export default AssignmentsCard;
