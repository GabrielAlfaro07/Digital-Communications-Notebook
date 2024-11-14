import React, { useState, useEffect } from "react";
import AssignmentCard from "../cards/AddAsigmentCard";
import AddAssignmentButton from "../buttons/AddAssigmentButton";
import AddStudentButton from "../buttons/addStudentButton";
import StudentListButton from "../buttons/StudentListButton";
import ComeBackButton from "../buttons/ComeBackButton";
const AddClassScreen: React.FC = () => {
  interface Assignment {
    title: string;
    startTime: string;
    endTime: string;
  }

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [expiredAssignments, setExpiredAssignments] = useState<Assignment[]>([]);

  // Quemar datos de prueba al montar el componente
  useEffect(() => {
    const assignmentsData = [
      { title: "Tarea 1", startTime: "2024-10-01", endTime: "2024-10-10" },
      { title: "Tarea 2", startTime: "2024-10-01", endTime: "2024-10-10" },
    ];
    const expiredAssignmentsData = [
      { title: "Tarea 3", startTime: "2023-10-01", endTime: "2023-10-10" },
      { title: "Tarea 4", startTime: "2023-10-01", endTime: "2023-10-10" },
    ];

    setAssignments(assignmentsData);
    setExpiredAssignments(expiredAssignmentsData);
  }, []);
  
  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {/* Header de la clase */}
      <div className="w-full max-w-4xl mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-gray-800">Clase de Matemáticas</h2>
          <AddStudentButton />
          <StudentListButton />
            
        </div>
        <hr className="border-t-2 border-gray-300" />
      </div>

      {/* Contenedor de Asignaciones */}
      <div className="w-full max-w-4xl">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Asignaciones</h3>
        {/* Botón para agregar asignación */}
        <div className="flex justify-end mt-4">
          <AddAssignmentButton />
        </div>
        {/* Separador visual */}
        <div className="mb-6">
          <h4 className="text-xl font-semibold text-green-600 mb-3">Activas</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assignments.length > 0 ? (
              assignments.map((assignment, index) => (
                <AssignmentCard key={index} assignment={assignment} />
              ))
            ) : (
              <p className="text-gray-500">No hay asignaciones activas</p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <div className="h-1 w-full bg-gray-200 my-4"></div>
          <h4 className="text-xl font-semibold text-red-600 mb-3">Vencidas</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {expiredAssignments.length > 0 ? (
              expiredAssignments.map((assignment, index) => (
                <AssignmentCard key={index} assignment={assignment} />
              ))
            ) : (
              <p className="text-gray-500">No hay asignaciones vencidas</p>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <ComeBackButton 
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => console.log('ComeBackButton clicked')}
          />
        </div>
      </div>
    </div>
  );
};

export default AddClassScreen;
