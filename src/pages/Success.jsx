// src/pages/Success.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetCart } from '../redux/cartRedux';

const Success = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear the cart when payment is successful
    dispatch(resetCart());
  }, [dispatch]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-green-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful! 🎉</h1>
        <p className="text-gray-600 text-lg mb-8">
          Thank you for your purchase. Your order is being prepared.
        </p>
        <Link to="/" className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Success;