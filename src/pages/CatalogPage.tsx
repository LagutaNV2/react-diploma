// src/pages/CatalogPage.tsx
import { useEffect, useState, useRef }  from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import {
  setSearchQuery,
  performSearch,
  loadMoreMainCatalog,
  fetchMainCatalogStart,
} from '../features/catalog/catalogSlice';
import ErrorMessage from '../components/ErrorMessage';
import Card from '../components/Card';
import Loader from '../components/Loader';
import Categories from '../components/Categories';
import EmptyState from '../components/EmptyState';

// SSR-safe проверка на выполнение в браузере
const isBrowser = typeof window !== "undefined";

const MIN_LOADER_DISPLAY_TIME = 500;

const CatalogPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch: AppDispatch = useDispatch();
  const [localQuery, setLocalQuery] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);
  const selectedCategory = useSelector((state: RootState) => state.catalog.selectedCategory);

  const loaderTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    products,
    searchQuery,
    offset,
    loading,
    isSearching,
    error,
    canLoadMore,
  } = useSelector((state: RootState) => state.catalog.mainCatalog);

  const catalogLoading = useSelector((state: RootState) => state.catalog.loading);
  const isEmptyState = !loading && !isSearching && !error && products.length === 0 && searchQuery;
  // const isEmptyState = !error && products.length === 0 && searchQuery;
  console.log('catalogLoading:', isSearching, 'isSearching:', loading, 'error:', error, 'products:', products.length, 'searchQuery:', searchQuery);

  useEffect(() => {
    // Синхронизация с URL при загрузке
    const urlQuery = searchParams.get('q') || '';
    setLocalQuery(urlQuery);
    dispatch(setSearchQuery(urlQuery));
  }, [searchParams, dispatch]);

  // Обновление локального состояния при изменении в Redux
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  // Очистка таймеров при размонтировании
  useEffect(() => {
    return () => {
      if (isBrowser) {
        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
        if (loaderTimeoutRef.current) clearTimeout(loaderTimeoutRef.current);
      }
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);

    // SSR-safe очистка таймаута
    if (isBrowser && searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (isBrowser) {
      searchTimeoutRef.current = setTimeout(() => {
        dispatch(setSearchQuery(value));
        dispatch(performSearch());
      }, 1500);
    }
  };

  const handleSearchBlur = () => {
    // SSR-safe очистка таймаута
    if (isBrowser && searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    dispatch(setSearchQuery(localQuery));
    dispatch(performSearch());
  };

  const handleLoadMore = async () => {
    if (loadingMore || !canLoadMore) return;

    const startTime = Date.now();
    setLoadingMore(true);

    try {
      await dispatch(loadMoreMainCatalog());
    } finally {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = MIN_LOADER_DISPLAY_TIME - elapsedTime;

      if (remainingTime > 0) {
        loaderTimeoutRef.current = setTimeout(() => {
          setLoadingMore(false);
        }, remainingTime);
      } else {
          setLoadingMore(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      // Очистка при размонтировании компонента
      if (isBrowser && searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="catalog-page">
      <div className="container">
        {!isEmptyState && (
          <>
            <Categories
              onCategorySelect={() => {
                dispatch(performSearch());
                dispatch(fetchMainCatalogStart());
              }}
            />

            <form className="catalog-search-form form-inline mb-4">
              <input
                className="form-control"
                placeholder="Поиск"
                value={localQuery}
                onChange={handleSearchChange}
                onBlur={handleSearchBlur}
              />
            </form>
          </>
        )}
        {/* Центральный контейнер для состояний */}
        <div className="state-container">
          {/* Показываем лоадер при выполнении поиска */}
          {(loading || isSearching) && <Loader />}

          {/* Состояние пустого результата */}
          {isEmptyState && (
            <div className="d-flex justify-content-center align-items-center">
              <EmptyState />
            </div>
          )}

          {/* Список товаров */}
          {products.length > 0 && (
            <>
              <div className="row">
                {products?.map(product => (
                  <div key={`${product.id}-main`} className="col-4 mb-4">
                    <Card item={product} />
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                {loadingMore ? (
                  <Loader />
                ) : canLoadMore ? (
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleLoadMore}
                  >
                    Загрузить ещё
                  </button>
                ) : null}
              </div>
            </>
          )}

          {error && (
            <ErrorMessage
              error={error}
              onRetry={() => dispatch(fetchMainCatalogStart())}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
