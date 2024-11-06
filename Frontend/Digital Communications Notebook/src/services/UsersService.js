// UsuariosService.js
const BASE_URL = "http://localhost:5000/api/usuarios"; // Adjust based on server location

const UsersService = {
  async getUsuario(token) {
    const response = await fetch(`${BASE_URL}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    return response.json();
  },

  async getAllUsuarios(token) {
    const response = await fetch(`${BASE_URL}/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    return response.json();
  },

  async updateUsuario(token, nombre, email) {
    const response = await fetch(`${BASE_URL}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    return response.json();
  },

  async deleteUsuario(token) {
    const response = await fetch(`${BASE_URL}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    return response.json();
  },
};

export default UsersService;
