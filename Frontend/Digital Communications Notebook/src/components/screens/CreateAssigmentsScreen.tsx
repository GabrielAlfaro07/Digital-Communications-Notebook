import { useState } from 'react';

// Función para generar un UUID manualmente
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

interface CreateAssignmentScreenProps {
  onBackClick: () => void;
}

const CreateAssignmentScreen: React.FC<CreateAssignmentScreenProps> = ({ onBackClick }) => {
  const [assignment, setAssignment] = useState({
    id_asignacion: generateUUID(),
    titulo: '',
    descripcion: '',
    fecha_creacion: new Date().toISOString(),
    fecha_asignacion: '',
    fecha_entrega: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAssignment({
      ...assignment,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Datos de la asignación:", assignment);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Crear Asignación</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <p className="mb-4 text-gray-600"><strong>ID de Asignación:</strong> {assignment.id_asignacion}</p>

        <label className="block mb-4">
          <span className="text-gray-700">Título:</span>
          <input
            type="text"
            name="titulo"
            value={assignment.titulo}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Descripción:</span>
          <textarea
            name="descripcion"
            value={assignment.descripcion}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Fecha de Asignación:</span>
          <input
            type="date"
            name="fecha_asignacion"
            value={assignment.fecha_asignacion}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Fecha de Entrega:</span>
          <input
            type="date"
            name="fecha_entrega"
            value={assignment.fecha_entrega}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
          />
        </label>

        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={onBackClick}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Volver
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Crear Asignación
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAssignmentScreen;
