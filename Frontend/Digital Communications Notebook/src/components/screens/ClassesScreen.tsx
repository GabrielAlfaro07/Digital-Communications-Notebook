import React, { useEffect, useState } from "react";
import ClassesCard from "../cards/ClassesCard";
import AddClassButton from "../buttons/AddClassButton"; // Import the button
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
    <div className="relative h-screen flex flex-col items-center w-full bg-gray-100">
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 h-1/3 w-full bg-cover bg-center opacity-50 z-0"
        style={{
          backgroundImage:
            "url('https://images.collegexpress.com/blog/3-easy-ways-to-participate-more-in-your-classes.png')",
        }}
      />

      {/* Foreground Content */}
      <div className="relative z-10 flex-grow flex flex-col items-center px-6 w-full max-w-6xl mx-auto mt-40">
        {/* Header Row */}
        <div className="relative flex items-center w-full mb-6">
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h2 className="text-5xl font-bold">My Classes</h2>
          </div>

          <div className="ml-auto">
            <AddClassButton />
          </div>
        </div>

        <hr className="border-t-2 border-gray-300 mb-6" />

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
            <p className="text-gray-500 text-lg">
              You have no classes assigned.
            </p>
            <button
              onClick={handleRegister}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Register for Classes
            </button>
          </div>
        )}
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
    </div>
  );
};

export default ClassesScreen;
