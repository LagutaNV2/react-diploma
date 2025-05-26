// src/components/ErrorMessage.tsx
import React from 'react';

type Props = {
  error: string | null;
  onRetry?: () => void;
};

const ErrorMessage = ({ error, onRetry }: Props) => (
  <div className="alert alert-danger">
    {error}
    {onRetry && (
      <button
        type="button"
        className="btn btn-danger btn-sm ml-2"
        onClick={onRetry}
      >
        Повторить запрос
      </button>
    )}
  </div>
);

export default ErrorMessage;
