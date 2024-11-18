import React, { useEffect, useState } from "react";
import ClassesScreenHeader from "../headers/ClassesScreenHeader";
import Title from "../titles/Title";
import Label from "../labels/Label";
import ClassesCard from "../cards/ClassesCard";
import { useNavigate } from "react-router-dom";
import { fetchUserData, UserProfile } from "../../services/usersService";

const ClassesScreen: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null); // Use UserProfile interface

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await fetchUserData(); // Fetch user data from the service
      if (userData) {
        console.log("Loaded user data:", userData);
        setUser(userData);
      } else {
        console.error("Failed to load user data.");
      }
    };

    loadUserData();
  }, []);

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {user && (
        <ClassesScreenHeader
          profileName={user.username}
          profileEmail={user.email}
          profilePicture={user.profilePicture || ""}
          userRole={user.role || ""}
          userGrade={user.grade || ""}
        />
      )}

      <div className="flex flex-col items-center h-screen px-6 w-full max-w-6xl mx-auto">
        {/* Title and teacher label */}
        <div className="mb-2">
          <Title>My Classes</Title>
        </div>
        {user && <Label>{user.username}</Label>}

        {/* Responsive grid for classes cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 w-full max-w-6xl">
          <ClassesCard
            onClick={handleRegister}
            name="Class 1"
            schedule={user?.username || ""}
          />
          {/* Add more <ClassesCard /> components as needed */}
        </div>
      </div>
    </div>
  );
};

export default ClassesScreen;
