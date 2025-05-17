// src/pages/NotFoundPage.tsx
import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <section className="top-sales">
      <h2 className="text-center">Страница не найдена</h2>
      <p>
        Извините, такая страница не найдена! Вернитесь на{' '}
        <Link to="/" className="btn btn-link p-0">
          главную страницу
        </Link>
        .
      </p>
    </section>
  )
}

export default NotFoundPage
