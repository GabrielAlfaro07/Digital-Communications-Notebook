// src/components/Title.tsx
import React from "react";

interface TitleProps {
  children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => (
  <h2 className="text-3xl font-bold">{children}</h2>
);

export default Title;
