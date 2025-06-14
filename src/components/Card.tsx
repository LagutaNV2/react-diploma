// src/components/Card.tsx
import { Link } from 'react-router-dom';
import type { Product } from '../features/product/types';

type Props = {
  item: Product
}

const Card = ({ item }: Props) => {
  // console.log('Card component loaded with item:', item);
  return (
    <div className="card">
        <div className="image-box">
          <img src={item.images[0]}
              alt={item.title}
              className="img-fluid" />
        </div>
        <div className="card-body">
            <h6 className="card-title">{item.title}</h6>
            <p className="card-text">{item.price.toLocaleString()} руб.</p>
            <Link to={`/catalog/${item.id}`}
              className="btn btn-outline-primary mt-auto">
                Заказать
            </Link>
        </div>
    </div>
  )
}

export default Card;
