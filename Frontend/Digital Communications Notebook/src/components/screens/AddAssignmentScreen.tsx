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

  const [documents, setDocuments] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Update form data on input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setDocuments((prevDocuments) => [...prevDocuments, ...selectedFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setDocuments((prevDocuments) =>
      prevDocuments.filter((_, fileIndex) => fileIndex !== index)
    );
  };

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // Submit the form and create the assignment
  const handleSubmit = async () => {
    try {
      setError(null);

      // Validate required fields
      if (
        !formData.title ||
        !formData.description ||
        !formData.assigned_at ||
        !formData.due_for ||
        !formData.class_id
      ) {
        throw new Error("All fields are required.");
      }

      // Convert documents to the expected format
      const documentData = await Promise.all(
        documents.map(async (file) => {
          const base64 = await fileToBase64(file);
          return {
            name: file.name,
            file_type: file.type,
            data: base64,
          };
        })
      );

      // Call the service
      const assignment = await createAssignment(
        {
          title: formData.title,
          description: formData.description,
          assigned_at: new Date(formData.assigned_at).toISOString(),
          due_for: new Date(formData.due_for).toISOString(),
          class_id: formData.class_id,
          documents: documentData, // Send the formatted documents
        },
        formData.class_id
      );

      toast.success("Assignment added successfully.");
      console.log(assignment);
      navigate(-1); // Redirect to the previous page
    } catch (err: any) {
      console.error("Error creating assignment:", err);
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
      <div className="mb-6 text-center">
        <Title>Add New Assignment</Title>
      </div>

      {error && (
        <div className="text-red-500 mb-4 font-semibold text-center">
          {error}
        </div>
      )}

      <div className="w-full max-w-lg space-y-4">
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

        <div>
          <Label>Description</Label>
          <Textarea
            name="description"
            placeholder="Enter assignment description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

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

        <div>
          <Label>Upload Documents</Label>
          <Input
            type="file"
            multiple
            accept="image/*,application/pdf"
            onChange={handleFileChange}
          />
          {documents.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Selected Files:</h3>
              <ul className="space-y-2">
                {documents.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
                  >
                    <span>{file.name}</span>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleRemoveFile(index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex w-80 justify-between items-center gap-2">
        <BackButton onClick={handleBack} />
        <AddNewAssignmentButton onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default AddAssignmentScreen;
