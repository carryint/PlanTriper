import { useState } from 'react';
import { useAppStore, defaultTheme } from '../../store';
import { Palette, CheckCircle, XCircle, Image as ImageIcon, RotateCcw } from 'lucide-react';
import type { Service } from '../../types';

export default function AdminDashboard() {
  const { theme = defaultTheme, setTheme, services = [], updateServiceStatus, resetAll } = useAppStore();
  const [activeTab, setActiveTab] = useState<'approvals' | 'theme'>('theme');
  const [logoInput, setLogoInput] = useState(theme?.logoUrl || '');
  const [primaryColor, setPrimaryColor] = useState(theme?.primaryColor || '#3b82f6');
  const [gradientStart, setGradientStart] = useState(theme?.gradientStart || '#3b82f6');
  const [gradientEnd, setGradientEnd] = useState(theme?.gradientEnd || '#8b5cf6');

  const pendingServices = (services || []).filter(s => s && s.status === 'pending');
  const approvedServices = (services || []).filter(s => s && s.status === 'approved');

  const handleSaveTheme = () => {
    setTheme({
      logoUrl: logoInput,
      primaryColor,
      gradientStart,
      gradientEnd
    });
    alert('Theme updated successfully!');
  };

  const handleStatusChange = (id: string, status: 'approved' | 'rejected') => {
    updateServiceStatus(id, status);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-800">Admin Panel</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (confirm('Reset all demo data and theme to default?')) {
                resetAll();
                window.location.reload();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition"
            title="Reset all mock data"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Data
          </button>
          <div className="flex bg-slate-200 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('theme')}
              className={`px-4 py-2 rounded-md font-medium text-sm transition ${activeTab === 'theme' ? 'bg-white shadow text-brand' : 'text-slate-600 hover:text-slate-800'}`}
            >
              Brand & Theme
            </button>
            <button
              onClick={() => setActiveTab('approvals')}
              className={`px-4 py-2 rounded-md font-medium text-sm transition flex items-center gap-2 ${activeTab === 'approvals' ? 'bg-white shadow text-brand' : 'text-slate-600 hover:text-slate-800'}`}
            >
              Approvals
              {pendingServices.length > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{pendingServices.length}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'theme' && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 max-w-2xl">
          <div className="flex items-center gap-3 mb-6 border-b pb-4">
            <Palette className="w-6 h-6 text-brand" />
            <h2 className="text-xl font-semibold text-slate-800">Brand Customization</h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">App Logo (URL / Base64)</label>
              <div className="flex gap-3">
                <div className="w-16 h-16 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center bg-slate-50 overflow-hidden">
                  {logoInput ? <img src={logoInput} alt="Preview" className="w-full h-full object-contain" /> : <ImageIcon className="w-6 h-6 text-slate-400" />}
                </div>
                <input
                  type="text"
                  value={logoInput}
                  onChange={(e) => setLogoInput(e.target.value)}
                  placeholder="Paste image URL here..."
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand text-sm"
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">Enter any image URL or keep default for vector icon.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Primary Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
                  <span className="text-sm font-mono">{primaryColor}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Gradient Start</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={gradientStart} onChange={(e) => setGradientStart(e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
                  <span className="text-sm font-mono">{gradientStart}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Gradient End</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={gradientEnd} onChange={(e) => setGradientEnd(e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
                  <span className="text-sm font-mono">{gradientEnd}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t flex justify-end">
              <button onClick={handleSaveTheme} className="bg-brand text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition shadow-lg shadow-brand/30">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'approvals' && (
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Pending Services ({pendingServices.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingServices.map(service => (
                <ServiceCard key={service.id} service={service} onStatusChange={handleStatusChange} />
              ))}
              {pendingServices.length === 0 && (
                <p className="text-slate-500 italic">No pending applications.</p>
              )}
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Approved Services ({approvedServices.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-75">
              {approvedServices.map(service => (
                <ServiceCard key={service.id} service={service} onStatusChange={handleStatusChange} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ServiceCard({ service, onStatusChange }: { service: Service, onStatusChange: (id: string, s: 'approved'|'rejected') => void }) {
  const imageUrl = (service.images && service.images[0]) || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4">
      <img src={imageUrl} alt={service.name} className="w-24 h-24 object-cover rounded-lg shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-slate-800 truncate">{service.name}</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full capitalize shrink-0 ${service.status === 'approved' ? 'bg-green-100 text-green-700' : service.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
            {service.status}
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-2 truncate">{service.address}</p>
        <p className="text-xs text-slate-600 line-clamp-2 mb-3">{service.description}</p>
        
        {service.status === 'pending' && (
          <div className="flex gap-2">
            <button onClick={() => onStatusChange(service.id, 'approved')} className="flex-1 bg-green-500 text-white text-xs font-medium py-1.5 rounded flex items-center justify-center gap-1 hover:bg-green-600 transition">
              <CheckCircle className="w-3 h-3" /> Approve
            </button>
            <button onClick={() => onStatusChange(service.id, 'rejected')} className="flex-1 bg-red-500 text-white text-xs font-medium py-1.5 rounded flex items-center justify-center gap-1 hover:bg-red-600 transition">
              <XCircle className="w-3 h-3" /> Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
