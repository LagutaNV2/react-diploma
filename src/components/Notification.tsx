// src/components/Notification.tsx
import { useEffect, useState } from 'react';

type NotificationProps = {
  type: 'success' | 'error' | 'info';
  message: string;
  visible: boolean;
  onClose: () => void;
};

const Notification = ({ type, message, visible, onClose }: NotificationProps) => {
  console.log(`Notification rendered: ${type} - ${message}, visible: ${visible}`);
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    console.log(`Notification visibility changed: ${visible}`);
    setIsVisible(visible);
  }, [visible]);

  if (!isVisible) return null;

  // Определяем стили по типу уведомления
  const bgColor = {
    success: 'bg-success',
    error: 'bg-danger',
    info: 'bg-primary'
  }[type];

  const icon = {
    success: '✓',
    error: '⚠',
    info: 'ⓘ'
  }[type];

  console.log(`Notification: ${type} - ${message}`);

  return (
    <div
      className="position-fixed start-50 top-50 translate-middle p-3"
      style={{ zIndex: 1050, maxWidth: "90%", width: "auto" }}
    >
      <div
        className={`toast show ${bgColor} text-white`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <strong className="me-auto">{type === 'success' ? 'Успех' : type === 'error' ? 'Ошибка' : 'Информация'}</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>
        <div className="toast-body d-flex align-items-center">
          <span className="me-2 fs-5">{icon}</span>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Notification;