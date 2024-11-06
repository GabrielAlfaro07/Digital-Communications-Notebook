// AuthService.js
const BASE_URL = "http://localhost:5000/auth"; // Update if the server is hosted elsewhere

const AuthService = {
  async signup(email, password, nombre) {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, nombre }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    return response.json();
  },

  async signin(email, password) {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    return response.json();
  },

  async signout() {
    const response = await fetch(`${BASE_URL}/signout`, {
      method: "POST",
      headers: {
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

export default AuthService;
