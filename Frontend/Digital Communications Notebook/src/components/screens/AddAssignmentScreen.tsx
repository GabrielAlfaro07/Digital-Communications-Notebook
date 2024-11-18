import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "../titles/Title";
import Label from "../labels/Label";
import Input from "../inputs/Input";
import Textarea from "../inputs/TextArea";
import AddNewAssignmentButton from "../buttons/AddNewAssignmentButton";
import { createAssignment } from "../../services/assignmentsService";
import { toast } from "react-toastify";
import BackButton from "../buttons/BackButton";

const AddAssignmentScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const classId = searchParams.get("classId");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assigned_at: "",
    due_for: "",
    class_id: classId || "", // Default to classId from query params
  });

  const [error, setError] = useState<string | null>(null);

  // Update form data on input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Submit the form and create the assignment
  const handleSubmit = async () => {
    try {
      setError(null);

      // Ensure all fields are filled
      if (
        !formData.title ||
        !formData.description ||
        !formData.assigned_at ||
        !formData.due_for ||
        !formData.class_id
      ) {
        throw new Error("All fields are required.");
      }

      // Call the createAssignment service
      await createAssignment({
        title: formData.title,
        description: formData.description,
        assigned_at: new Date(formData.assigned_at).toISOString(),
        due_for: new Date(formData.due_for).toISOString(),
        class_id: formData.class_id,
      });

      toast.success("Assignment added successfully.");
      navigate(-1); // Redirect to class details page
    } catch (err: any) {
      toast.error("Failed to add assignment.");
      setError(err.message || "Failed to add assignment.");
    }
  };

  // Navigate back to the class details page
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex-grow flex flex-col items-center px-6 w-full max-w-6xl mx-auto mt-8">
      {/* Title */}
      <div className="mb-6 text-center">
        <Title>Add New Assignment</Title>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 mb-4 font-semibold text-center">
          {error}
        </div>
      )}

      {/* Input Form */}
      <div className="w-full max-w-lg space-y-4">
        {/* Assignment Title */}
        <div>
          <Label>Assignment Title</Label>
          <Input
            type="text"
            name="title"
            placeholder="Enter assignment title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>

        {/* Assignment Description */}
        <div>
          <Label>Description</Label>
          <Textarea
            name="description"
            placeholder="Enter assignment description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        {/* Assigned At */}
        <div>
          <Label>Assigned At</Label>
          <Input
            type="datetime-local"
            name="assigned_at"
            placeholder=""
            value={formData.assigned_at}
            onChange={handleInputChange}
          />
        </div>

        {/* Due For */}
        <div>
          <Label>Due Date</Label>
          <Input
            type="datetime-local"
            name="due_for"
            placeholder=""
            value={formData.due_for}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Submit and Back Buttons */}
      <div className="mt-6 flex w-80 justify-between items-center gap-2">
        <BackButton onClick={handleBack} />
        <AddNewAssignmentButton onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default AddAssignmentScreen;
