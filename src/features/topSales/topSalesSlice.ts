// src/features/topSales/topSalesSlice.ts
import { createSlice } from '@reduxjs/toolkit';
// import type { RootState } from '../../app/store';
import type { TopSaleItem } from '../product/types';
//import { useApi } from '../../hooks/useApi';

type TopSalesState = {
  items: TopSaleItem[];
  // status: 'idle' | 'loading' | 'succeeded' | 'failed';
  loading: boolean;
  error: string | null;
};

const initialState: TopSalesState = {
  items: [],
  // status: 'idle',
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
