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

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger">
          Произошла ошибка в приложении. Попробуйте перезагрузить страницу.
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
