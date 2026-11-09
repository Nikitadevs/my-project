import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Portfolio error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-page">
          <p className="eyebrow">Something went wrong</p>
          <h1>Let’s try that again.</h1>
          <p>The page could not be displayed. Refreshing should get you back on track.</p>
          <button className="button button-primary" type="button" onClick={() => window.location.reload()}>
            Refresh page
          </button>
        </main>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
