import React from "react";
import { Assignment } from "../../services/assignmentsService"; // Import the Assignment interface

interface AssignmentsCardProps {
  assignment: Assignment; // Use the Assignment interface for the assignment prop
}

const AssignmentsCard: React.FC<AssignmentsCardProps> = ({ assignment }) => {
  // Format timestamps if needed (you could use a library like `date-fns` or `moment`)
  const formattedAssignedAt = new Date(assignment.assigned_at).toLocaleString();
  const formattedDueFor = new Date(assignment.due_for).toLocaleString();

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors">
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
