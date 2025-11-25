// src/redux/cartRedux.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0, // Unique items count
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const existingProduct = state.products.find(p => p._id === action.payload._id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.quantity += 1;
        state.products.push(action.payload);
      }
      state.total += action.payload.price;
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find((p) => p._id === action.payload);
      if (item) {
        item.quantity += 1;
        state.total += item.price;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.products.find((p) => p._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.total -= item.price;
      }
    },
    resetCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, increaseQuantity, decreaseQuantity, resetCart } = cartSlice.actions;
export default cartSlice.reducer;