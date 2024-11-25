import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddAssignmentButton from "../buttons/AddAssigmentButton";
import StudentListButton from "../buttons/StudentListButton";
import AssignmentsCard from "../cards/AsigmentsCard";
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
    <div className="relative h-screen flex flex-col items-center w-full bg-gray-100">
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 h-1/3 w-full bg-cover bg-center opacity-50 z-0"
        style={{
          backgroundImage:
            "url('https://images.squarespace-cdn.com/content/v1/5a00e57baeb625aaac139aad/1521840474358-8OGA2S5F1SMRLZHEUCWD/classroom-2787754_1920.jpg')",
        }}
      />

      {/* Foreground Content */}
      <div className="relative z-10 flex-grow flex flex-col items-center px-6 w-full max-w-6xl mx-auto mt-8">
        {/* Title Section */}
        <div className="mb-6 text-center">
          <Title>{classDetails.name}</Title>
        </div>

        {/* Class Details Section */}
        <div className="w-full mb-8">
          {/* Class Information */}
          <div className="flex flex-col items-center mb-4">
            <div className="mb-2">
              <Label>
                <span className="text-gray-800">
                  Grade: {classDetails.Grades.name}
                </span>
              </Label>
            </div>
            <div className="mb-2">
              <Label>
                <span className="text-gray-800">
                  Schedule: {classDetails.day}, {classDetails.start_time} -{" "}
                  {classDetails.end_time}
                </span>
              </Label>
            </div>
            <div className="mb-2">
              <Label>
                <span className="text-gray-800">
                  Teacher: {classDetails.teacher_username}
                </span>
              </Label>
            </div>
          </div>
        </div>

        {/* Assignments Section */}
        <div className="w-full">
          {/* Active Assignments Title and Add Button */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-gray-800">
              Assignments
            </h3>
            <AddAssignmentButton
              onClick={() => navigate(`/addAssignment?classId=${classId}`)}
            />
          </div>
          <hr className="border-t-1 border-gray-600 mb-8" />

          {/* Active Assignments */}
          <h4 className="text-xl font-semibold text-green-600 mb-3">Active</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-4">
            {assignments.length > 0 ? (
              assignments.map((assignment, index) => (
                <AssignmentsCard key={index} assignment={assignment} />
              ))
            ) : (
              <p className="text-gray-500">No active assignments</p>
            )}
          </div>

          {/* Expired Assignments */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-red-600 mb-3">Expired</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {expiredAssignments.length > 0 ? (
                expiredAssignments.map((assignment, index) => (
                  <AssignmentsCard key={index} assignment={assignment} />
                ))
              ) : (
                <p className="text-gray-500">No expired assignments</p>
              )}
            </div>
          </div>
        </div>

        {/* Class Options Section */}
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="w-40">
              <StudentListButton
                onClick={() => navigate(`/students?classId=${classId}`)}
              />
            </div>
            <div className="w-20">
              <BackButton onClick={() => navigate("/classes")} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetailsScreen;
