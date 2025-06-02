// src/pages/HomePage.tsx
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import type { RootState } from '../app/store';
import Loader from '../components/Loader';
import TopSales from '../components/TopSales';
import Categories from '../components/Categories';
import ErrorMessage from '../components/ErrorMessage';
import HomePageCatalog from '../components/HomePageCatalog';
import {
  selectCategory,
  fetchCategoriesSuccess,
  fetchCategoriesStart,
  fetchHomeCatalogStart
} from '../features/catalog/catalogSlice';
import { fetchTopSalesStart } from '../features/topSales/topSalesSlice';



const HomePage = () => {
  const dispatch = useDispatch();
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError
  } = useSelector((state: RootState) => state.catalog);

  const {
    items: topSales,
    loading: topSalesLoading,
    error: topSalesError
  } = useSelector((state: RootState) => state.topSales);

  // Состояния для каталога на главной
  const {
    homeCatalog
  } = useSelector((state: RootState) => state.catalog);

  // Загрузка категорий при монтировании
  useEffect(() => {
    if (categories.length === 0 && !categoriesLoading && !categoriesError) {
      dispatch(fetchCategoriesStart());
    }
  }, [dispatch, categories, categoriesLoading, categoriesError]);

  // Загрузка хитов продаж при монтировании
  useEffect(() => {
    if (topSales.length === 0 && !topSalesLoading && !topSalesError) {
      dispatch(fetchTopSalesStart());
    }
  }, [dispatch, topSales, topSalesLoading, topSalesError]);

  // Загрузка каталога при монтировании и изменении категории
  useEffect(() => {
    // Добавляем проверку на наличие загруженных категорий
    if (categories.length > 0 || categoriesError) {
      dispatch(fetchHomeCatalogStart());
    }
  }, [dispatch, categories, categoriesError]);

  return (
    <main className="container my-4">
      <section>
        <h2 className="text-center">Хиты продаж!</h2>
        {/* {topSalesLoading ? <Loader /> : <TopSales />} */}
        {topSalesLoading ? (
          <Loader />
        ) : topSalesError ? (
          <ErrorMessage
            error={topSalesError}
            onRetry={() => dispatch(fetchTopSalesStart())}
          />
        ) : topSales.length > 0 ? (
          <TopSales />
        ) : null}
      </section>
      <section>
        <h2 className="text-center">Каталог</h2>
        <Categories
          isClickable={true}
          onCategorySelect={(categoryId) => {
          dispatch(selectCategory(categoryId));
          }}
          // key={Date.now()}
        />
          {/* {homeCatalog.loading ? <Loader /> : <HomePageCatalog />} */}

           {homeCatalog.loading ? (
          <Loader />
        ) : homeCatalog.error ? (
          <ErrorMessage
            error={homeCatalog.error}
            onRetry={() => dispatch(fetchHomeCatalogStart())}
          />
        ) : (
          <HomePageCatalog />
        )}
      </section>
    </main>
  );
};

export default HomePage;
