// src/features/product/productSlice.ts
import { createSlice, } from '@reduxjs/toolkit';
//import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from './types';

interface ProductState {
  product: Product | null;
  selectedSize: string | null;
  quantity: number;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  product: null,
  selectedSize: null,
  quantity: 1,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSize: (state, action) => {
      state.selectedSize = action.payload;
    },
    incrementQuantity: (state) => {
      if (state.quantity < 10) state.quantity += 1;
    },
    decrementQuantity: (state) => {
      if (state.quantity > 1) state.quantity -= 1;
    },
    resetProductState: () => initialState,
    // fetchProductStart: (state, _action: PayloadAction<{ id: number }>) => {
    fetchProductStart: (state) => {
      state.loading = true;
      state.error = null;
      state.product = null;
      state.selectedSize = null;
    },
    fetchProductSuccess: (state, action) => {
      console.log('!!!fetchProductSuccess action payload:', action.payload);
      state.product = action.payload;
      state.loading = false;
    },
    fetchProductFailure: (state, action) => {
      console.error('!!!fetchProductFailure action payload:', action.payload);
      state.error = action.payload;
      state.loading = false;
    },
  },

});

export const {
  setSize,
  incrementQuantity,
  decrementQuantity,
  resetProductState,
  fetchProductStart,
  fetchProductSuccess,
  fetchProductFailure,
} = productSlice.actions;

export default productSlice.reducer;
