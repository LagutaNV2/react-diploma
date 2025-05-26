// src/components/CartIcon.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';

const CartIcon = () => {
  // const itemCount = useSelector((state: RootState) => state.cart.items.length)
  // Пример количества товаров в корзине
  const itemCount = 5;

  return (
    <div className="header-controls-pic header-controls-cart">
      {/* Индикатор количества товаров */}
      {itemCount > 0 && (
        <div className="header-controls-cart-full">{itemCount}</div>
      )}
      {/* Иконка корзины */}
      <div className="header-controls-cart-menu"></div>
    </div>
  )
}

export default CartIcon
