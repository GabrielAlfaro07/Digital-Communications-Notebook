import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "../titles/Title";
import {
  fetchStudentsWithSameGrade,
  addStudentsToClass,
} from "../../services/studentsService";
import AddNewStudentButton from "../buttons/AddNewStudentButton"; // Assuming this button exists
import BackButton from "../buttons/BackButton";
import { toast } from "react-toastify";
import StudentListHeader from "../headers/StudentListHeader";

interface Student {
  user_id: string; // Match the database field
  username: string; // Match the database field
  email: string;
}

const AddStudentScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const classId = searchParams.get("classId");

  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(
    new Set()
  ); // Change type to match user_id
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEligibleStudents = async () => {
      try {
        if (!classId) {
          setError("Class ID is missing.");
          return;
        }

        const fetchedStudents = await fetchStudentsWithSameGrade(classId);
        console.log("Fetched students:", fetchedStudents); // Debugging log
        if (fetchedStudents.length === 0) {
          setError("No eligible students found for this class.");
        } else {
          setStudents(fetchedStudents);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load students.");
      } finally {
        setLoading(false);
      }
    };

    fetchEligibleStudents();
  }, [classId]);

  const handleCheckboxChange = (studentId: string) => {
    setSelectedStudents((prevSelected) => {
      const updated = new Set(prevSelected);
      if (updated.has(studentId)) {
        updated.delete(studentId);
      } else {
        updated.add(studentId);
      }
      return updated;
    });
  };

  const handleSubmit = async () => {
    const selectedStudentIds = Array.from(selectedStudents);

    if (!classId) {
      alert("Class ID is missing.");
      return;
    }

    if (selectedStudentIds.length === 0) {
      alert("Please select at least one student to add.");
      return;
    }

    try {
      // Call the service to add selected students to the class
      await addStudentsToClass(classId, selectedStudentIds);
      toast.success("Students successfully added to the class.");
      navigate(-1); // Navigate back to the previous screen
    } catch (error) {
      console.error("Error adding students to the class:", error);
      toast.error("Failed to add students to the class. Please try again.");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex-grow flex flex-col items-center px-6 w-full max-w-6xl mx-auto mt-8">
      <div className="mb-6 text-center">
        <Title>Add Students to Class</Title>
      </div>

      {error && (
        <div
          className={`mb-4 text-center ${
            error === "No eligible students found for this class."
              ? "text-gray-500"
              : "text-red-500 font-semibold"
          }`}
        >
          {error}
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500 text-lg animate-pulse">
            Loading students...
          </p>
        </div>
      )}

      {/* Student List with Header */}
      {!loading && !error && students.length > 0 && (
        <div className="w-full bg-white rounded-lg shadow-lg">
          <StudentListHeader />
          <ul className="divide-y divide-gray-200">
            {students.map((student) => (
              <li
                key={student.user_id}
                className="py-4 flex justify-between items-center px-6"
              >
                <span className="text-gray-700 w-1/2">{student.username}</span>
                <span className="text-gray-500 text-sm w-1/2">
                  {student.email}
                </span>
                <input
                  type="checkbox"
                  checked={selectedStudents.has(student.user_id)}
                  onChange={() => handleCheckboxChange(student.user_id)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      {!loading && !error && students.length === 0 && (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500 text-lg">
            No eligible students found for this class.
          </p>
        </div>
      )}

      <div className="mt-6 flex w-80 justify-between items-center gap-2">
        <BackButton onClick={handleBack} />
        <AddNewStudentButton onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default AddStudentScreen;
