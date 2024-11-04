import React, { useState } from 'react';

interface LoginScreenProps {
  onRegisterClick: () => void;
  onAssignmentClick: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onRegisterClick, onAssignmentClick }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    // Lógica para manejar el login
    console.log('Login:', { email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Login</h2>
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
      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4" onClick={handleLogin}>
        Login
      </button>
      <button className="text-blue-500 underline mb-2" onClick={onRegisterClick}>
        Crear cuenta nueva
      </button>
      <button className="text-blue-500 underline" onClick={onAssignmentClick}>
        Ir a Crear Asignación
      </button>
    </div>
  );
};

export default LoginScreen;
