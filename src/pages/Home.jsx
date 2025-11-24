// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        console.log("Products fetched:", res.data); // Debugging log
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          New Arrivals
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          Check out the latest collection of AI-curated fashion.
        </p>
      </div>

      {loading ? (
        <p className="text-center text-xl">Loading products...</p>
      ) : (
        <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
          {products.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </section>
      )}
    </div>
  );
};

export default Home;