import { useState } from 'react';
import { useAppStore } from '../../store';
import { Settings, Palette, CheckCircle, XCircle, Image as ImageIcon } from 'lucide-react';
import { Service } from '../../types';

export default function AdminDashboard() {
  const { theme, setTheme, services, updateServiceStatus } = useAppStore();
  const [activeTab, setActiveTab] = useState<'approvals' | 'theme'>('theme');
  const [logoInput, setLogoInput] = useState(theme.logoUrl || '');
  const [primaryColor, setPrimaryColor] = useState(theme.primaryColor);
  const [gradientStart, setGradientStart] = useState(theme.gradientStart);
  const [gradientEnd, setGradientEnd] = useState(theme.gradientEnd);

  const pendingServices = services.filter(s => s.status === 'pending');
  const approvedServices = services.filter(s => s.status === 'approved');

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
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand"
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">In a real app, this would be a file upload button that saves to an S3 bucket.</p>
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
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4">
      <img src={service.images[0]} alt={service.name} className="w-24 h-24 object-cover rounded-lg" />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-slate-800">{service.name}</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${service.status === 'approved' ? 'bg-green-100 text-green-700' : service.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
            {service.status}
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-2">{service.address}</p>
        <p className="text-xs text-slate-600 line-clamp-2 mb-3">{service.description}</p>
        
        {service.status === 'pending' && (
          <div className="flex gap-2">
            <button onClick={() => onStatusChange(service.id, 'approved')} className="flex-1 bg-green-500 text-white text-xs font-medium py-1.5 rounded flex items-center justify-center gap-1 hover:bg-green-600">
              <CheckCircle className="w-3 h-3" /> Approve
            </button>
            <button onClick={() => onStatusChange(service.id, 'rejected')} className="flex-1 bg-red-500 text-white text-xs font-medium py-1.5 rounded flex items-center justify-center gap-1 hover:bg-red-600">
              <XCircle className="w-3 h-3" /> Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
