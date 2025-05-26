// src/features/topSales/topSalesSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { TopSaleItem } from '../product/types';

type TopSalesState = {
  items: TopSaleItem[];
  loading: boolean;
  error: string | null;
};

const initialState: TopSalesState = {
  items: [],
  loading: false,
  error: null,
};

const topSalesSlice = createSlice({
  name: 'topSales',
  initialState,
  reducers: {
    fetchTopSalesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTopSalesSuccess: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    fetchTopSalesFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchTopSalesStart, fetchTopSalesSuccess, fetchTopSalesFailure } = topSalesSlice.actions;
export default topSalesSlice.reducer;
