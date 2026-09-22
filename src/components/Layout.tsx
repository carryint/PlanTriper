import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAppStore, defaultTheme } from '../store';
import { Compass, ShieldCheck, PlusCircle, Sparkles } from 'lucide-react';
import { ProviderRegisterModal } from './provider/ProviderRegisterModal';

export default function Layout() {
  const { theme = defaultTheme, services = [] } = useAppStore();
  const location = useLocation();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const activeTheme = theme || defaultTheme;
  const gradientStart = activeTheme.gradientStart || '#1d4ed8';
  const gradientEnd = activeTheme.gradientEnd || '#7c3aed';
  const gradientDirection = activeTheme.gradientDirection || 'to right';
  const appName = activeTheme.appName || 'PlanTriper';

  // Dynamic CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--brand-main', activeTheme.primaryColor || '#2563eb');
    root.style.setProperty('--gradient-start', gradientStart);
    root.style.setProperty('--gradient-end', gradientEnd);
  }, [activeTheme, gradientStart, gradientEnd]);

  const pendingApprovalsCount = (services || []).filter(s => s && s.status === 'pending').length;
  const isAdminView = location.pathname.includes('/admin') || location.pathname === '/' || location.pathname === '';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans antialiased">
      {/* Top Header */}
      <header
        className="text-white shadow-lg sticky top-0 z-40 transition-all duration-300"
        style={{
          background: `linear-gradient(${gradientDirection}, ${gradientStart}, ${gradientEnd})`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4 py-3">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            {activeTheme.logoUrl ? (
              <img
                src={activeTheme.logoUrl}
                alt={`${appName} Logo`}
                className="h-9 w-9 object-contain rounded-xl bg-white/20 p-1 backdrop-blur-sm"
              />
            ) : (
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm group-hover:scale-105 transition">
                <Compass className="w-6 h-6 text-white" />
              </div>
            )}
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight block leading-none">
                {appName}
              </span>
              <span className="text-[10px] text-blue-200 font-semibold tracking-wider uppercase block mt-0.5">
                Trip Route & Spots Platform
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-2 sm:gap-4">
            {/* Link to Traveler Portal */}
            <Link
              to="/traveler"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                location.pathname.includes('/traveler')
                  ? 'bg-white/25 text-white shadow-inner'
                  : 'text-white/90 hover:bg-white/15'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Traveler Site</span>
            </Link>

            {/* Link to Admin Dashboard */}
            <Link
              to="/admin"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition relative ${
                isAdminView
                  ? 'bg-white/25 text-white shadow-inner'
                  : 'text-white/90 hover:bg-white/15'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Admin Panel</span>
              {pendingApprovalsCount > 0 && (
                <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                  {pendingApprovalsCount}
                </span>
              )}
            </Link>

            {/* Top Right Action: Create Account / Add Services */}
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold px-4 py-2 rounded-xl shadow-lg shadow-black/10 text-xs sm:text-sm transition transform hover:-translate-y-0.5 shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Add Services / Provider Account</span>
              <span className="sm:hidden">Add Services</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main App Canvas */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 {appName}. Multi-Destination Trip Route & Spots Planning Platform.</p>
          <div className="flex items-center gap-4 font-semibold text-slate-600">
            <Link to="/traveler" className="hover:text-blue-600">Traveler Discovery</Link>
            <Link to="/admin" className="hover:text-blue-600">Admin Studio</Link>
            <button onClick={() => setIsRegisterModalOpen(true)} className="hover:text-amber-600">
              Provider Registration
            </button>
          </div>
        </div>
      </footer>

      {/* Provider Registration Modal (PNG, JPEG, WebP Uploads) */}
      <ProviderRegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </div>
  );
}
