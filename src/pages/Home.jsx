// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { publicRequest } from '../requestMethods';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader'; // <-- Import Loader

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await publicRequest.get('/products');
        setProducts(res.data);
        setFilteredProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, products]);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          New Arrivals
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          Check out the latest collection of AI-curated fashion.
        </p>

        {/* SEARCH BAR */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border border-gray-300">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              id="search"
              placeholder="Search by name or category..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* LOADING STATE */}
      {loading ? (
        <Loader /> // <-- New Loader Component
      ) : (
        <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500 text-lg">No products found matching your search.</p>
          )}
        </section>
      )}
    </div>
  );
};

export default Home;