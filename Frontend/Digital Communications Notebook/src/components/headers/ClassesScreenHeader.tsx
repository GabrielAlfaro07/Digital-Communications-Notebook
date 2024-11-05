import React from "react";
import Header from "./Header";
import AddClassButton from "../buttons/AddClassButton"; // Ensure you create or have this button component
import ProfileButton from "../buttons/ProfileButton"; // Ensure you create or have this button component
import SidebarButton from "../buttons/SidebarButton"; // Ensure you create or have this button component

const ClassesScreenHeader: React.FC = () => {
  return (
    <Header>
      <div className="flex items-center">
        <SidebarButton />
      </div>
      <h1 className="text-lg font-bold">Classes</h1>
      <div className="flex items-center">
        <AddClassButton onClick={() => console.log("Add class clicked")} />
        <ProfileButton name="John Doe" email="johndoe@example.com" />
      </div>
    </Header>
  );
};

export default ClassesScreenHeader;
