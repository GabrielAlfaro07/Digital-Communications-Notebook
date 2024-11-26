// src/services/rolesService.js
const API_BASE_URL = "http://10.0.2.2:5000";

export const fetchRoles = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/roles`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching roles:", err.message);
    throw err;
  }
};
