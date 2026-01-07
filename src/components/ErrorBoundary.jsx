import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log error to analytics in production
    if (import.meta.env.PROD) {
      console.error('Error Boundary caught an error:', error, errorInfo);
      // You can also send to error tracking service like Sentry
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full bg-gray-800 rounded-lg border border-red-600 p-8 text-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mb-6"
            >
              <AlertTriangle size={64} className="text-red-500 mx-auto" />
            </motion.div>

            <h1 className="text-2xl font-bold text-white mb-4">
              Oops! Something went wrong
            </h1>
            
            <p className="text-gray-300 mb-6">
              {this.props.fallbackMessage || 
               "We're sorry for the inconvenience. The application encountered an unexpected error."}
            </p>

            {import.meta.env.DEV && this.state.error && (
              <details className="text-left bg-gray-900 p-4 rounded mb-6 text-sm">
                <summary className="cursor-pointer text-red-400 mb-2">
                  Error Details (Development Only)
                </summary>
                <pre className="text-red-300 whitespace-pre-wrap text-xs overflow-auto max-h-32">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div className="flex gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={this.handleReload}
                className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                <RefreshCw size={18} />
                Reload Page
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={this.handleGoHome}
                className="flex items-center gap-2 border border-gray-600 hover:border-primary text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                <Home size={18} />
                Go Home
              </motion.button>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallbackMessage: PropTypes.string
};

export default ErrorBoundary;

// Higher-order component for wrapping components with error boundaries
export const withErrorBoundary = (WrappedComponent, fallbackMessage) => {
  const WithErrorBoundaryComponent = function(props) {
    return (
      <ErrorBoundary fallbackMessage={fallbackMessage}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };

  WithErrorBoundaryComponent.displayName = `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithErrorBoundaryComponent;
};

// Async error boundary for handling Promise rejections
export const AsyncErrorBoundary = ({ children, fallback }) => {
  const [hasError, setHasError] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const handleUnhandledRejection = (event) => {
      setError(event.reason);
      setHasError(true);
      event.preventDefault();
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  if (hasError) {
    return fallback ? fallback(error) : (
      <ErrorBoundary fallbackMessage="An async operation failed unexpectedly.">
        <div>Async Error Occurred</div>
      </ErrorBoundary>
    );
  }

  return children;
};

AsyncErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.func
};