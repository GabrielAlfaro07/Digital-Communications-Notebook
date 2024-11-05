import React, { useState } from "react";
import Input from "../inputs/Input";
import Title from "../titles/Title";
import Label from "../labels/Label";
import { useNavigate } from "react-router-dom";

const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const CreateAssignmentScreen: React.FC = () => {
  const [assignment, setAssignment] = useState({
    id_asignacion: generateUUID(),
    titulo: "",
    descripcion: "",
    fecha_creacion: new Date().toISOString(),
    fecha_asignacion: "",
    fecha_entrega: "",
  });
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

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
    <div className="flex flex-col items-center bg-gray-100">
      <div className="flex flex-col items-center justify-center h-screen px-6 w-full max-w-3xl">
        <Title>Crear Asignación</Title>
        <form onSubmit={handleSubmit}>
          <p className="mb-4 text-gray-600">
            <strong>ID de Asignación:</strong> {assignment.id_asignacion}
          </p>
          <Label>Título:</Label>
          <Input
            type="text"
            placeholder="Título de la Asignación"
            value={assignment.titulo}
            onChange={(e) =>
              handleChange({
                target: { name: "titulo", value: e.target.value },
              })
            }
          />
          <Label>Descripción:</Label>
          <textarea
            name="descripcion"
            value={assignment.descripcion}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-xl w-full focus:outline-none focus:border-blue-500"
          />
          <Label>Fecha de asignación:</Label>
          <Input
            type="date"
            placeholder="Fecha de Asignación"
            value={assignment.fecha_asignacion}
            onChange={(e) =>
              handleChange({
                target: { name: "fecha_asignacion", value: e.target.value },
              })
            }
          />
          <Label>Fecha de entrega:</Label>
          <Input
            type="date"
            placeholder="Fecha de Entrega"
            value={assignment.fecha_entrega}
            onChange={(e) =>
              handleChange({
                target: { name: "fecha_entrega", value: e.target.value },
              })
            }
          />
          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={handleBack}
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
    </div>
  );
};

export default CreateAssignmentScreen;
