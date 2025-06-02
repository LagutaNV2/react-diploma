// src/components/SuccessPage.tsx
import SuccessState from './SuccessState';

console.log('SuccessPage component rendered');
const SuccessPage = () => (
  <div className="success-page">
    <div className="container">
      <div className="state-container">
        <SuccessState
          title="Заказ оформлен успешно!"
          message="Наши менеджеры свяжутся с Вами в течение дня."
          buttonText="Вернуться на главную"
        />
      </div>
    </div>
  </div>
);

export default SuccessPage;
