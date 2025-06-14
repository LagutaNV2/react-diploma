// src/components/EmptyState.tsx
import { Link } from 'react-router-dom';

// console.log('-----------EmptyState component rendered-------');
const EmptyState = () => (
  <div className="empty-state">
    <div className="text-center py-5">
      <div className="empty-state-content">
        <div className="empty-state-icon">
          <i className="fas fa-search fa-4x text-primary mb-4"></i>
        </div>
        <h2 className="empty-state-title">Ой, здесь пусто!</h2>
        <p className="empty-state-text">
          Мы искали повсюду, но не нашли товаров по вашему запросу.<br />
          Попробуйте изменить критерии поиска или вернитесь на главную.
        </p>
        <Link to="/" className="btn btn-primary mt-3">
          <i className="fas fa-home me-2"></i>
          Вернуться на главную
        </Link>
      </div>
    </div>
  </div>
);

export default EmptyState;