// src/app/rootSaga.ts
import { all, fork, call } from 'redux-saga/effects'; // '"redux-saga/effects"' has no exported member named 'all'. Did you mean 'call'
import { watchFetchTopSales } from '../features/topSales/topSalesSagas';
import {
  watchMainCatalog,
  watchHomeCatalog,
  watchCategories
} from '../features/catalog/catalogSagas';
import { watchFetchProductDetails } from '../features/product/productSagas';
import { watchCartChanges } from '../features/cart/cartSagas';


export default function* rootSaga() {
  yield all([
    // Первыми загружаем категории
    call(watchCategories),

    // Параллельно загружаем топ-продажи и каталог
    fork(watchFetchTopSales),
    fork(watchHomeCatalog),

    // Остальные саги
    fork(watchMainCatalog),
    fork(watchFetchProductDetails),
    fork(watchCartChanges)
  ]);
}