import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../titles/Title";
import Label from "../labels/Label";
import Input from "../inputs/Input";
import GradesDropdown from "../dropdowns/GradesDropdown"; // Import GradesDropdown
import AddNewClassButton from "../buttons/AddNewClassButton";
import { addClass, CreateClassPayload } from "../../services/classesService";
import { toast } from "react-toastify";
import BackButton from "../buttons/BackButton";

const AddClassScreen: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreateClassPayload>({
    name: "",
    grade_id: "",
    day: "",
    start_time: "",
    end_time: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({ ...prevData, grade_id: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      await addClass(formData); // Call the addClass function
      toast.success("Class added succesfully.");
      navigate("/classes"); // Navigate to classes page after success
    } catch (err: any) {
      toast.error("Failed to add class.");
      setError(err.message || "Failed to add class.");
    }
  };

  const handleBack = () => {
    navigate("/classes");
  };
  return (
    <div className="flex-grow flex flex-col items-center px-6 w-full max-w-6xl mx-auto mt-8">
      {/* Title */}
      <div className="mb-6 text-center">
        <Title>Add New Class</Title>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 mb-4 font-semibold text-center">
          {error}
        </div>
      )}

      {/* Input Form */}
      <div className="w-full max-w-lg space-y-4">
        {/* Class Name */}
        <div>
          <Label>Class Name</Label>
          <Input
            type="text"
            name="name" // Add the name prop here
            placeholder="Enter class name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        {/* Grade Dropdown */}
        <div>
          <Label>Grade</Label>
          <GradesDropdown
            value={formData.grade_id}
            onChange={handleGradeChange}
          />
        </div>

        {/* Day */}
        <div>
          <Label>Day</Label>
          <Input
            type="text"
            name="day"
            placeholder="Enter day (e.g., Monday)"
            value={formData.day}
            onChange={handleInputChange}
          />
        </div>

        {/* Start Time */}
        <div>
          <Label>Start Time</Label>
          <Input
            type="time"
            name="start_time"
            placeholder=""
            value={formData.start_time}
            onChange={handleInputChange}
          />
        </div>

        {/* End Time */}
        <div>
          <Label>End Time</Label>
          <Input
            type="time"
            name="end_time"
            placeholder=""
            value={formData.end_time}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex w-80 justify-between items-center gap-2">
        <BackButton onClick={handleBack} />
        <AddNewClassButton onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default AddClassScreen;
