//src/features/topSales/topSalesSagas.ts
import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  fetchTopSalesStart,
  fetchTopSalesSuccess,
  fetchTopSalesFailure
} from './topSalesSlice';
import type { TopSaleItem } from '../product/types';

export default function* fetchTopSalesSaga() {
  try {
    const response: Response = yield call(fetch, 'http://localhost:7070/api/top-sales');

    if (!response.ok) {
      const errorData: { message?: string } = yield response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data: TopSaleItem[] = yield call([response, 'json']);
    yield put(fetchTopSalesSuccess(data));

    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    yield put(fetchTopSalesFailure(errorMessage));
    return false;
  }
}

export function* watchFetchTopSales() {
  yield takeLatest(fetchTopSalesStart.type, fetchTopSalesSaga);
}
