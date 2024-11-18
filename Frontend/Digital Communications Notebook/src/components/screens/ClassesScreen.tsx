import React, { useEffect, useState } from "react";
import ClassesScreenHeader from "../headers/ClassesScreenHeader";
import Title from "../titles/Title";
import Label from "../labels/Label";
import ClassesCard from "../cards/ClassesCard";
import { useNavigate } from "react-router-dom";
import { fetchUserData, UserProfile } from "../../services/usersService";
import { fetchUserClasses, Class } from "../../services/classesService";

const ClassesScreen: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [userData, userClasses] = await Promise.all([
          fetchUserData(),
          fetchUserClasses(),
        ]);
        setUser(userData);
        setClasses(userClasses);
      } catch (err: any) {
        setError(err.message || "Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <ClassesScreenHeader
        profileName={user?.username || ""}
        profileEmail={user?.email || ""}
        profilePicture={user?.profilePicture || ""}
        userRole={user?.role || ""}
        userGrade={user?.grade || ""}
        isLoading={loading}
        errorMessage={error || ""}
      />

      <div className="flex flex-col items-center h-screen px-6 w-full max-w-6xl mx-auto">
        {/* Title and user label */}
        <div className="mb-2">
          <Title>My Classes</Title>
        </div>
        {user && <Label>{user.username}</Label>}

        {/* Display error or loading message */}
        {error && <p className="text-red-500">{error}</p>}
        {loading && <p className="text-gray-500">Loading...</p>}

        {/* Display no classes message */}
        {!loading && !error && classes.length === 0 && (
          <p className="text-gray-500 mt-4">You have no classes assigned.</p>
        )}

        {/* Responsive grid for classes cards */}
        {!loading && !error && classes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 w-full max-w-6xl">
            {classes.map((classData) => (
              <ClassesCard
                key={classData.class_id}
                onClick={handleRegister}
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
