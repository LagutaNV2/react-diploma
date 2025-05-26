// src/pages/HomePage.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import type { RootState } from '../app/store';
import Loader from '../components/Loader';
import TopSales from '../components/TopSales';
// import CatalogPage from '../pages/CatalogPage';
import Categories from '../components/Categories';
import HomePageCatalog from '../components/HomePageCatalog';
import { fetchCategoriesStart, fetchHomeCatalogStart } from '../features/catalog/catalogSlice';
import { fetchTopSalesStart } from '../features/topSales/topSalesSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state: RootState) => state.catalog);
  const { loading: topSalesLoading } = useSelector((state: RootState) => state.topSales);
  const { homeCatalog } = useSelector((state: RootState) => state.catalog);
  useEffect(() => {
    dispatch(fetchTopSalesStart());
    if (categories.length === 0) {
      dispatch(fetchCategoriesStart());
    }
    dispatch(fetchHomeCatalogStart());
  }, [dispatch]);


  return (
    <main className="container my-4">
      <section>
        <h2 className="text-center">Хиты продаж!</h2>
        {topSalesLoading ? <Loader /> : <TopSales />}
      </section>
      <section>
        <h2 className="text-center">Каталог</h2>
        <Categories
          isClickable={true}
          onCategorySelect={(categoryId) => {
          dispatch(fetchHomeCatalogStart());
          }}
          key={Date.now()}
        />
          {homeCatalog.loading ? <Loader /> : <HomePageCatalog />}
      </section>
    </main>
  );
};

export default HomePage;
