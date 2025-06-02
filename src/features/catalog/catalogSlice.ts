// src/features/catalog/catalogSlice.ts  последний фрагмент кода
import { createSlice } from '@reduxjs/toolkit';
import type { Category } from './types';
import type { Product } from '../product/types';

interface CatalogState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  selectedCategory: number;
  mainCatalog: { // Основной каталог (отдельная страница)
    products: Product[];
    searchQuery: string;
    offset: number;
    isSearching: boolean;
    loading: boolean;
    error: string | null;
    canLoadMore: boolean;
  };
  homeCatalog: { // Каталог на главной странице
    products: Product[];
    searchQuery: string;
    offset: number;
    loading: boolean;
    error: string | null;
    canLoadMore: boolean;
  };
}

const initialState: CatalogState = {
  categories: [],
  selectedCategory: 0,
  loading: false,
  error: null,
  mainCatalog: {
    products: [],
    searchQuery: '',
    isSearching: false,
    offset: 0,
    loading: false,
    error: null,
    canLoadMore: true,
  },
  homeCatalog: {
    products: [],
    searchQuery: '',
    offset: 0,
    canLoadMore: true,
    loading: false,
    error: null,
  },
};


const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    // Для основного каталога
    selectCategory: (state, action) => {
      const newCategory = Number(action.payload);
      state.selectedCategory = newCategory;

      // Сбрасываем оба каталога
      state.mainCatalog = {
        ...state.mainCatalog,
        offset: 0,
        products: [],
      };
      state.homeCatalog = {
        ...state.homeCatalog,
        offset: 0,
        products: [],
      };
    },
    setSearchQuery: (state, action) => {
      state.mainCatalog.searchQuery = action.payload;
      console.log('setSearchQuery:', action.payload);
      // state.mainCatalog.offset = 0;
      // state.mainCatalog.products = [];
    },
    loadMoreMainCatalog: (state) => {
      state.mainCatalog.offset += 6;
      state.mainCatalog.canLoadMore = true;
    },
    fetchMainCatalogStart: (state) => {
      state.mainCatalog.loading = true;
      state.mainCatalog.error = null;
    },
    fetchMainCatalogSuccess: (state, action) => {
      const newProducts = action.payload;

      // Фильтрация дубликатов
      const uniqueProducts = newProducts.filter(
        (newProduct: Product) => !state.mainCatalog.products.some(
          existing => existing.id === newProduct.id
        )
      );

      state.mainCatalog.products =
        state.mainCatalog.offset === 0
          ? newProducts
          : [...state.mainCatalog.products, ...uniqueProducts];

      state.mainCatalog.canLoadMore = action.payload.length >= 6;
      state.mainCatalog.loading = false;
      state.mainCatalog.isSearching = false;
      state.mainCatalog.error = null;
    },
    fetchMainCatalogFailure: (state, action) => {
      state.mainCatalog.error = action.payload;
      state.mainCatalog.loading = false;
      state.mainCatalog.isSearching = false;
    },
    performSearch: (state) => {
      state.mainCatalog.offset = 0;
      state.mainCatalog.products = [];
      state.mainCatalog.canLoadMore = true;
      state.mainCatalog.isSearching = true;
    },
    // Для виджета на главной
    fetchHomeCatalogStart: (state) => {
      state.homeCatalog.loading = true;
      state.homeCatalog.error = null;
    },
    fetchHomeCatalogSuccess: (state, action) => {
      const newProducts = action.payload;

      // Фильтрация дубликатов
      const uniqueProducts = newProducts.filter(
        newProduct => !state.homeCatalog.products.some(
          existing => existing.id === newProduct.id
        )
      );

      state.homeCatalog.products =
        state.homeCatalog.offset === 0
          ? newProducts
          : [...state.homeCatalog.products, ...uniqueProducts];

      state.homeCatalog.canLoadMore = action.payload.length >= 6;
      state.homeCatalog.loading = false;
    },
    fetchHomeCatalogFailure: (state, action) => {
      state.homeCatalog.error = action.payload;
      state.homeCatalog.loading = false;
    },
    loadMoreHomeCatalog: (state) => {
      state.homeCatalog.offset += 6;
      state.homeCatalog.canLoadMore = true;
    },
    // Для загрузки категорий
    fetchCategoriesStart: (state) => {
      state.categories = []
      state.loading = true;
      state.error = null; // Корневой error
    },
    fetchCategoriesSuccess: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    },
    fetchCategoriesFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  selectCategory,
  setSearchQuery,
  loadMoreMainCatalog,
  loadMoreHomeCatalog,
  fetchMainCatalogStart,
  fetchMainCatalogSuccess,
  fetchMainCatalogFailure,
  fetchHomeCatalogStart,
  fetchHomeCatalogSuccess,
  fetchHomeCatalogFailure,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  performSearch,
} = catalogSlice.actions;

export default catalogSlice.reducer;
