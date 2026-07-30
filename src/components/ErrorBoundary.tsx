import { Component, ErrorInfo, ReactNode } from 'react';
import { log } from '../utils/logger';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    log.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400 text-sm font-mono m-4">
          <h2>[Error Boundary] Une erreur inattendue est survenue dans cette section.</h2>
        </div>
      );
    }

    return this.props.children;
  }
}
