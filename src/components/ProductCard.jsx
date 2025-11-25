// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/cartRedux';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.preventDefault(); // Stop link navigation when clicking button
    dispatch(addProduct({ ...product, quantity: 1 }));
  };

  return (
    <div className="bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl w-72">
      {/* Link wraps the whole card */}
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="h-80 w-72 object-cover rounded-t-xl" />
        <div className="px-4 py-3 w-72">
          <span className="text-gray-400 mr-3 uppercase text-xs">{product.category}</span>
          <p className="text-lg font-bold text-black truncate block capitalize">{product.name}</p>
          <div className="flex items-center mt-3">
            <p className="text-lg font-semibold text-black cursor-auto">${product.price}</p>
            <div className="ml-auto">
              <button 
                onClick={handleAdd}
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition text-sm"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;