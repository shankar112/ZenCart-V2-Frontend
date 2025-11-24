// src/components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <a href="#">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-80 w-72 object-cover rounded-t-xl" 
        />
        <div className="px-4 py-3 w-72">
          <span className="text-gray-400 mr-3 uppercase text-xs">{product.category}</span>
          <p className="text-lg font-bold text-black truncate block capitalize">
            {product.name}
          </p>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              ${product.price}
            </p>
            <div className="ml-auto">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition text-sm font-medium">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;