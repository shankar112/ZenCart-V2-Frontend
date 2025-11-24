// src/App.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './components/ProductCard';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Using your local backend URL
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">ZenCart V2</h1>
        <p className="text-gray-600">The Best AI-Powered Store</p>
      </div>

      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {products.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </section>
    </div>
  );
}

export default App;