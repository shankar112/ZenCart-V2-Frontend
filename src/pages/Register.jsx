// src/pages/Register.jsx
import { useState } from 'react';
import { publicRequest } from '../requestMethods';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      await publicRequest.post("/auth/register", {
        name,
        email,
        password,
      });
      navigate("/login"); // Redirect to login after success
    } catch (err) {
      setError(true);
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            className="w-full p-3 border rounded"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="w-full p-3 border rounded"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full p-3 border rounded"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
          <button
            type="submit"
            className="w-full p-3 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            CREATE
          </button>
          {error && <span className="text-red-500 text-sm">Something went wrong!</span>}
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline font-medium">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;