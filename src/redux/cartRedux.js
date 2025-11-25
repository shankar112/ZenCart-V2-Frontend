// src/redux/cartRedux.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const existingProduct = state.products.find((p) => p._id === action.payload._id);
      
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
      
      // Recalculate
      state.quantity = state.products.length; 
      state.total = state.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
    
    increaseQuantity: (state, action) => {
      const item = state.products.find((p) => p._id === action.payload);
      if (item) {
        item.quantity += 1;
      }
      state.total = state.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
    
    decreaseQuantity: (state, action) => {
      const item = state.products.find((p) => p._id === action.payload);
      
      if (item) {
        if (item.quantity > 1) {
          // If more than 1, just decrease
          item.quantity -= 1;
        } else {
          // If it is 1, remove it completely!
          state.products = state.products.filter((p) => p._id !== action.payload);
        }
      }
      
      // Recalculate Counts & Total (Self-Healing)
      state.quantity = state.products.length;
      state.total = state.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
    
    removeProduct: (state, action) => {
      state.products = state.products.filter((p) => p._id !== action.payload);
      
      state.quantity = state.products.length;
      state.total = state.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
    
    resetCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, increaseQuantity, decreaseQuantity, removeProduct, resetCart } = cartSlice.actions;
export default cartSlice.reducer;