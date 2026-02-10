import React from 'react';

/**
 * Error Boundary component for graceful error handling in the gallery
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('Gallery Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      const { fallback: Fallback } = this.props;
      
      if (Fallback) {
        return <Fallback error={this.state.error} retry={this.handleRetry} />;
      }

      // Default error UI
      return (
        <div 
          style={{
            padding: '20px',
            textAlign: 'center',
            background: 'var(--surface-color)',
            borderRadius: '10px',
            border: '1px solid var(--border-color)',
            margin: '20px 0'
          }}
        >
          <h3 style={{ color: 'var(--text-color)', marginBottom: '10px' }}>
            Gallery Error
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>
            Something went wrong while loading the gallery. Please try again.
          </p>
          <button
            onClick={this.handleRetry}
            className="btn btn-primary"
            style={{ fontSize: '0.9rem', padding: '8px 16px' }}
          >
            Retry
          </button>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ marginTop: '15px', textAlign: 'left' }}>
              <summary style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}>
                Error Details (Development)
              </summary>
              <pre style={{ 
                background: '#f5f5f5', 
                padding: '10px', 
                borderRadius: '5px',
                fontSize: '0.8rem',
                overflow: 'auto',
                marginTop: '10px'
              }}>
                {this.state.error && this.state.error.toString()}
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;