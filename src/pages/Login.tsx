import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { seedUsers } from '../data/seed';
import { Map, MapPin } from 'lucide-react';

export default function Login() {
  const { login } = useAppStore();
  const navigate = useNavigate();

  const handleLogin = (userId: string) => {
    const user = seedUsers.find(u => u.id === userId);
    if (user) {
      login(user);
      if (user.role === 'admin') navigate('/admin');
      if (user.role === 'provider') navigate('/provider');
      if (user.role === 'traveler') navigate('/traveler');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center text-white mb-4 shadow-lg shadow-brand/30">
            <Map className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">PlanTriper</h1>
          <p className="text-slate-500 text-center mt-2">
            Plan your next trip route and spots easily.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold text-slate-600 mb-2 uppercase tracking-wider">Demo Login</p>
          
          {seedUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => handleLogin(user.id)}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-brand hover:bg-brand/5 transition group"
            >
              <div className="flex flex-col items-start">
                <span className="font-semibold text-slate-700 group-hover:text-brand">{user.name}</span>
                <span className="text-xs text-slate-500 capitalize">{user.role}</span>
              </div>
              <MapPin className="w-5 h-5 text-slate-300 group-hover:text-brand" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
