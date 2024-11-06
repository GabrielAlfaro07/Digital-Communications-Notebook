import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Profile from "../profile/Profile";

interface ProfileButtonProps {
  name: string;
  email: string;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ name, email }) => {
  const [isProfileOpen, setProfileOpen] = useState(false);

  const handleProfileToggle = () => {
    setProfileOpen(!isProfileOpen);
  };

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={handleProfileToggle}
        className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-4 rounded-full transition duration-300 ease-in-out"
      >
        <FontAwesomeIcon icon={faUser} size="lg" />
      </button>

      {/* Profile Display */}
      {isProfileOpen && (
        <div className="absolute right-0 mt-4">
          <Profile name={name} email={email} />
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
