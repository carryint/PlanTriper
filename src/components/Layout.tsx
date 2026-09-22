import { useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useAppStore, defaultTheme } from '../store';
import { LogOut, Map, LayoutDashboard, Settings } from 'lucide-react';

export default function Layout() {
  const { theme = defaultTheme, currentUser, logout } = useAppStore();
  const navigate = useNavigate();

  // Apply dynamic theme variables safely
  useEffect(() => {
    const root = document.documentElement;
    const activeTheme = theme || defaultTheme;
    root.style.setProperty('--brand-main', activeTheme.primaryColor || '#3b82f6');
    root.style.setProperty('--gradient-start', activeTheme.gradientStart || '#3b82f6');
    root.style.setProperty('--gradient-end', activeTheme.gradientEnd || '#8b5cf6');
  }, [theme]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const activeTheme = theme || defaultTheme;
  const gradientStart = activeTheme.gradientStart || '#3b82f6';
  const gradientEnd = activeTheme.gradientEnd || '#8b5cf6';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header 
        className="text-white shadow-md transition-colors"
        style={{
          background: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {activeTheme.logoUrl ? (
              <img src={activeTheme.logoUrl} alt="PlanTriper Logo" className="h-8 w-8 object-contain rounded" />
            ) : (
              <Map className="w-8 h-8" />
            )}
            <Link to="/" className="text-xl font-bold tracking-wide">
              PlanTriper
            </Link>
          </div>
          
          <nav className="flex items-center gap-6">
            {currentUser ? (
              <>
                <span className="text-sm font-medium opacity-90 hidden sm:inline">
                  Welcome, {currentUser.name} ({currentUser.role})
                </span>
                
                {currentUser.role === 'admin' && (
                  <Link to="/admin" className="flex items-center gap-2 hover:opacity-80 transition text-sm font-medium">
                    <Settings className="w-4 h-4" /> Admin
                  </Link>
                )}
                {currentUser.role === 'provider' && (
                  <Link to="/provider" className="flex items-center gap-2 hover:opacity-80 transition text-sm font-medium">
                    <LayoutDashboard className="w-4 h-4" /> Provider
                  </Link>
                )}
                {currentUser.role === 'traveler' && (
                  <Link to="/traveler" className="flex items-center gap-2 hover:opacity-80 transition text-sm font-medium">
                    <LayoutDashboard className="w-4 h-4" /> My Plans
                  </Link>
                )}
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded transition text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <Link to="/" className="text-sm font-semibold hover:underline">Login</Link>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
