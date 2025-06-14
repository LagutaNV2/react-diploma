// src/components/ErrorBoundary.tsx
import React from 'react'

type Props = {
  children: React.ReactNode
}

type State = {
  hasError: boolean
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  // static getDerivedStateFromError(_: Error): State {
  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('!!!Error caught by boundary:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="top-sales">
          <div className="empty-state">
            <div className="text-center py-5">
              <div className="empty-state-content">
                <div className="empty-state-icon">
                  <i className="fas fa-exclamation-triangle fa-4x text-warning mb-4"></i>
                </div>
                <h2 className="empty-state-title">Упс! Произошла ошибка</h2>
                <p className="empty-state-text">
                  Приложение столкнулось с непредвиденной проблемой.<br />
                  Пожалуйста, попробуйте перезагрузить страницу.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="btn btn-primary mt-3"
                >
                  <i className="fas fa-redo me-2"></i>
                  Перезагрузить страницу
                </button>
              </div>
            </div>
          </div>
      </section>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
