import React, { useState } from 'react';

interface RegisterScreenProps {
  onBackClick: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onBackClick }) => {
  const [userType, setUserType] = useState<string>('estudiante');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [extraField, setExtraField] = useState<string>('');

  const handleRegister = () => {
    console.log('Registro:', { username, email, password, userType, extraField });
  };

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserType(e.target.value);
    setExtraField('');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Crear cuenta nueva</h2>
      <input
        type="text"
        className="p-2 mb-4 border rounded w-64"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        className="p-2 mb-4 border rounded w-64"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="p-2 mb-4 border rounded w-64"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <select
        className="p-2 mb-4 border rounded w-64"
        value={userType}
        onChange={handleUserTypeChange}
      >
        <option value="estudiante">Estudiante</option>
        <option value="encargado">Encargado</option>
        <option value="docente">Docente</option>
      </select>

      {userType === 'estudiante' && (
        <input
          type="text"
          className="p-2 mb-4 border rounded w-64"
          placeholder="Grado"
          value={extraField}
          onChange={(e) => setExtraField(e.target.value)}
        />
      )}
      {userType === 'encargado' && (
        <input
          type="tel"
          className="p-2 mb-4 border rounded w-64"
          placeholder="Teléfono de emergencia"
          value={extraField}
          onChange={(e) => setExtraField(e.target.value)}
        />
      )}
      {userType === 'docente' && (
        <input
          type="text"
          className="p-2 mb-4 border rounded w-64"
          placeholder="Especialidad"
          value={extraField}
          onChange={(e) => setExtraField(e.target.value)}
        />
      )}

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleRegister}
      >
        Registrar
      </button>
      <button className="text-blue-500 underline" onClick={onBackClick}>
        Volver al Login
      </button>
    </div>
  );
};

export default RegisterScreen;
