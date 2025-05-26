//src/features/topSales/topSalesSagas.ts
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { fetchTopSalesStart, fetchTopSalesSuccess, fetchTopSalesFailure } from './topSalesSlice';
import type { TopSaleItem } from '../product/types';

function* fetchTopSalesSaga() {
  try {
    const response = yield call(fetch, 'http://localhost:7070/api/top-sales');
    const data: TopSaleItem[] = yield call([response, 'json']);
    yield put(fetchTopSalesSuccess(data));
  } catch (error) {
    yield put(fetchTopSalesFailure('Ошибка загрузки хитов продаж'));
  }
}

export function* watchFetchTopSales() {
  yield takeLatest(fetchTopSalesStart.type, fetchTopSalesSaga);
}
