import React, { ErrorInfo, ReactNode } from "react";
import { ErrorPage } from "pages/ErrorPage/ErrorPage";

interface ErrorBoundaryProps {
    children: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
}

class ErrorBoundary
  extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor (props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  // eslint-disable-next-line n/handle-callback-err
  static getDerivedStateFromError (error: Error) {
    return {
      hasError: true
    };
  }

  componentDidCatch (error:Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.log(error, errorInfo);
  }

  render () {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (<ErrorPage />);
    }

    return children;
  }
}

export default ErrorBoundary;
