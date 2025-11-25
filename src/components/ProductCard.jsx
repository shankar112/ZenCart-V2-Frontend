// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/cartRedux';
import { toast } from 'react-toastify'; // Import Toast

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  // Generate a random rating between 3.5 and 5 for the "Fake Rating" effect
  const rating = (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
  const reviewCount = Math.floor(Math.random() * 150) + 10;

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addProduct({ ...product, quantity: 1 }));
    // Show success message
    toast.success(`${product.name} added to cart! 🛒`);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden duration-300 hover:scale-105 hover:shadow-2xl w-72 flex flex-col">
      <Link to={`/product/${product._id}`}>
        <div className="h-80 w-full relative group">
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <span className="text-gray-400 mr-3 uppercase text-xs tracking-widest font-semibold mb-2">
            {product.category}
          </span>
          
          <h3 className="text-lg font-bold text-gray-900 truncate block capitalize mb-1" title={product.name}>
            {product.name}
          </h3>

          {/* FAKE RATING SECTION */}
          <div className="flex items-center mb-4">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <p className="ml-1 text-sm font-bold text-gray-600">{rating}</p>
            <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
            <p className="text-sm font-medium text-gray-500 underline hover:text-blue-600">
              {reviewCount} reviews
            </p>
          </div>
          
          <div className="flex items-center justify-between mt-auto">
            <p className="text-xl font-bold text-gray-900">
              ${product.price}
            </p>
            
            <button 
              onClick={handleAdd}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-md font-medium text-sm flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;