// src/pages/SuccessPage.tsx
import { Link } from 'react-router-dom';

console.log('SuccessPage component rendered');
const SuccessPage = () => (
  <div className="alert alert-success text-center mt-5">
    <h2>Заказ успешно оформлен!</h2>
    <Link to="/" className="btn btn-link">
      Вернуться на главную
    </Link>
  </div>
);
export default SuccessPage;
