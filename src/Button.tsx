// src/components/Button.tsx
import React from 'react';

const CustomButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
  return (
    <button
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
