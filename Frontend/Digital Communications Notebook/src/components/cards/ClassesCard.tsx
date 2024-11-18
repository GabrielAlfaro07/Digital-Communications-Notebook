import React from "react";
import Title from "../titles/Title";
import Label from "../labels/Label";
import backgroundColors from "../../utils/colors";

interface ClassesCardProps {
  onClick: () => void;
  className: string;
  gradeName: string;
  day: string;
  startTime: string;
  endTime: string;
  teacherName: string;
}

const ClassesCard: React.FC<ClassesCardProps> = ({
  onClick,
  className,
  gradeName,
  day,
  startTime,
  endTime,
  teacherName,
}) => {
  const randomColorClass =
    backgroundColors[Math.floor(Math.random() * backgroundColors.length)];

  return (
    <div
      onClick={onClick}
      className={`flex flex-col rounded-2xl ${randomColorClass} p-4 shadow-md cursor-pointer w-full max-w-md hover:opacity-90 transition-opacity relative`}
      style={{
        backgroundImage: 'url("src/assets/class_logo.png")', // Path to your background image (ensure it's in the public folder)
        backgroundSize: "contain", // Resize the background image while maintaining aspect ratio
        backgroundPosition: "right center", // Position it to the right and center it vertically
        backgroundRepeat: "no-repeat", // Prevent repeating the background image
        backgroundAttachment: "scroll", // Make it scroll with the card (removes the fixed effect)
      }}
    >
      {/* Optional overlay */}
      <div className="absolute inset-0 bg-black opacity-10 rounded-2xl"></div>

      <div className="flex justify-between items-center mb-2 relative z-10">
        <Title>
          <span className="text-white">{className}</span>
        </Title>
        <Label>
          <span className="text-white">{gradeName}</span>
        </Label>
      </div>

      {/* Second Row: Schedule */}
      <div className="mb-2 relative z-10">
        <Label>
          <span className="text-white">
            {day}, {startTime} - {endTime}
          </span>
        </Label>
      </div>

      {/* Third Row: Teacher Name */}
      <div className="relative z-10">
        <Label>
          <span className="text-white">Teacher: {teacherName}</span>
        </Label>
      </div>
    </div>
  );
};

export default ClassesCard;
