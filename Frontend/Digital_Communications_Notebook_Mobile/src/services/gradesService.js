// src/services/gradesService.js
const API_BASE_URL = "http://10.0.2.2:5000";

export const fetchGrades = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/grades`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Sort grades in ascending order based on numeric value in the name
    return data.sort((a, b) => {
      const numA = parseInt(a.name.match(/\d+/)?.[0] || "0", 10);
      const numB = parseInt(b.name.match(/\d+/)?.[0] || "0", 10);
      return numA - numB;
    });
  } catch (err) {
    console.error("Error fetching grades:", err.message);
    throw err;
  }
};
