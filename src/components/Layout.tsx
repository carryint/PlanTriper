import { useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAppStore, defaultTheme } from '../store';
import { Compass, ShieldCheck, Sparkles } from 'lucide-react';

export default function Layout() {
  const { theme = defaultTheme } = useAppStore();
  const location = useLocation();

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

  const isTravelerView = location.pathname.startsWith('/traveler');
  const isAdminView = !isTravelerView;

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
          <Link to={isTravelerView ? "/traveler" : "/admin"} className="flex items-center gap-3 group shrink-0">
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

          {/* Navigation */}
          {isAdminView ? (
            <nav className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/traveler"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white/20 hover:bg-white/30 text-white transition backdrop-blur-md shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>View Traveler Site</span>
              </Link>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span className="hidden sm:inline">Admin Control Center</span>
                <span className="sm:hidden">Admin</span>
              </div>
            </nav>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-white">
                <Compass className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden sm:inline">Trip Route & Travel Planning</span>
                <span className="sm:hidden">Trip Planner</span>
              </div>
            </div>
          )}
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
          {isAdminView && (
            <div className="flex items-center gap-4 font-semibold text-slate-600">
              <Link to="/traveler" className="hover:text-blue-600">Traveler Discovery Site</Link>
              <Link to="/admin" className="hover:text-blue-600">Admin Control Center</Link>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
