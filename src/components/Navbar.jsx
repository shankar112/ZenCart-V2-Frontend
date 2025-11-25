// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userRedux';
import { resetCart } from '../redux/cartRedux';
import { userRequest } from '../requestMethods';

const Navbar = () => {
  const quantity = useSelector(state => state.cart.quantity);
  const user = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetCart());
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure? This action cannot be undone.")) {
      try {
        // Ensure we use the correct ID field from the user object
        // MongoDB usually uses '_id', but sometimes we might map it to 'id'
        const userId = user._id || user.id; 
        
        await userRequest.delete(`/users/${userId}`);
        
        alert("Account deleted successfully.");
        handleLogout();
      } catch (err) {
        console.error("Delete Error:", err.response ? err.response.data : err);
        alert("Failed to delete account.");
      }
    }
  };

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-blue-600 tracking-tighter">
        ZenCart<span className="text-gray-800">V2</span>
      </Link>

      <div className="flex items-center space-x-6 relative">
        <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Shop</Link>
        
        <Link to="/cart" className="relative text-gray-600 hover:text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {quantity}
          </span>
        </Link>

        {user ? (
          <div className="relative">
            {/* Profile Icon Trigger */}
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium text-gray-700">{user.name.split(' ')[0]}</span>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                <button 
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
                <button 
                  onClick={handleDeleteAccount}
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                >
                  Delete Account
                </button>
              </div>
            )}
            
            {/* Click outside overlay to close menu */}
            {showMenu && (
              <div 
                className="fixed inset-0 z-40 bg-transparent cursor-default"
                onClick={() => setShowMenu(false)}
              ></div>
            )}
          </div>
        ) : (
          <Link to="/login" className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;