// src/pages/CatalogPage.tsx
import React, { useEffect, useState, useRef }  from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useDebounce } from 'use-debounce';
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

const CatalogPage = () => {
  const [searchParams] = useSearchParams();
    const dispatch: AppDispatch = useDispatch();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [localQuery, setLocalQuery] = useState('');
    const selectedCategory = useSelector((state: RootState) => state.catalog.selectedCategory);

    const {
      products,
      searchQuery,
      offset,
      loading,
      error,
      canLoadMore,
    } = useSelector((state: RootState) => state.catalog.mainCatalog);


    useEffect(() => {
      // Синхронизация с URL при загрузке
      const urlQuery = searchParams.get('q') || '';
      setLocalQuery(urlQuery);
      dispatch(setSearchQuery(urlQuery));
      // dispatch(performSearch());
    }, [searchParams, dispatch]);

    // Обновление локального состояния при изменении в Redux
    useEffect(() => {
      setLocalQuery(searchQuery);
    }, [searchQuery]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setLocalQuery(value);

      // Очищаем предыдущий таймер
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // Устанавливаем новый таймер на 3 секунды
      timeoutRef.current = setTimeout(() => {
        dispatch(setSearchQuery(value));
        dispatch(performSearch());
      }, 1500);
    };

    const handleSearchBlur = () => {
      // Немедленный поиск при потере фокуса
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      dispatch(setSearchQuery(localQuery));
      dispatch(performSearch());
    };

    useEffect(() => {
      return () => {
        // Очистка при размонтировании компонента
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, []);

  return (
    <div className="catalog">
      <Categories
        // onCategorySelect={(categoryId) => {
        onCategorySelect={() => {
          dispatch(performSearch());
          dispatch(fetchMainCatalogStart())
        }}
        // key={Date.now()}
      />

      <form className="catalog-search-form form-inline">
        <input
            className="form-control"
            placeholder="Поиск"
            value={localQuery}
            onChange={handleSearchChange}
            onBlur={handleSearchBlur}
        />
      </form>

      <div className="row">
        {products?.map(product => (
          <div key={`${product.id}-main`} className="col-4">
            <Card item={product} />
          </div>
        ))}
      </div>
      {canLoadMore && (
        <button
          className="btn btn-outline-primary"
          onClick={() => dispatch(loadMoreMainCatalog())}
          disabled={loading}
        >
          {loading ? <Loader /> : 'Загрузить ещё'}
        </button>
      )}
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

export default CatalogPage;
