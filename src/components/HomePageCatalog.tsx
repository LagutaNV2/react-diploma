//src/components/HomePageCatalog.tsx
import { useEffect, useState, useRef  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../app/store';
import { fetchHomeCatalogStart, loadMoreHomeCatalog } from '../features/catalog/catalogSlice';
import Card from './Card';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

const MIN_LOADER_DISPLAY_TIME = 500;

const HomePageCatalog = () => {
  const [loadingMore, setLoadingMore] = useState(false); //
  const loaderTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dispatch = useDispatch();
  const { products, loading, error, canLoadMore } = useSelector(
    (state: RootState) => state.catalog.homeCatalog
  );

   useEffect(() => { //
      return () => {
        if (loaderTimeoutRef.current) {
          clearTimeout(loaderTimeoutRef.current);
        }
      };
    }, []);

  const handleLoadMore = async () => { //
    if (loadingMore || !canLoadMore) return;

    console.log('------handleLoadMore called---------');
    const startTime = Date.now();
    setLoadingMore(true);

    try {
      await dispatch(loadMoreHomeCatalog());
    } finally {
      // Вычисляем оставшееся время для минимальной демонстрации лоадера
      const elapsedTime = Date.now() - startTime;
      const remainingTime = MIN_LOADER_DISPLAY_TIME - elapsedTime;

      if (remainingTime > 0) {
        loaderTimeoutRef.current = setTimeout(() => { //
          setLoadingMore(false);
        }, remainingTime);
      } else {
        setLoadingMore(false);
      }
    }
  };

  useEffect(() => {
    if (!products.length && !loading) {
      dispatch(fetchHomeCatalogStart());
    }
  }, [dispatch, products.length, loading]);

  if (loading && !products.length) return <Loader />;
  if (error) return <ErrorMessage error={error} onRetry={() => dispatch(fetchHomeCatalogStart())} />;

  return (
    <div>
      <div className="row">
        {products.map((product) => (
          <div key={`${product.id}-home`} className="col-12 col-md-6 col-lg-4 mb-4">
            <Card item={product} />
          </div>
        ))}
      </div>
      <div className="text-center">
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

    </div>
  );
};

export default HomePageCatalog;
