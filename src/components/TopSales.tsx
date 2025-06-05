// src/components/TopSales.tsx
import { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../app/store';
import { fetchTopSalesStart } from '../features/topSales/topSalesSlice';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import Card from './Card';
import type { Product } from '../features/product/types';

const TopSales = () => {
  const { items, status, error } = useSelector((state: RootState) => ({
    items: state.topSales.items as Product[],
    status: state.topSales.status,
    error: state.topSales.error
  }));
  
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Dispatching top sales...');
    if (status === 'idle' && items.length === 0) {
      dispatch(fetchTopSalesStart());
    }
  }, [dispatch, status, items.length]);

  if (status === 'loading') return <Loader />;
  if (status === 'failed') return
    <ErrorMessage
      error={error}
      onRetry={() => dispatch(fetchTopSalesStart())}
    />;

  if (!items.length) return null;

  return (
    <div>
      {/* <h2 className="text-center">Хиты продаж!аааа</h2> */}
      <div className="row">
        {items.map((item) => (
          <div key={`${item.id}-top-sale`} className="col-4">
            <Card item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSales;
