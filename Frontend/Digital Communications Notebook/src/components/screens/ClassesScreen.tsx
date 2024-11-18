import React, { useEffect, useState } from "react";
import Title from "../titles/Title";
import ClassesCard from "../cards/ClassesCard";
import { useNavigate } from "react-router-dom";
import { fetchUserClasses, ClassDetails } from "../../services/classesService";

const ClassesScreen: React.FC = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState<ClassDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const userClasses = await fetchUserClasses();
        setClasses(userClasses);
      } catch (err: any) {
        setError(err.message || "Failed to load classes.");
      } finally {
        setLoading(false);
      }
    };

    loadClasses();
  }, []);

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="flex-grow flex flex-col items-center px-6 w-full max-w-6xl mx-auto mt-8">
      {/* Title */}
      <div className="mb-6 text-center">
        <Title>My Classes</Title>
      </div>

      {/* Horizontal line below title */}
      <hr className="border-t-2 border-gray-300 mb-6" />

      {/* Loading, Error, or No Classes */}
      {loading && (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500 text-lg animate-pulse">
            Loading your classes...
          </p>
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center h-40">
          <p className="text-red-500 text-lg font-semibold">{error}</p>
        </div>
      )}
      {!loading && !error && classes.length === 0 && (
        <div className="flex flex-col items-center mt-8">
          <p className="text-gray-500 text-lg">You have no classes assigned.</p>
          <button
            onClick={handleRegister}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Register for Classes
          </button>
        </div>
      )}

      {/* Classes Grid */}
      {!loading && !error && classes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {classes.map((classData) => (
            <ClassesCard
              key={classData.class_id}
              classId={classData.class_id}
              className={classData.name}
              gradeName={classData.Grades.name}
              day={classData.day}
              startTime={classData.start_time}
              endTime={classData.end_time}
              teacherName={classData.teacher_username}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassesScreen;
