// src/pages/ProductPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../app/store';
import {
  fetchProductFailure,
  fetchProductStart,
  fetchProductSuccess,
} from '../features/product/productSlice';
import { addToCart } from '../features/cart/cartSlice';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductStart({ id: Number(id) }));
    }
    return () => {
      dispatch(resetProductState());
    };
  }, [dispatch, id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;
  if (!product) return <div>Товар не найден</div>;

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
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
