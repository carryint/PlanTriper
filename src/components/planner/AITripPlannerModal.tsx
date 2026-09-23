import { useState } from 'react';
import { useAppStore } from '../../store';
import { X, Sparkles, Calendar, Users, Plane, Train, Bus, Bike, Compass } from 'lucide-react';
import type { TripPlan, ItineraryDay } from '../../types';

interface AITripPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestination?: string;
}

export const AITripPlannerModal: React.FC<AITripPlannerModalProps> = ({ 
  isOpen, 
  onClose,
  initialDestination 
}) => {
  const { destinations, addPlan } = useAppStore();

  const [destination, setDestination] = useState(initialDestination || destinations[0]?.name || 'Kochi');
  const [daysCount, setDaysCount] = useState(3);
  const [travelersCount, setTravelersCount] = useState(2);
  const [transportMode, setTransportMode] = useState<'flight' | 'train' | 'bus' | 'rental'>('flight');
  const [budgetStyle, setBudgetStyle] = useState<'budget' | 'moderate' | 'luxury'>('moderate');
  const [interests, setInterests] = useState<string[]>(['Beaches', 'Food']);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);

    setTimeout(() => {
      // Procedurally generate realistic day-by-day plan based on destination and inputs
      const today = new Date();
      const startDateStr = today.toISOString().split('T')[0];
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + daysCount);
      const endDateStr = endDate.toISOString().split('T')[0];

      const costMultiplier = budgetStyle === 'luxury' ? 2.5 : budgetStyle === 'budget' ? 0.7 : 1.2;
      const basePerDay = 3500 * travelersCount * costMultiplier;

      const generatedDays: ItineraryDay[] = Array.from({ length: daysCount }).map((_, index) => {
        const dayNum = index + 1;
        return {
          id: `day_${dayNum}_${Date.now()}`,
          dayNumber: dayNum,
          title: dayNum === 1 
            ? `Arrival & ${destination} Orientation` 
            : dayNum === daysCount 
            ? `Farewell & Souvenirs in ${destination}` 
            : `Highlights & Cultural Excursions of ${destination}`,
          items: [
            {
              id: `item_${dayNum}_1`,
              time: '09:00 AM',
              location: dayNum === 1 ? `${destination} Gateway Hub` : `${destination} Landmark Vista`,
              description: dayNum === 1 
                ? `Arrive via ${transportMode}, private check-in, and welcome refreshments.`
                : `Morning scenic photography tour and exploration.`,
              type: dayNum === 1 ? 'transit' : 'spot',
              visited: false,
              cost: Math.round(500 * costMultiplier)
            },
            {
              id: `item_${dayNum}_2`,
              time: '01:00 PM',
              location: `Local Authentic Gastronomy Spot`,
              description: `Sample traditional dishes and farm-to-table lunch specialties.`,
              type: 'restaurant',
              visited: false,
              cost: Math.round(900 * travelersCount * (costMultiplier / 1.5))
            },
            {
              id: `item_${dayNum}_3`,
              time: '04:00 PM',
              location: `${destination} Coastal / Mountain Viewpoint`,
              description: `Afternoon activity tailored to ${interests.join(' & ')}.`,
              type: 'spot',
              visited: false,
              cost: Math.round(300 * costMultiplier)
            },
            {
              id: `item_${dayNum}_4`,
              time: '08:00 PM',
              location: `Boutique Stay & Evening Lounge`,
              description: `Relaxing sunset cocktails, dinner, and overnight stay.`,
              type: 'hotel',
              visited: false,
              cost: Math.round(3000 * costMultiplier)
            }
          ]
        };
      });

      const totalCalculatedCost = Math.round(basePerDay * daysCount);
      const points = Math.round(totalCalculatedCost / 100);

      const newPlan: TripPlan = {
        id: `plan_${Date.now()}`,
        travelerId: 'traveler1',
        name: `${destination} ${daysCount}-Day ${budgetStyle.toUpperCase()} Trip`,
        destination,
        startDate: startDateStr,
        endDate: endDateStr,
        transportMode,
        travelersCount,
        status: 'planned',
        totalExpenses: totalCalculatedCost,
        rewardPointsEarned: points,
        itinerary: generatedDays
      };

      addPlan(newPlan);
      setIsGenerating(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
              <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold">AI Trip Route Planner</h2>
              <p className="text-xs text-blue-100">Automatically creates day-by-day route, hotels & budget</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Destination */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-blue-600" /> Choose Destination
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-4 py-2.5 text-sm font-semibold border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {destinations.map(d => (
                <option key={d.id} value={d.name}>{d.name} — {d.country} ({d.category})</option>
              ))}
            </select>
          </div>

          {/* Duration & Travelers */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-600" /> Duration (Days)
              </label>
              <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden">
                {[2, 3, 5, 7].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setDaysCount(days)}
                    className={`flex-1 py-2 text-xs font-bold transition ${
                      daysCount === days 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {days}D
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-blue-600" /> Travelers
              </label>
              <select
                value={travelersCount}
                onChange={(e) => setTravelersCount(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white font-medium"
              >
                <option value={1}>1 Solo Explorer</option>
                <option value={2}>2 Couple / Duo</option>
                <option value={4}>4 Small Group</option>
                <option value={6}>6+ Family / Friends</option>
              </select>
            </div>
          </div>

          {/* Transport Mode */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Transport Preference
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'flight', label: 'Flight', icon: Plane },
                { id: 'train', label: 'Train', icon: Train },
                { id: 'bus', label: 'Bus', icon: Bus },
                { id: 'rental', label: 'Rental', icon: Bike },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTransportMode(id as any)}
                  className={`py-2 px-1 rounded-xl border flex flex-col items-center gap-1 text-center transition ${
                    transportMode === id
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-[11px]">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Budget Tier */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Budget Preference
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'budget', label: 'Budget Backpack', desc: 'Hostels & Local Shacks' },
                { id: 'moderate', label: 'Balanced Comfort', desc: '3-4 Star & Cabs' },
                { id: 'luxury', label: 'Luxury VIP', desc: '5-Star Resorts & Private' },
              ].map(({ id, label, desc }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setBudgetStyle(id as any)}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    budgetStyle === id
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <p className="text-xs font-bold">{label}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Activities / Interests */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Interests & Vibes
            </label>
            <div className="flex flex-wrap gap-2">
              {['Beaches', 'Adventure', 'Culture & Temples', 'Food & Cafes', 'Nightlife', 'Relaxation & Spa'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleInterest(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                    interests.includes(tag)
                      ? 'bg-blue-600 text-white shadow'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin" />
                  Generating Custom Itinerary...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  Generate AI Travel Plan for {destination}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
