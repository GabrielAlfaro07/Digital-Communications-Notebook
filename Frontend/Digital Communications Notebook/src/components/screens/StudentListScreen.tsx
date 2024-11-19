import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchStudentsInClass } from "../../services/studentsService";
import { fetchClassDetails, ClassDetails } from "../../services/classesService";
import AddStudentButton from "../buttons/AddStudentButton";
import Title from "../titles/Title";
import Label from "../labels/Label"; // Assuming Label is used for displaying class details
import BackButton from "../buttons/BackButton";

interface Student {
  user_id: string; // Match the database field
  username: string; // Match the database field
  email: string; // Match the database field
}

const StudentListScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const classId = searchParams.get("classId");
  const [students, setStudents] = useState<Student[]>([]);
  const [classDetails, setClassDetails] = useState<ClassDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStudentsAndClassDetails = async () => {
      try {
        if (!classId) {
          setError("Class ID is missing.");
          return;
        }

        // Fetch class details
        const fetchedClassDetails = await fetchClassDetails(classId);
        setClassDetails(fetchedClassDetails);

        // Fetch students
        const fetchedStudents = await fetchStudentsInClass(classId);
        setStudents(fetchedStudents);
      } catch (error: any) {
        setError(error.message || "Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    loadStudentsAndClassDetails();
  }, [classId]);

  return (
    <div className="flex-grow flex flex-col items-center px-6 w-full max-w-6xl mx-auto mt-8">
      {/* Class Title and Details */}
      {classDetails && (
        <div className="mb-6 text-center">
          <Title>{classDetails.name}</Title>
          <div className="flex flex-col items-center">
            <Label>
              Grade:{" "}
              <span className="text-gray-700">{classDetails.Grades.name}</span>
            </Label>
            <Label>
              Schedule:{" "}
              <span className="text-gray-700">
                {classDetails.day}, {classDetails.start_time} -{" "}
                {classDetails.end_time}
              </span>
            </Label>
            <Label>
              Teacher:{" "}
              <span className="text-gray-700">
                {classDetails.teacher_username}
              </span>
            </Label>
          </div>
        </div>
      )}

      {/* Add Student Button and Divider */}
      <div className="flex justify-between items-center w-full mb-6">
        <h3 className="text-2xl font-semibold text-gray-700">Student List</h3>
        <AddStudentButton
          onClick={() => navigate(`/addStudent?classId=${classId}`)}
        />
      </div>
      <hr className="border-t-1 border-gray-300 mb-6" />

      {/* Loading, Error, or No Students */}
      {loading && (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500 text-lg animate-pulse">
            Loading students...
          </p>
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center h-40">
          <p className="text-red-500 text-lg font-semibold">{error}</p>
        </div>
      )}
      {!loading && !error && students.length === 0 && (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500 text-lg">
            No students found for this class.
          </p>
        </div>
      )}

      {/* Student List */}
      {!loading && !error && students.length > 0 && (
        <div className="w-full">
          <ul className="divide-y divide-gray-200 bg-white p-6 rounded-lg shadow-lg">
            {students.map((student) => (
              <li
                key={student.user_id}
                className="py-4 flex justify-between items-center"
              >
                <div className="flex flex-col">
                  <span className="text-gray-700">{student.username}</span>
                  <span className="text-gray-500 text-sm">{student.email}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Back Button */}
      <div className="mt-8 w-full flex justify-center">
        <div className="w-20">
          <BackButton onClick={() => navigate(-1)} />
        </div>
      </div>
    </div>
  );
};

export default StudentListScreen;
