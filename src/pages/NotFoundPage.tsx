// src/pages/NotFoundPage.tsx
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <section className="top-sales">
      <div className="empty-state">
        <div className="text-center py-5">
          <div className="empty-state-content">
            <div className="empty-state-icon">
              <i className="fas fa-shoe-prints fa-4x text-primary mb-4"></i>
            </div>
            <h2 className="empty-state-title">Упс!</h2>
            <p className="empty-state-text">
              Страница не найдена.<br />
              Возможно, она была удалена или вы ввели неправильный адрес.
            </p>
            <Link to="/" className="btn btn-primary mt-3">
              <i className="fas fa-store me-2"></i>
              Вернуться в магазин
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NotFoundPage