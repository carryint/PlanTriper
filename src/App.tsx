import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store';
import { seedServices, seedPlans } from './data/seed';
import Layout from './components/Layout';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import TravelerDashboard from './pages/traveler/TravelerDashboard';
import ProviderDashboard from './pages/provider/ProviderDashboard';

function App() {
  const { plans, addPlan, services, addService } = useAppStore();
  const initialized = useRef(false);

  // Bootstrap seed data once if store is empty without duplicate keys
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    seedPlans.forEach((plan) => {
      if (!plans.some((p) => p.id === plan.id)) {
        addPlan(plan);
      }
    });

    seedServices.forEach((service) => {
      if (!services.some((s) => s.id === service.id)) {
        addService(service);
      }
    });
  }, [plans, services, addPlan, addService]);

  return (
    <BrowserRouter basename="/PlanTriper">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="admin/*" element={<AdminDashboard />} />
          <Route path="traveler/*" element={<TravelerDashboard />} />
          <Route path="provider/*" element={<ProviderDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
