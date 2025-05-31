// src/app/rootSaga.ts

import { all } from 'redux-saga/effects';
import { watchFetchTopSales } from '../features/topSales/topSalesSagas';
import { watchMainCatalog, watchHomeCatalog, watchCategories } from '../features/catalog/catalogSagas';
import { watchFetchProductDetails } from '../features/product/productSagas';
import { watchCartChanges } from '../features/cart/cartSagas';

export default function* rootSaga() {
  yield all([
    watchFetchTopSales(),
    watchHomeCatalog(),
    watchMainCatalog(),
    watchCategories(),
    watchFetchProductDetails(),
    watchCartChanges()
  ]);
}