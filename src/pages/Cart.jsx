// src/pages/Cart.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetCart } from '../redux/cartRedux';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/checkout/payment', {
        items: cart.products,
      });

      // Redirect to the Stripe URL provided by backend
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error("Checkout Error:", err);
    }
  };

  if (cart.products.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Your Cart is Empty</h2>
        <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-5 min-h-screen bg-gray-50">
      {/* ... (Header and Actions remain same) ... */}

      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        {/* ... (Product List remains same) ... */}
        <div className="flex-3 flex flex-col gap-6 w-full">
          {cart.products.map((product, index) => (
            <div key={index} className="flex justify-between items-center bg-white p-5 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-md" />
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-lg">{product.name}</span>
                  <span className="text-sm text-gray-500">ID: {product._id}</span>
                  <span className="w-5 h-5 rounded-full border border-gray-300" style={{ backgroundColor: "black" }}></span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center font-bold text-xl">
                  <span className="text-2xl mx-2">{product.quantity}</span>
                </div>
                <div className="text-2xl font-light">
                  $ {product.price * product.quantity}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Box */}
        <div className="flex-1 border rounded-lg p-5 bg-white shadow-md h-fit">
          <h1 className="text-2xl font-light mb-6">ORDER SUMMARY</h1>
          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span>$ {cart.total}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Estimated Shipping</span>
            <span>$ 5.90</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Shipping Discount</span>
            <span>- $ 5.90</span>
          </div>
          <div className="flex justify-between mb-6 font-bold text-xl border-t pt-4">
            <span>Total</span>
            <span>$ {cart.total}</span>
          </div>

          {/* UPDATED BUTTON */}
          <button 
            onClick={handleCheckout}
            className="w-full bg-black text-white font-semibold py-3 hover:bg-gray-800 transition active:scale-95"
          >
            CHECKOUT NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;