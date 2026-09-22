import { useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useAppStore } from '../store';
import { LogOut, Map, LayoutDashboard, Settings } from 'lucide-react';

export default function Layout() {
  const { theme, currentUser, logout } = useAppStore();
  const navigate = useNavigate();

  // Apply dynamic theme variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--brand-main', theme.primaryColor);
    root.style.setProperty('--gradient-start', theme.gradientStart);
    root.style.setProperty('--gradient-end', theme.gradientEnd);
  }, [theme]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header 
        className="text-white shadow-md"
        style={{
          background: `linear-gradient(to right, var(--gradient-start), var(--gradient-end))`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {theme.logoUrl ? (
              <img src={theme.logoUrl} alt="PlanTriper Logo" className="h-8 w-8 object-contain" />
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
                <span className="text-sm font-medium opacity-90">
                  Welcome, {currentUser.name} ({currentUser.role})
                </span>
                
                {currentUser.role === 'admin' && (
                  <Link to="/admin" className="flex items-center gap-2 hover:opacity-80 transition">
                    <Settings className="w-4 h-4" /> Admin
                  </Link>
                )}
                {currentUser.role === 'provider' && (
                  <Link to="/provider" className="flex items-center gap-2 hover:opacity-80 transition">
                    <LayoutDashboard className="w-4 h-4" /> Provider Dashboard
                  </Link>
                )}
                {currentUser.role === 'traveler' && (
                  <Link to="/traveler" className="flex items-center gap-2 hover:opacity-80 transition">
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
