import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ComeBackButton from "../buttons/BackButton";
const AddStudentPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleAddStudent = () => {
    console.log(`Estudiante agregado: ${name}`);
    // Aquí podrías agregar lógica para añadir a la lista de estudiantes
    navigate("/students"); // Navegar a la lista de estudiantes
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Agregar Estudiante
        </h2>
        <input
          type="text"
          placeholder="Nombre del estudiante"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddStudent}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Agregar
        </button>
        <ComeBackButton
          className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          onClick={() => console.log("ComeBackButton clicked")}
        />
      </div>
    </div>
  );
};

export default AddStudentPage;
