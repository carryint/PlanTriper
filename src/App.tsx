import { Component, type ErrorInfo, type ReactNode, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store';
import { seedServices, seedPlans } from './data/seed';
import Layout from './components/Layout';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import TravelerDashboard from './pages/traveler/TravelerDashboard';
import ProviderDashboard from './pages/provider/ProviderDashboard';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('PlanTriper Error Caught:', error, errorInfo);
  }

  handleReset = () => {
    localStorage.clear();
    window.location.href = window.location.pathname;
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-xl border border-red-100 text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
              !
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Something went wrong</h2>
            <p className="text-xs text-red-600 font-mono bg-red-50 p-3 rounded-lg mb-4 text-left overflow-auto max-h-32">
              {this.state.error?.message || 'Unknown error occurred'}
            </p>
            <button
              onClick={this.handleReset}
              className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Reset Storage & Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const { plans, addPlan, services, addService } = useAppStore();
  const initialized = useRef(false);

  // Bootstrap seed data once if store is empty
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    try {
      seedPlans.forEach((plan) => {
        if (!plans || !plans.some((p) => p && p.id === plan.id)) {
          addPlan(plan);
        }
      });

      seedServices.forEach((service) => {
        if (!services || !services.some((s) => s && s.id === service.id)) {
          addService(service);
        }
      });
    } catch (e) {
      console.error('Error seeding data:', e);
    }
  }, [plans, services, addPlan, addService]);

  return (
    <ErrorBoundary>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="admin/*" element={<AdminDashboard />} />
            <Route path="traveler/*" element={<TravelerDashboard />} />
            <Route path="provider/*" element={<ProviderDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </ErrorBoundary>
  );
}

export default App;
