import React from "react";
import Header from "./Header";
import AddClassButton from "../buttons/AddClassButton";
import ProfileButton from "../buttons/ProfileButton";
import SidebarButton from "../buttons/SidebarButton";

interface ClassesScreenHeaderProps {
  profileName: string;
  profileEmail: string;
  profilePicture: string;
  userRole: string;
  userGrade: string;
}

const ClassesScreenHeader: React.FC<ClassesScreenHeaderProps> = ({
  profileName,
  profileEmail,
  profilePicture,
  userRole,
  userGrade,
}) => {
  return (
    <Header>
      <div className="flex items-center">
        <SidebarButton />
      </div>
      <div className="flex items-center space-x-2">
        <AddClassButton />
        <ProfileButton
          name={profileName}
          email={profileEmail}
          profilePicture={profilePicture}
          userRole={userRole}
          userGrade={userGrade}
        />
      </div>
    </Header>
  );
};

export default ClassesScreenHeader;
