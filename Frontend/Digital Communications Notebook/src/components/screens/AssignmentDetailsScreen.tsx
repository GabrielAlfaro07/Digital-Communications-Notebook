import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAssignmentById,
  Assignment,
} from "../../services/assignmentsService";
import Title from "../titles/Title"; // Assuming Title is used for headers
import Label from "../labels/Label"; // Assuming Label is used for assignment details
import BackButton from "../buttons/BackButton"; // Back button for navigation

const AssignmentDetailsScreen: React.FC = () => {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const navigate = useNavigate();

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      try {
        setIsLoading(true);
        if (!assignmentId) throw new Error("Assignment ID not provided");
        const fetchedAssignment = await getAssignmentById(assignmentId);
        setAssignment(fetchedAssignment);
      } catch (err: any) {
        setError(err.message || "Failed to fetch assignment details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignmentDetails();
  }, [assignmentId]);

  if (isLoading) {
    return (
      <div className="text-center mt-8">Loading assignment details...</div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center mt-8">Error: {error}</div>;
  }

  if (!assignment) {
    return <div className="text-center mt-8">No assignment found.</div>;
  }

  return (
    <div className="relative h-screen flex flex-col items-center w-full bg-gray-100">
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 h-1/3 w-full bg-cover bg-center opacity-50 z-0"
        style={{
          backgroundImage:
            "url('https://cdn-blog.superprof.com/blog_gb/wp-content/uploads/2021/03/online-homework-help-resources.jpg')",
        }}
      />

      {/* Foreground Content */}
      <div className="relative z-10 flex-grow flex flex-col items-center px-6 w-full max-w-6xl mx-auto mt-8">
        {/* Title Section */}
        <div className="mb-8 text-center">
          <Title>{assignment.title}</Title>
        </div>

        {/* Assignment Details Section */}
        <div className="w-full mb-6">
          <div className="flex flex-col items-center mb-4">
            <div className="mb-2">
              <Label>
                <span className="text-gray-800">
                  Description: {assignment.description}
                </span>
              </Label>
            </div>
            <div className="mb-2">
              <Label>
                <span className="text-gray-800">
                  Assigned At:{" "}
                  {new Date(assignment.assigned_at).toLocaleString()}
                </span>
              </Label>
            </div>
            <div className="mb-2">
              <Label>
                <span className="text-gray-800">
                  Due For: {new Date(assignment.due_for).toLocaleString()}
                </span>
              </Label>
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className="w-full mb-2">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Documents
          </h3>
          <hr className="border-t-1 border-gray-600 mb-6" />
          {assignment.documents && assignment.documents.length > 0 ? (
            <ul className="list-disc pl-6">
              {assignment.documents.map((doc) => (
                <li key={doc.document_id}>
                  <a
                    href={doc.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {doc.file_url}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">
              No documents available for this assignment.
            </p>
          )}
        </div>

        {/* Back Button Section */}
        <div className="w-full mt-6">
          <div className="flex justify-end w-20">
            <BackButton onClick={() => navigate(-1)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetailsScreen;
