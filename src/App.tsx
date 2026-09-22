import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store';
import { seedUsers, seedServices, seedPlans } from './data/seed';
import Layout from './components/Layout';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import TravelerDashboard from './pages/traveler/TravelerDashboard';
import ProviderDashboard from './pages/provider/ProviderDashboard';

function App() {
  const { plans, addPlan, services, addService } = useAppStore();

  // Bootstrap seed data if store is empty
  useEffect(() => {
    if (plans.length === 0) {
      seedPlans.forEach(plan => addPlan(plan));
    }
    if (services.length === 0) {
      seedServices.forEach(service => addService(service));
    }
  }, [plans.length, services.length, addPlan, addService]);

  return (
    <BrowserRouter>
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
