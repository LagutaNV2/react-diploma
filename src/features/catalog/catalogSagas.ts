//src/features/catalog/catalogSagas.ts
import { call, put, select, takeLatest, debounce } from 'redux-saga/effects';
import {
  selectCategory as selectCategoryAction,
  setSearchQuery as setSearchQueryAction,
  loadMoreMainCatalog,
  loadMoreHomeCatalog,
  fetchMainCatalogStart,
  fetchMainCatalogSuccess,
  fetchMainCatalogFailure,
  fetchCategoriesSuccess,
  fetchHomeCatalogStart,
  fetchHomeCatalogSuccess,
  fetchHomeCatalogFailure,
  fetchCategoriesStart,
  performSearch,
} from './catalogSlice';
import type { Product } from '../product/types';

// Сага для основного каталога
function* fetchMainCatalogSaga() {
  try {
    const state = yield select(state => state.catalog);
    const { selectedCategory } = state;
    const { searchQuery, offset } = state.mainCatalog;
    const actualOffset = yield select(
      state => state.catalog.mainCatalog.offset
    );
    const params = new URLSearchParams({
      offset: actualOffset.toString(),
      ...(selectedCategory !== 0 && { categoryId: selectedCategory.toString() }),
      ...(searchQuery && { q: searchQuery })
    });

    const res = yield call(fetch, `http://localhost:7070/api/items?${params}`);
    console.log('Response status:', res.status);
    if (!res.ok)   throw new Error(`HTTP error! status: ${res.status}`);
    console.log('Response received:', res);
    const data: Product[] = yield call([res, 'json']);
    console.log('Data received:', data);
    yield put(fetchMainCatalogSuccess(data));
  } catch (e) {
    console.error('Error fetching main catalog:', e);
    yield put(fetchMainCatalogFailure(e.message));
  }
}

// Сага для виджета на главной
function* fetchHomeCatalogSaga() {
  try {
    const state = yield select(state => state.catalog);
    const { selectedCategory } = state;
    const { offset } = state.homeCatalog;
    const params = new URLSearchParams({
      offset: state.homeCatalog.offset.toString(),
      ...(state.selectedCategory !== 0 && { categoryId: state.selectedCategory.toString() })
    });

    const res = yield call(fetch, `http://localhost:7070/api/items?${params}`);
    if (!res.ok) throw new Error('Ошибка загрузки каталога');
    const data: Product[] = yield call([res, 'json']);
    yield put(fetchHomeCatalogSuccess(data));
  } catch (e) {
    yield put(fetchHomeCatalogFailure(e.message));
  }
}

function* fetchCategoriesSaga() {
  console.log('fetchCategoriesSaga started');
  try {
    const res = yield call(fetch, 'http://localhost:7070/api/categories');
    if (!res.ok) throw new Error('Ошибка загрузки категорий');
    const data = yield call([res, 'json']);
    yield put(fetchCategoriesSuccess([{ id: 0, title: 'Все' }, ...data]));
  } catch (e) {
    console.error('Error fetching categories:', e);
    yield put(fetchCategoriesFailure(e.message));
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
