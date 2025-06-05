// src/pages/CartPage.tsx
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { RootState } from '../app/store';
import { removeFromCart, clearCart } from '../features/cart/cartSlice';
import Loader from '../components/Loader';
import Notification from '../components/Notification';

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [notification, setNotification] = useState<{
      type: 'success' | 'error' | 'info';
      message: string;
      visible: boolean;
    }>({ type: 'info', message: '', visible: false });

  // Рассчитываем общую стоимость
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Автоматическое скрытие уведомлений
  useEffect(() => {
    if (notification.visible) {
      const timer = setTimeout(() => {
        setNotification(prev => ({ ...prev, visible: false }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification.visible]);

  // Очистка таймаута навигации
  useEffect(() => {
  return () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
  }, []);

  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message, visible: true });
  };

  const handleRemoveItem = (itemId: number, size: string) => {
    dispatch(removeFromCart({ id: itemId, size }));
    showNotification('info', 'Товар удален из корзины');
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    // Логика оформления заказа:

    // Сбрасываем предыдущие уведомления
    setNotification(prev => ({ ...prev, visible: false }));

    // Валидация на клиенте
    if (!/^\+7\d{10}$/.test(phone)) {
      showNotification('error', 'Телефон должен быть в формате +7XXXXXXXXXX');
      return;
    }

    if (address.trim().length < 5) {
      showNotification('error', 'Введите корректный адрес (минимум 5 символов)');
      return;
    }

    if (cartItems.length === 0) {
      showNotification('error', 'Корзина пуста');
      return;
    }

    setIsSubmitting(true);

    try {
      // Отправка данных на сервер
      const orderData = {
        owner: {
          phone: phone,
          address: address
        },
        items: cartItems.map(item => ({
          id: item.id,
          price: item.price,
          count: item.quantity
        }))
      };
      const response = await fetch('http://localhost:7070/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      // Обработка успешного ответа без тела
      if (response.status === 204) {
        dispatch(clearCart());
        localStorage.removeItem('cartItems');
        showNotification('success', 'Заказ успешно оформлен!');
        navigate('/success');
        return;
      }

      if (!response.ok) {
        let errorMessage = 'Ошибка сервера';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (error) {
          // Если не удалось распарсить JSON
          console.error('Ошибка при обработке ответа сервера:', error);
          errorMessage = await response.text() || errorMessage;
        }
        throw new Error(errorMessage);
      }

      dispatch(clearCart());
      localStorage.removeItem('cartItems');
      // navigate('/success');
      showNotification('success', 'Заказ успешно оформлен!');

      if (isBrowser && timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (isBrowser) {
        timeoutRef.current = setTimeout(() => {
          navigate('/success');
        }, 3000);
      }
    } catch (error) {
      const err = error as Error;
      let message = 'Ошибка сети';
      if (error instanceof TypeError) {
        message = 'Проверьте подключение к интернету';
      } else if (error instanceof Error) {
        message = error.message;
      }

      // Доп. специфичная обработка для CORS ошибок
      if (err.message.includes('Failed to fetch') || err.message.includes('network')) {
        message = 'Ошибка CORS: Проверьте настройки сервера';
      }

      showNotification('error', `Ошибка оформления: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="cart">
      {/* Компонент уведомлений */}
      <Notification
        type={notification.type}
        message={notification.message}
        visible={notification.visible}
        onClose={() => setNotification(prev => ({ ...prev, visible: false }))}
      />
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
          <section
            className="order"
            style={{ maxWidth: '50%', margin: '0 auto' }}
          >
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Адрес доставки</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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

                <div className="position-relative">
                  <button
                    type="submit"
                    className="btn btn-danger btn-block btn-lg"
                    // Блокируем при отправке или пустой корзине
                    disabled={cartItems.length === 0 || isSubmitting}
                    // Динамически меняем прозрачность при отправке
                    style={{ opacity: isSubmitting ? 0 : 1 }}
                  >
                    Оформить
                  </button>

                  {/* Лоадер поверх кнопки */}
                  {isSubmitting && (
                    <div className="position-absolute top-50 start-50 translate-middle">
                      <Loader />
                    </div>
                  )}
                </div>
              </form>
            </div>
          </section>
        </>
      )}
    </section>
  );
};

export default CartPage;
