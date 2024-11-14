import React, { useState } from "react";
import ComeBackButton from "../buttons/ComeBackButton";

interface Student {
  id: number;
  name: string;
}

const StudentListPage: React.FC = () => {
  
  // Datos quemados
  const [students] = useState<Student[]>([
    { id: 1, name: "Juan Pérez" },
    { id: 2, name: "Ana Gómez" },
    { id: 3, name: "Luis Ramírez" },
  ]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Lista de Estudiantes</h2>
        <ul className="divide-y divide-gray-200">
          {students.map((student) => (
            <li key={student.id} className="py-4 flex justify-between items-center">
              <span className="text-gray-700">{student.name}</span>
            </li>
          ))}
        </ul>
        <ComeBackButton 
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => console.log('ComeBackButton clicked')}
          />
      </div>
    </div>
  );
};

export default StudentListPage;
