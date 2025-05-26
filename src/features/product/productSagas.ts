//src/features/product/productSagas.ts
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { fetchProductStart, fetchProductSuccess, fetchProductFailure } from './productSlice';
import type { Product } from './types';

function* fetchProductSaga(action) {
  try {
    const productId = action.payload.id;
    const res = yield call(fetch, `http://localhost:7070/api/items/${productId}`);
    const data: Product = yield call([res, 'json']);
    yield put(fetchProductSuccess(data));
  } catch (e) {
    yield put(fetchProductFailure('Ошибка загрузки товара'));
  }
}

export function* watchFetchProductDetails() {
  yield takeLatest(fetchProductStart.type, fetchProductSaga);
}
