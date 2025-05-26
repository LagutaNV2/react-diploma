// src/features/product/productSlice.ts
import {
  createSlice,
  // createAsyncThunk
} from '@reduxjs/toolkit';
// import type { RootState } from '../../app/store';
import type { Product } from './types';

interface ProductState {
  product: Product | null;
  selectedSize: string | null;
  quantity: number;
  // status: 'idle' | 'loading' | 'succeeded' | 'failed';
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  product: null,
  selectedSize: null,
  quantity: 1,
  // status: 'idle',
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
    fetchProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductSuccess: (state, action) => {
      state.product = action.payload;
      state.loading = false;
    },
    fetchProductFailure: (state, action) => {
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
