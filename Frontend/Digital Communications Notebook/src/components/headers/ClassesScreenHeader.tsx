import React from "react";
import Header from "./Header";
import AddClassButton from "../buttons/AddClassButton";
import ProfileButton from "../buttons/ProfileButton";
import SidebarButton from "../buttons/SidebarButton";

interface ClassesScreenHeaderProps {
  profileName?: string;
  profileEmail?: string;
  profilePicture?: string;
  userRole?: string;
  userGrade?: string;
  isLoading?: boolean;
  errorMessage?: string;
}

const ClassesScreenHeader: React.FC<ClassesScreenHeaderProps> = ({
  profileName = "Loading...",
  profileEmail = "Loading...",
  profilePicture = "",
  userRole = "",
  userGrade = "",
  isLoading = false,
  errorMessage = "",
}) => {
  return (
    <Header>
      <div className="flex items-center">
        <SidebarButton />
      </div>
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold">
        Classes
      </h1>
      <div className="flex items-center space-x-2">
        <AddClassButton />
        {isLoading ? (
          <div className="text-sm text-gray-500">Loading profile...</div>
        ) : errorMessage ? (
          <div className="text-sm text-red-500">{errorMessage}</div>
        ) : (
          <ProfileButton
            name={profileName}
            email={profileEmail}
            profilePicture={profilePicture}
            userRole={userRole}
            userGrade={userGrade}
          />
        )}
      </div>
    </Header>
  );
};

export default ClassesScreenHeader;
