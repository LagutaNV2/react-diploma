// src/components/CartIcon.tsx
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from '../app/store';

const CartIcon = () => {
  const itemCount = useSelector((state: RootState) => state.cart.items.length)
  // console.log('<<<< CartIcon component rendered >>>>>');
  return (
    <Link to="/cart"  className="header-controls-pic header-controls-cart">
      {/* Индикатор количества товаров */}
      {itemCount > 0 && (
        <div className="header-controls-cart-full">{itemCount}</div>
      )}
      {/* Иконка корзины */}
      <div className="header-controls-cart-menu"></div>
    </Link>
  )
}

export default CartIcon
