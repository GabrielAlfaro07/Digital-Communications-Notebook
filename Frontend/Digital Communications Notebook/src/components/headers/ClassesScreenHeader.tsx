import React from "react";
import Header from "./Header";
import AddClassButton from "../buttons/AddClassButton";
import ProfileButton from "../buttons/ProfileButton";
import SidebarButton from "../buttons/SidebarButton";

interface ClassesScreenHeaderProps {
  profileName: string;
  profileEmail: string;
}

const ClassesScreenHeader: React.FC<ClassesScreenHeaderProps> = ({
  profileName,
  profileEmail,
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
        <AddClassButton onClick={() => console.log("Add class clicked")} />
        <ProfileButton name={profileName} email={profileEmail} />
      </div>
    </Header>
  );
};

export default ClassesScreenHeader;
