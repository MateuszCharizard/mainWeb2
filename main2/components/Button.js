// components/Button.js
import React from 'react';

const Button = ({ onClick, children, className }) => {
  return (
    <button 
      type="submit" 
      onClick={onClick} 
      className={`bg-indigo-600 text-white px-6 py-2 text-lg rounded-full hover:bg-indigo-700 focus:outline-none ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;