import { useAppStore } from '../../store';
import { PlusCircle, Building, MapPin, Star } from 'lucide-react';

export default function ProviderDashboard() {
  const { services, currentUser } = useAppStore();
  const myServices = services.filter(s => s.providerId === currentUser?.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Provider Portal</h1>
          <p className="text-slate-500">Manage your listings and bookings</p>
        </div>
        <button className="bg-brand text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:opacity-90 flex items-center gap-2">
          <PlusCircle className="w-4 h-4" /> Add New Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myServices.map(service => (
          <div key={service.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
            <div className="h-40 relative">
              <img src={service.images[0]} alt={service.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2">
                <span className={`text-xs font-semibold px-2 py-1 rounded shadow capitalize ${
                  service.status === 'approved' ? 'bg-green-500 text-white' : 
                  service.status === 'pending' ? 'bg-amber-500 text-white' : 'bg-red-500 text-white'
                }`}>
                  {service.status}
                </span>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-800">{service.name}</h3>
                <span className="flex items-center text-xs font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                  <Star className="w-3 h-3 fill-current mr-1" /> {service.googleRating}
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1 mb-2">
                <MapPin className="w-3 h-3" /> {service.address}
              </p>
              <p className="text-sm text-slate-600 line-clamp-2 flex-1 mb-4">{service.description}</p>
              
              <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs font-medium text-slate-500">
                <span className="capitalize flex items-center gap-1">
                  <Building className="w-3 h-3" /> {service.type}
                </span>
                <span>{service.contact}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
