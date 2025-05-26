// src/components/Card.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../features/product/types';

type Props = {
    item: Product
}
const Card = ({ item }: Props) => {
  return (
    <div className="card">
        <img src={item.images[0]} className="card-img-top img-fluid" alt={item.title} />
        <div className="card-body">
            <p className="card-text">{item.title}</p>
            <p className="card-text">{item.price} руб.</p>
            <Link to={`/catalog/${item.id}`} className="btn btn-outline-primary">
              Заказать
            </Link>
        </div>
    </div>
  )
}

export default Card;
