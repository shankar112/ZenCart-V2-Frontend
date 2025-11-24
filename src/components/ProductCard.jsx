// src/components/ProductCard.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/cartRedux';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity: 1 }));
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden duration-300 hover:scale-105 hover:shadow-2xl w-72 flex flex-col">
      {/* Image Container */}
      <div className="h-80 w-full relative group">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover" 
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Category */}
        <span className="text-gray-400 mr-3 uppercase text-xs tracking-widest font-semibold mb-2">
          {product.category}
        </span>
        
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 truncate block capitalize mb-4" title={product.name}>
          {product.name}
        </h3>
        
        {/* Price & Button Row */}
        <div className="flex items-center justify-between mt-auto">
          <p className="text-xl font-bold text-gray-900">
            ${product.price}
          </p>
          
          <button 
            onClick={handleClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-md font-medium text-sm flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;