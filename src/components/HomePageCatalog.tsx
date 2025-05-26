//src/components/HomePageCatalog.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../app/store';
import { fetchHomeCatalogStart } from '../features/catalog/catalogSlice';
import Card from './Card';
import Loader from './Loader';
import { loadMoreHomeCatalog } from '../features/catalog/catalogSlice';

const HomePageCatalog = () => {
  const dispatch = useDispatch();
  const { products, loading, error, canLoadMore } = useSelector(
    (state: RootState) => state.catalog.homeCatalog
  );

  useEffect(() => {
    if (!products.length && !loading) {
      dispatch(fetchHomeCatalogStart());
    }
  }, [dispatch, products.length, loading]);

  if (loading) return <Loader />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <div className="row">
        {products.map((product) => (
          <div key={`${product.id}-home`} className="col-4">
            <Card item={product} />
          </div>
        ))}
      </div>
      {canLoadMore && (
        <button
          className="btn btn-outline-primary"
          onClick={() => dispatch(loadMoreHomeCatalog())}
        >
          Загрузить ещё
        </button>
      )}
    </div>
  );
};

export default HomePageCatalog;