import React from "react";
import Title from "../titles/Title";
import Label from "../labels/Label";
import LogoutButton from "../buttons/LogoutButton"; // Assuming the LogoutButton is in the "buttons" folder
import { useNavigate } from "react-router-dom"; // To navigate after sign-out
import { signOut } from "../../services/authService"; // Assuming you are importing the signOut function from usersService

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
  const navigate = useNavigate(); // Initialize navigation hook

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await signOut(); // Call the signOut function from your service
      console.log("Logged out successfully");

      // After logging out, navigate to the login/register page
      navigate("/login-register"); // You can replace "/login" with the appropriate route for login/register
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="flex flex-col text-center text-black items-center gap-1 bg-white shadow-md rounded-2xl px-4 pt-4 w-64 z-50">
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

      {/* Add LogoutButton component */}
      <LogoutButton onLogout={handleLogout} />
    </div>
  );
};

export default Profile;
