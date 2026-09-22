import { useAppStore } from '../../store';
import { Map, Plane, Bus, Navigation, Star } from 'lucide-react';

export default function TravelerDashboard() {
  const { plans, currentUser } = useAppStore();
  const myPlans = plans.filter(p => p.travelerId === currentUser?.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">My Trips</h1>
          <p className="text-slate-500">Plan and track your adventures</p>
        </div>
        <button className="bg-brand text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:opacity-90 flex items-center gap-2">
          <Map className="w-4 h-4" /> New AI Trip Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <Plane className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Flights Saved</p>
            <p className="text-xl font-bold">120 pts</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <Bus className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Bus / Van Points</p>
            <p className="text-xl font-bold">45 pts</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Total Rewards</p>
            <p className="text-xl font-bold">{currentUser?.points || 0}</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-slate-800 mb-4">Saved Plans</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {myPlans.map(plan => (
          <div key={plan.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
            <div className="bg-slate-50 p-4 border-b flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg text-slate-800">{plan.name}</h3>
                <p className="text-xs text-slate-500">{plan.startDate} to {plan.endDate}</p>
              </div>
              <span className="bg-brand/10 text-brand text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                {plan.status}
              </span>
            </div>
            <div className="p-4 space-y-4">
              {plan.itinerary.map(day => (
                <div key={day.id}>
                  <p className="text-sm font-semibold text-slate-700 mb-2 border-b pb-1">{new Date(day.date).toDateString()}</p>
                  <div className="space-y-3 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                    {day.items.map(item => (
                      <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-brand bg-white z-10 shrink-0 mx-2 md:mx-auto"></div>
                        <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-lg border border-slate-100 shadow-sm bg-white">
                          <div className="flex justify-between mb-1">
                            <span className="text-xs font-bold text-brand">{item.time}</span>
                            <span className="text-xs font-medium text-slate-500">₹{item.cost}</span>
                          </div>
                          <h4 className="font-semibold text-sm text-slate-800">{item.location}</h4>
                          <p className="text-xs text-slate-600 mt-1">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 p-4 border-t flex justify-between items-center text-sm font-medium">
              <span className="text-slate-500">Est. Total Expenses</span>
              <span className="text-lg text-slate-800">₹{plan.totalExpenses}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
