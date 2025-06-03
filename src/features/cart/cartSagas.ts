//src/features/cart/cartSagas.ts
import { takeLatest, put } from 'redux-saga/effects';

function* saveToLocalStorage() {
  yield put({ type: 'LOCAL_STORAGE_UPDATED' });
}

export function* watchCartChanges() {
  yield takeLatest(['addToCart', 'removeFromCart', 'clearCart'], saveToLocalStorage);
}