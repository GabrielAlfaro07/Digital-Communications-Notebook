import React from "react";
import Header from "./Header";
import SidebarButton from "../buttons/SidebarButton";
import ProfileButton from "../buttons/ProfileButton";

interface UniversalHeaderProps {
  title: string; // Title displayed in the center
  profileName?: string;
  profileEmail?: string;
  profilePicture?: string;
  userRole?: string;
  userGrade?: string;
  isLoading?: boolean;
  errorMessage?: string | null;
}

const UniversalHeader: React.FC<UniversalHeaderProps> = ({
  title,
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
      {/* Left Side: Sidebar Button */}
      <div className="flex items-center">
        <SidebarButton />
      </div>

      {/* Center: Title */}
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold">
        {title}
      </h1>

      {/* Right Side: Profile Button */}
      <div className="flex items-center space-x-2">
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

export default UniversalHeader;
