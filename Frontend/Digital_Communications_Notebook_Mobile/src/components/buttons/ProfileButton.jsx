import React, { useState } from "react";
import { Pressable, View } from "react-native";
import Profile from "../profile/Profile";
import Icon from "react-native-vector-icons/FontAwesome"; // Import an icon set, e.g., FontAwesome

const ProfileButton = ({
  name,
  email,
  profilePicture,
  userRole,
  userGrade,
}) => {
  const [isProfileOpen, setProfileOpen] = useState(false);

  const handleProfileToggle = () => {
    setProfileOpen(!isProfileOpen);
  };

  return (
    <View className="relative">
      {/* Profile Button */}
      <Pressable
        onPress={handleProfileToggle}
        className="bg-blue-600 hover:bg-blue-500 py-3 px-3 rounded-full transition duration-300"
      >
        {/* Use an icon instead of emoji */}
        <Icon name="user-circle" size={24} color="white" />
      </Pressable>

      {/* Profile Display */}
      {isProfileOpen && (
        <View className="absolute right-0 mt-16">
          <Profile
            name={name}
            email={email}
            profilePicture={profilePicture}
            userRole={userRole}
            userGrade={userGrade}
          />
        </View>
      )}
    </View>
  );
};

export default ProfileButton;
