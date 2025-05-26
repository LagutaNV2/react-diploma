// src/pages/ProductPage.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../app/store';
import {
  fetchProductFailure,
  fetchProductStart,
  fetchProductSuccess,
  resetProductState,
  setSize,
  incrementQuantity,
  decrementQuantity
} from '../features/product/productSlice';
import { addToCart } from '../features/cart/cartSlice';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, error, selectedSize, quantity } = useSelector(
    (state: RootState) => state.product
  );
  const [localQuantity, setLocalQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductStart({ id: Number(id) }));
    }
    return () => {
      dispatch(resetProductState());
    };
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!product || !selectedSize) return;

    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      quantity: localQuantity
    };

    dispatch(addToCart(cartItem));
    navigate('/cart');
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;
  if (!product) return <div>Товар не найден</div>;

  const availableSizes = product.sizes.filter(size => size.available);

  return (
    <section className="catalog-item">
      <h2 className="text-center">{product.title}</h2>
      <div className="row">
        <div className="col-5">
          <img
            src={product.images[0]}
            className="img-fluid"
            alt={product.title}
            style={{ height: '400px', objectFit: 'cover' }}
          />
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>{product.sku || '-'}</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>{product.manufacturer || '-'}</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>{product.color || '-'}</td>
              </tr>
              <tr>
                <td>Материал</td>
                <td>{product.material || '-'}</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>{product.season || '-'}</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>{product.reason || '-'}</td>
              </tr>
            </tbody>
          </table>
          {/* Блок выбора размера */}
          {availableSizes.length > 0 && (
            <div className="text-center">
              <p>Размеры</p>
              <div className="size-selector">
                  {availableSizes.map(size => (
                    <button
                      key={size.size}
                      className={`btn btn-outline-secondary m-1 ${
                        selectedSize === size.size ? 'active' : ''
                      }`}
                      onClick={() => dispatch(setSize(size.size))}
                    >
                      {size.size}
                    </button>
                  ))}
              </div>

              {/* Блок выбора количества */}
              <div className="quantity-selector my-3">
                <button
                  className="btn btn-dark"
                  onClick={() => setLocalQuantity(Math.max(1, localQuantity - 1))}
                >
                  -
                </button>
                <span className="mx-3">{localQuantity}</span>
                <button
                  className="btn btn-dark"
                  onClick={() => setLocalQuantity(Math.min(10, localQuantity + 1))}
                >
                  +
                </button>
              </div>

              {/* Кнопка добавления в корзину */}
                <button
                  className="btn btn-danger btn-block btn-lg"
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                >
                  В корзину
                </button>
            </div>
          )}

          {availableSizes.length === 0 && (
            <p className="text-center">Нет доступных размеров</p>
          )}

        </div>
      </div>
    </section>
  );
};

export default ProductPage;
