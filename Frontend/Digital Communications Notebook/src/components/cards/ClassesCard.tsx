import React from "react";
import Title from "../titles/Title";
import Label from "../labels/Label";
import backgroundColors from "../../utils/colors";
import { useNavigate } from "react-router-dom";

interface ClassesCardProps {
  classId: string;
  className: string;
  gradeName: string;
  day: string;
  startTime: string;
  endTime: string;
  teacherName: string;
}

const ClassesCard: React.FC<ClassesCardProps> = ({
  classId,
  className,
  gradeName,
  day,
  startTime,
  endTime,
  teacherName,
}) => {
  const navigate = useNavigate();

  // Generate persistent color based on `classId`
  const colorIndex = parseInt(classId.slice(-1), 16) % backgroundColors.length;
  const colorClass = backgroundColors[colorIndex];

  const handleCardClick = () => {
    navigate(`/class/${classId}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`flex flex-col rounded-2xl ${colorClass} p-4 shadow-md cursor-pointer w-full max-w-md hover:opacity-90 transition-opacity relative`}
      style={{
        backgroundImage: 'url("src/assets/class_logo.png")',
        backgroundSize: "contain",
        backgroundPosition: "right center",
        backgroundRepeat: "no-repeat",
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
