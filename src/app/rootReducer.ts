// src/app/rootReducer.ts
import { combineReducers } from 'redux';
import topSalesReducer from '../features/topSales/topSalesSlice';
import catalogReducer from '../features/catalog/catalogSlice';
import productReducer from '../features/product/productSlice';
import cartReducer from '../features/cart/cartSlice';

const rootReducer = combineReducers({
  topSales: topSalesReducer,
  catalog: catalogReducer,
  product: productReducer,
  cart: cartReducer,
});

export default rootReducer;
