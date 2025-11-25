// src/pages/Product.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux";

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2]; // Extract ID from URL
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/" + id);
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
  };

  return (
    <div className="p-10 flex flex-col md:flex-row gap-10 max-w-6xl mx-auto mt-10">
      {/* Image */}
      <div className="flex-1">
        <img src={product.image} alt={product.name} className="w-full h-[500px] object-cover rounded-xl shadow-lg" />
      </div>
      
      {/* Info */}
      <div className="flex-1 flex flex-col gap-6">
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <p className="text-gray-600 text-lg">{product.description}</p>
        <span className="text-4xl font-light">$ {product.price}</span>
        
        {/* Quantity & Add */}
        <div className="flex items-center gap-8 mt-5">
          <div className="flex items-center gap-4 font-bold">
            <button onClick={() => handleQuantity("dec")} className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300">-</button>
            <span className="text-xl border px-4 py-1 rounded">{quantity}</span>
            <button onClick={() => handleQuantity("inc")} className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300">+</button>
          </div>
          <button onClick={handleClick} className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition">
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;