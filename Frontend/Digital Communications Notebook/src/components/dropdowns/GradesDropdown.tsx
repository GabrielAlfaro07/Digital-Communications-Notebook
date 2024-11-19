import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";

interface GradesDropdownProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const GradesDropdown: React.FC<GradesDropdownProps> = ({ value, onChange }) => {
  const [grades, setGrades] = useState<{ grade_id: string; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/grades");
        if (!response.ok) {
          throw new Error("Failed to fetch grades");
        }
        const data = await response.json();

        // Sort grades in ascending order based on numeric value in the name
        const sortedGrades = data.sort(
          (a: { name: string }, b: { name: string }) => {
            const numA = parseInt(a.name.match(/\d+/)?.[0] || "0", 10);
            const numB = parseInt(b.name.match(/\d+/)?.[0] || "0", 10);
            return numA - numB;
          }
        );

        setGrades(sortedGrades);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, []);

  if (loading) return <p>Loading grades...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log("Selected grade_id:", value);

  return (
    <Dropdown value={value} onChange={onChange}>
      <DropdownItem value="">Select a grade</DropdownItem>
      {grades.map((grade) => (
        <DropdownItem key={grade.grade_id} value={grade.grade_id}>
          {grade.name}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

export default GradesDropdown;
