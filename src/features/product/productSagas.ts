//src/features/product/productSagas.ts
import { call, put, takeLatest } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchProductStart, fetchProductSuccess, fetchProductFailure } from './productSlice';
import type { Product } from './types';

function* fetchProductSaga(action: PayloadAction<{ id: number }>): Generator<any, void, any> {
  try {
    const productId = action.payload.id;
    const res = yield call(fetch, `http://localhost:7070/api/items/${productId}`);
    const data: Product = yield call([res, 'json']);
    yield put(fetchProductSuccess(data));
  } catch (e) {
    const error = e as Error;
    yield put(fetchProductFailure(`Ошибка загрузки товара: ${error.message}`));
  }
}

export function* watchFetchProductDetails() {
  yield takeLatest(fetchProductStart.type, fetchProductSaga);
}
