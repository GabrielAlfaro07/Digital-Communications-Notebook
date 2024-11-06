import React from "react";
import Title from "../titles/Title";
import Label from "../labels/Label";
import backgroundColors from "../../utils/colors";

interface ClassesCardProps {
  onClick: () => void;
  name: string;
  schedule: string;
}

const ClassesCard: React.FC<ClassesCardProps> = ({
  onClick,
  name,
  schedule,
}) => {
  const randomColorClass =
    backgroundColors[Math.floor(Math.random() * backgroundColors.length)];

  return (
    <div
      onClick={onClick}
      className={`flex items-start justify-between rounded-2xl ${randomColorClass} p-4 shadow-md cursor-pointer w-full max-w-md hover:opacity-90 transition-opacity`}
    >
      <div className="flex flex-col justify-between w-2/3">
        <Title>
          <span className="text-white">{name}</span>
        </Title>
        <Label>
          <span className="text-white">{schedule}</span>
        </Label>
      </div>
      <div className="w-1/3 flex items-center justify-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1760/1760647.png"
          alt="Class Icon"
          className="h-20 w-20 object-contain"
        />
      </div>
    </div>
  );
};

export default ClassesCard;
