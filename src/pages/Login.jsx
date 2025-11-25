// src/pages/Login.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/userRedux';
import { publicRequest } from '../requestMethods';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import Toast

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching } = useSelector((state) => state.user);

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    
    try {
      const res = await publicRequest.post("/auth/login", { email, password });
      dispatch(loginSuccess(res.data));
      toast.success("Welcome back!"); // Success Toast
      navigate("/");
    } catch (err) {
      dispatch(loginFailure());
      
      // TOAST ERROR instead of inline div
      if (err.response && err.response.data) {
        const msg = typeof err.response.data === 'string' ? err.response.data : "Login failed.";
        toast.error(msg);
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <form className="space-y-4">
          <input
            className="w-full p-3 border rounded"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full p-3 border rounded"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleClick}
            disabled={isFetching}
            className="w-full p-3 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            LOGIN
          </button>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline font-medium">
                Create a new account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;