// src/components/SuccessState.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface SuccessStateProps {
  title: string;
  message: string;
  buttonText: string;
}

console.log('-+--+--+-- SuccessState component rendered -+--+--+--');

const SuccessState: React.FC<SuccessStateProps> = ({ title, message, buttonText }) => (
  <div className="success-state">
    <div className="success-content text-center">
      <div className="success-page">
          <div className="success-animation">
            <div className="success-checkmark">
              <div className="check-icon">
                <span className="icon-line line-tip"></span>
                <span className="icon-line line-long"></span>
                <div className="icon-circle"></div>
                <div className="icon-fix"></div>
              </div>
            </div>
          </div>

          <div className="success-content text-center">
            <h1 className="success-title">{title}</h1>
            <p className="success-message">{message}</p>

            <div className="success-actions mt-4">
              <Link to="/" className="btn btn-success btn-lg">
                <i className="fas fa-home me-2"></i>
                {buttonText}
              </Link>
            </div>

            <div className="success-celebration mt-5">
              <i className="fas fa-confetti success-confetti confetti-1"></i>
              <i className="fas fa-star success-confetti confetti-2"></i>
              <i className="fas fa-heart success-confetti confetti-3"></i>
            </div>
          </div>
        </div>
    </div>
  </div>
);


export default SuccessState;