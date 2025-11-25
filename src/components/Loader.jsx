// src/components/Loader.jsx
import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh] w-full">
      {/* The Spinner */}
      <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      
      {/* The Text */}
      <p className="mt-5 text-gray-500 font-medium tracking-widest uppercase animate-pulse">
        Loading Store...
      </p>
    </div>
  );
};

export default Loader;