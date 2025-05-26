// src/components/Catalog.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { fetchProducts, loadMore } from '../features/catalog/catalogSlice';
import ProductPage from '../pages/ProductPage';

const Catalog = () => {
  const dispatch = useDispatch();
  const { products, status, canLoadMore } = useSelector((state: RootState) => state.catalog);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      {/* Список товаров */}
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-4">
            <ProductPage product={product} />
          </div>
        ))}
      </div>
      {canLoadMore && (
        <button
          className="btn btn-outline-primary"
          onClick={() => dispatch(loadMore())}
          disabled={status === 'loading'}
        >
          Загрузить ещё
        </button>
      )}
    </div>
  );
};
