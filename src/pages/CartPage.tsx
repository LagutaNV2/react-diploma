// src/pages/CartPage.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import type { RootState } from '../app/store';
import { removeFromCart, clearCart } from '../features/cart/cartSlice';
import { addToCart as addToCartAction } from '../features/cart/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);


  // Рассчитываем общую стоимость
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemoveItem = (itemId: number, size: string) => {
    dispatch(removeFromCart({ id: itemId, size }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь должна быть логика оформления заказа
    try {
      // Отправка данных на сервер
      dispatch(removeFromCart({ id: itemId, size }));
      dispatch(clearCart());
      navigate('/');
    } catch (error) {
      // Обработка ошибки
    }
  };

  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
      {cartItems.length === 0 ? (
        <p>Ваша корзина пуста</p>
      ) : (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Название</th>
                <th scope="col">Размер</th>
                <th scope="col">Кол-во</th>
                <th scope="col">Стоимость</th>
                <th scope="col">Итого</th>
                <th scope="col">Действия</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={`${item.id}-${item.size}`}>
                  <td scope="row">{index + 1}</td>
                  <td><Link to={`/catalog/${item.id}`}>{item.title}</Link></td>
                  <td>{item.size}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price.toLocaleString()} руб.</td>
                  <td>{(item.price * item.quantity).toLocaleString()} руб.</td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleRemoveItem(item.id, item.size)}
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={5} className="text-right">Общая стоимость</td>
                <td>{total.toLocaleString()} руб.</td>
              </tr>
            </tbody>
          </table>
          <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
              <form className="card-body" onSubmit={handleCheckout}>
                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    placeholder="+7 (XXX) XXX-XX-XX"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Адрес доставки</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    required
                  />
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="agreement"
                    required
                  />
                  <label className="form-check-label" htmlFor="agreement">
                    Согласен с правилами доставки
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-danger btn-block btn-lg"
                  disabled={cartItems.length === 0}
                >
                  Оформить
                </button>
              </form>
            </div>
          </section>
        </>
      )}
    </section>
  );
};

export default CartPage;
