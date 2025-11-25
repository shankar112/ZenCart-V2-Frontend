// src/pages/Product.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux";
import { toast } from 'react-toastify';
import Loader from '../components/Loader'; // <-- Import Loader

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2]; 
  const [product, setProduct] = useState(null); // Start as null to check loading
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/" + id);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity }));
    toast.success("Added to cart!");
  };

  // SHOW LOADER IF PRODUCT IS NOT LOADED YET
  if (!product) {
    return <Loader />;
  }

  return (
    <div className="p-10 flex flex-col md:flex-row gap-10 max-w-6xl mx-auto mt-10 bg-white rounded-xl shadow-sm">
      {/* Image */}
      <div className="flex-1">
        <img src={product.image} alt={product.name} className="w-full h-[500px] object-cover rounded-xl shadow-lg" />
      </div>
      
      {/* Info */}
      <div className="flex-1 flex flex-col gap-6 justify-center">
        <div>
            <span className="text-sm text-blue-600 font-bold tracking-widest uppercase">{product.category}</span>
            <h1 className="text-5xl font-bold text-gray-900 mt-2">{product.name}</h1>
        </div>
        
        <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
        <span className="text-4xl font-light text-gray-800">$ {product.price}</span>
        
        {/* Quantity & Add */}
        <div className="flex items-center gap-8 mt-5">
          <div className="flex items-center gap-4 font-bold border-2 border-gray-200 rounded-full px-4 py-2">
            <button onClick={() => handleQuantity("dec")} className="w-8 h-8 flex items-center justify-center hover:text-blue-600 text-xl">-</button>
            <span className="text-xl w-6 text-center">{quantity}</span>
            <button onClick={() => handleQuantity("inc")} className="w-8 h-8 flex items-center justify-center hover:text-blue-600 text-xl">+</button>
          </div>
          <button 
            onClick={handleClick} 
            className="bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-gray-800 transition shadow-lg active:scale-95"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;