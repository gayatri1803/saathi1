import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentCatch(error, errorInfo) {
        this.setState({ errorInfo });
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '2rem', color: 'red', fontFamily: 'sans-serif', background: '#fffeb', minHeight: '100vh' }}>
                    <h2>Application Error Detected.</h2>
                    <details style={{ whiteSpace: 'pre-wrap', marginTop: '1rem', background: '#ffe4e6', padding: '1rem', border: '1px solid #fecdd3' }}>
                        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Click for Detailed Component Stack Trace</summary>
                        <p>{this.state.error && this.state.error.toString()}</p>
                        <p>{this.state.errorInfo && this.state.errorInfo.componentStack}</p>
                    </details>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
