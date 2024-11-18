import React from "react";
import Title from "../titles/Title";
import Label from "../labels/Label";

interface ProfileProps {
  name: string;
  email: string;
  profilePicture?: string;
  userRole: string;
  userGrade: string;
}

const Profile: React.FC<ProfileProps> = ({
  name,
  email,
  profilePicture,
  userRole,
  userGrade,
}) => {
  return (
    <div className="flex flex-col text-center text-black items-center bg-white shadow-md rounded-2xl p-6 w-64">
      <img
        src={
          profilePicture ||
          "https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png"
        }
        alt="Profile"
        className="h-24 w-24 rounded-full mb-4 object-cover"
      />
      <Title>{name}</Title>
      <Label>{email}</Label>
      <Label>{userRole}</Label>
      <Label>{userGrade}</Label>
    </div>
  );
};

export default Profile;
