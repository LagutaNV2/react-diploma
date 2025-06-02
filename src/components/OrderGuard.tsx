// components/OrderGuard.tsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const OrderGuard = ({ children }) => {
  const orderCompleted = useSelector((state: RootState) => state.order.completed);

  if (!orderCompleted) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default OrderGuard;
