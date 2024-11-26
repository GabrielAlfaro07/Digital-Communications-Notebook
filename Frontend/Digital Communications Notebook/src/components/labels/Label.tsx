//src/components/Label.tsx
import React from "react";

interface LabelProps {
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ children }) => (
  <span className="mb-0">{children}</span>
);

export default Label;
