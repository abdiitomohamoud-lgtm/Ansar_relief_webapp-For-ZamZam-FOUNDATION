import React, { Component } from 'react';
import ErrorAlert from './ErrorAlert';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4">
          <ErrorAlert 
            message="Something went wrong!"
            details={this.state.error?.toString()}
          />
          {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
            <details style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>
              {this.state.errorInfo.componentStack}
            </details>
          )}
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
