// src/pages/Cart.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeProduct } from '../redux/cartRedux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import Toast

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      // Nice UI Warning instead of alert()
      toast.warning("Please Login to Checkout!");
      navigate('/login');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/checkout/payment', {
        items: cart.products,
      });
      if (res.data.url) window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      toast.error("Checkout failed. Please try again.");
    }
  };

  if (cart.products.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Your Cart is Empty</h2>
        <Link to="/" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-5 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-light text-center mb-10 tracking-wider">YOUR BAG</h1>
      
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        
        <div className="flex-3 flex flex-col gap-6 w-full">
          {cart.products.map((product) => (
            <div key={product._id} className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition hover:shadow-md relative">
              <button onClick={() => dispatch(removeProduct(product._id))} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition" title="Remove Item">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>

              <div className="flex items-center gap-6">
                <img src={product.image} alt={product.name} className="w-28 h-28 object-cover rounded-lg shadow-sm border border-gray-200" />
                <div className="flex flex-col gap-2">
                  <span className="font-bold text-xl text-gray-800 pr-10">{product.name}</span>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-1 rounded w-fit">{product.category || "General"}</span>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-4">
                <div className="flex items-center font-bold text-xl bg-gray-100 rounded-full">
                  <button onClick={() => dispatch(decreaseQuantity(product._id))} className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-full transition text-gray-600">-</button>
                  <span className="text-lg font-medium w-8 text-center">{product.quantity}</span>
                  <button onClick={() => dispatch(increaseQuantity(product._id))} className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-full transition text-gray-600">+</button>
                </div>
                <div className="text-2xl font-light text-gray-800">$ {(product.price * product.quantity).toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 border border-gray-200 rounded-xl p-8 bg-white shadow-lg h-fit sticky top-24 min-w-[300px]">
          <h1 className="text-xl font-bold mb-6 text-gray-800 uppercase tracking-wide border-b pb-4">Order Summary</h1>
          <div className="space-y-3 text-gray-600 text-base">
            <div className="flex justify-between items-center"><span>Subtotal</span><span className="font-medium text-gray-900">$ {cart.total.toFixed(2)}</span></div>
            <div className="flex justify-between items-center"><span>Estimated Shipping</span><span className="font-medium text-gray-900">$ 5.90</span></div>
            <div className="flex justify-between items-center text-green-600"><span>Shipping Discount</span><span className="font-medium">- $ 5.90</span></div>
          </div>
          <div className="flex justify-between items-center mt-6 mb-8 pt-4 border-t border-gray-200">
            <span className="text-xl font-bold text-gray-800">Total</span>
            <span className="text-2xl font-extrabold text-gray-900">$ {Math.max(0, cart.total).toFixed(2)}</span>
          </div>
          <button onClick={handleCheckout} className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition transform active:scale-95 shadow-lg tracking-wider">CHECKOUT NOW</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;