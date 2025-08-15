'use client';
import React from 'react';

const ClientButton = ({ children, onClick }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ClientButton;
