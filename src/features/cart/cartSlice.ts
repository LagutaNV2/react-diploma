// src/features/cart/cartSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { CartItem } from '../product/types';

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cartItems') || '[]'),
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: { payload: CartItem }) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id && item.size === action.payload.size
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      try {
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      } catch (e) {
        console.error('Error saving to localStorage:', e);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item =>
        !(item.id === action.payload.id && item.size === action.payload.size)
      );
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cartItems');
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;