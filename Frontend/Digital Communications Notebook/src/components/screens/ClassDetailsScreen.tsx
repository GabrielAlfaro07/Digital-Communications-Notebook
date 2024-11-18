import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddAssignmentButton from "../buttons/AddAssigmentButton";
import AddStudentButton from "../buttons/addStudentButton";
import StudentListButton from "../buttons/StudentListButton";
import AssignmentCard from "../cards/AddAsigmentCard";
import { fetchClassDetails, ClassDetails } from "../../services/classesService";
import { Assignment } from "../../services/assignmentsService";
import Title from "../titles/Title"; // Assuming Title is used for the header
import Label from "../labels/Label"; // Assuming Label is used for class details
import BackButton from "../buttons/BackButton";
import { useNavigate } from "react-router-dom";

const ClassDetailsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { classId } = useParams<{ classId: string }>();
  const [classDetails, setClassDetails] = useState<ClassDetails | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [expiredAssignments, setExpiredAssignments] = useState<Assignment[]>(
    []
  );

  useEffect(() => {
    // Fetch class details and assignments
    const loadClassDetails = async () => {
      try {
        if (!classId) {
          console.error("Class ID is missing.");
          return;
        }
        const details = await fetchClassDetails(classId);
        setClassDetails(details);
        setAssignments(details.activeAssignments || []);
        setExpiredAssignments(details.expiredAssignments || []);
      } catch (error) {
        console.error("Failed to fetch class details:", error);
      }
    };

    loadClassDetails();
  }, [classId]);

  if (!classDetails) return <p>Loading class details...</p>;

  return (
    <div className="flex-grow flex flex-col items-center px-6 w-full max-w-6xl mx-auto mt-8">
      {/* Title Section */}
      <div className="mb-6 text-center">
        <Title>{classDetails.name}</Title>
      </div>

      {/* Class Details Section */}
      <div className="w-full mb-6">
        {/* Class Information */}
        <div className="flex flex-col items-center mb-4">
          <div className="mb-2">
            <Label>
              <span className="text-gray-700">
                Grade: {classDetails.Grades.name}
              </span>
            </Label>
          </div>
          <div className="mb-2">
            <Label>
              <span className="text-gray-700">
                Schedule: {classDetails.day}, {classDetails.start_time} -{" "}
                {classDetails.end_time}
              </span>
            </Label>
          </div>
          <div className="mb-2">
            <Label>
              <span className="text-gray-700">
                Teacher: {classDetails.teacher_username}
              </span>
            </Label>
          </div>
        </div>
      </div>

      {/* Assignments Section */}
      <div className="w-full">
        {/* Active Assignments Title */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">
            Assignments
          </h3>
          <hr className="border-t-1 border-gray-300 mb-6" />
          {/* Section Line */}
          <div className="flex justify-end mb-4">
            <AddAssignmentButton />
          </div>
          {/* Active Assignments */}
          <h4 className="text-xl font-semibold text-green-600 mb-3">Active</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {assignments.length > 0 ? (
              assignments.map((assignment, index) => (
                <AssignmentCard key={index} assignment={assignment} />
              ))
            ) : (
              <p className="text-gray-500">No active assignments</p>
            )}
          </div>
        </div>

        {/* Expired Assignments */}
        <div className="mb-6">
          <h4 className="text-xl font-semibold text-red-600 mb-3">Expired</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {expiredAssignments.length > 0 ? (
              expiredAssignments.map((assignment, index) => (
                <AssignmentCard key={index} assignment={assignment} />
              ))
            ) : (
              <p className="text-gray-500">No expired assignments</p>
            )}
          </div>
        </div>
      </div>

      {/* Class Options Section */}
      <div className="w-full mt-8">
        <div className="flex justify-between items-center">
          <AddStudentButton />
          <StudentListButton />
          <div className="w-20">
            <BackButton onClick={() => navigate("/classes")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetailsScreen;
