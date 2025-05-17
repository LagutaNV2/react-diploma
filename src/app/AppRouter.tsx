// src/app/AppRouter.tsx
import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import CatalogPage from '../pages/CatalogPage'
import AboutPage from '../pages/AboutPage'
import ContactsPage from '../pages/ContactsPage'
import NotFoundPage from '../pages/NotFoundPage'

const AppRouter = () => {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
  )
}

export default AppRouter
