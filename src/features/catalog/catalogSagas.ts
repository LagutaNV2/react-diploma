// src/features/catalog/catalogSagas.ts
import { call, put, select, takeLatest, debounce } from 'redux-saga/effects';
import type { SagaIterator } from 'redux-saga';
import {
  setSearchQuery as setSearchQueryAction,
  loadMoreMainCatalog,
  loadMoreHomeCatalog,
  fetchMainCatalogSuccess,
  fetchMainCatalogFailure,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  fetchHomeCatalogStart,
  fetchHomeCatalogSuccess,
  fetchHomeCatalogFailure,
  fetchCategoriesStart,
  performSearch,
} from './catalogSlice';
import type { Product } from '../product/types';
import type { CatalogState } from './catalogSlice';
import type { Category } from './types';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

// Сага для основного каталога
function* fetchMainCatalogSaga(): SagaIterator {
  try {
    const state = yield select(state => state.catalog);
    const { selectedCategory } = state;
    const { searchQuery } = state.mainCatalog;
    const actualOffset = yield select(
      state => state.catalog.mainCatalog.offset
    );
    const params = new URLSearchParams({
      offset: actualOffset.toString(),
      ...(selectedCategory !== 0 && { categoryId: selectedCategory.toString() }),
      ...(searchQuery && { q: searchQuery })
    });

    // const res = yield call(fetch, `http://localhost:7070/api/items?${params}`);
    const res = yield call(fetch, `${apiBaseUrl}/items?${params}`);

    if (!res.ok)   throw new Error(`HTTP error! status: ${res.status}`);

    const data: Product[] = yield call([res, 'json']);

    yield put(fetchMainCatalogSuccess(data));
  } catch (e) {
    const error = e as Error;
    yield put(fetchMainCatalogFailure(error.message));
  }
}

// Сага для виджета на главной
function* fetchHomeCatalogSaga(): SagaIterator {
  try {
    const state: CatalogState = yield select(state => state.catalog);
    const { offset } = state.homeCatalog;

    const params = new URLSearchParams({
      offset: offset.toString(),
      ...(state.selectedCategory !== 0 && {
        categoryId: state.selectedCategory.toString()
      })
    });

    const res: Response = yield call(
      fetch,
      // `http://localhost:7070/api/items?${params}`
      `${apiBaseUrl}/items?${params}`
    );

    if (!res.ok) throw new Error('Ошибка загрузки каталога');

    const data: Product[] = yield call([res, 'json']);
    yield put(fetchHomeCatalogSuccess(data));
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error';
    yield put(fetchHomeCatalogFailure(errorMessage));
  }
}

function* fetchCategoriesSaga(): SagaIterator {
  try {
    // const res: Response = yield call(fetch, 'http://localhost:7070/api/categories');
    const res: Response = yield call(fetch, `${apiBaseUrl}/categories`);

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data: Category[] = yield res.json();
    yield put(fetchCategoriesSuccess([{ id: 0, title: 'Все' }, ...data]));

  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error';
    console.error('Error fetching categories:', errorMessage);
    yield put(fetchCategoriesFailure(errorMessage));
  }
}

// Наблюдатели
export function* watchMainCatalog() {
  yield debounce(300, [
    setSearchQueryAction.type,
    performSearch.type,
    loadMoreMainCatalog.type
  ], fetchMainCatalogSaga);
}

export function* watchHomeCatalog() {
  yield takeLatest([
    fetchHomeCatalogStart.type,
    loadMoreHomeCatalog.type
  ], fetchHomeCatalogSaga);
}

export function* watchCategories() {
  yield takeLatest(fetchCategoriesStart.type, fetchCategoriesSaga);
}
