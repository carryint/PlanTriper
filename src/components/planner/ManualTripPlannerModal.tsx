import { useState, useMemo } from 'react';
import { useAppStore } from '../../store';
import { 
  X, Plus, Trash2, MapPin, Building, Utensils, 
  Bike, Church, Waves, Compass, DollarSign, ExternalLink, CheckCircle2,
  Sparkles
} from 'lucide-react';
import type { TripPlan, ItineraryDay, ItineraryItem, Service, ServiceType } from '../../types';

interface ManualTripPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCity?: string;
}

export const ManualTripPlannerModal: React.FC<ManualTripPlannerModalProps> = ({
  isOpen,
  onClose,
  initialCity
}) => {
  const { services, addPlan } = useAppStore();

  // Extract all distinct cities from added services
  const availableCities = useMemo(() => {
    const citySet = new Set<string>();
    (services || []).forEach(s => {
      if (s.city) citySet.add(s.city.trim());
      else if (s.destination) citySet.add(s.destination.trim());
    });
    return Array.from(citySet).filter(Boolean);
  }, [services]);

  const defaultCity = initialCity || availableCities[0] || 'Kochi';
  const [selectedCity, setSelectedCity] = useState(defaultCity);
  const [tripName, setTripName] = useState(`${defaultCity} Manual Trip Plan`);
  const [travelersCount, setTravelersCount] = useState(2);
  const [transportMode, setTransportMode] = useState<'flight' | 'train' | 'bus' | 'rental'>('rental');
  
  // Days state
  const [days, setDays] = useState<ItineraryDay[]>([
    {
      id: 'day_1',
      dayNumber: 1,
      title: `Day 1 in ${defaultCity} - Arrival & Highlights`,
      items: []
    }
  ]);

  // Drawer / modal for adding spot to a specific day
  const [activeDayIndexForSpot, setActiveDayIndexForSpot] = useState<number | null>(null);
  const [spotCategoryFilter, setSpotCategoryFilter] = useState<string>('all');
  const [spotSearchQuery, setSpotSearchQuery] = useState('');

  if (!isOpen) return null;

  // Filter available spots by chosen city
  const citySpots = (services || []).filter(s => {
    const cityMatch = (s.city && s.city.toLowerCase() === selectedCity.toLowerCase()) ||
      (s.destination && s.destination.toLowerCase() === selectedCity.toLowerCase());
    return cityMatch && s.status === 'approved';
  });

  const filteredCitySpots = citySpots.filter(spot => {
    const categoryMatch = spotCategoryFilter === 'all' || spot.type === spotCategoryFilter;
    const searchMatch = !spotSearchQuery || 
      spot.name.toLowerCase().includes(spotSearchQuery.toLowerCase()) ||
      spot.place?.toLowerCase().includes(spotSearchQuery.toLowerCase()) ||
      spot.description?.toLowerCase().includes(spotSearchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const handleCityChange = (newCity: string) => {
    setSelectedCity(newCity);
    setTripName(`${newCity} Trip Plan`);
    setDays([
      {
        id: 'day_1',
        dayNumber: 1,
        title: `Day 1 in ${newCity} - Arrival & Highlights`,
        items: []
      }
    ]);
  };

  const addDay = () => {
    const nextDayNum = days.length + 1;
    setDays([
      ...days,
      {
        id: `day_${nextDayNum}_${Date.now()}`,
        dayNumber: nextDayNum,
        title: `Day ${nextDayNum} in ${selectedCity}`,
        items: []
      }
    ]);
  };

  const removeDay = (dayIndex: number) => {
    if (days.length === 1) {
      alert('Trip must have at least 1 day.');
      return;
    }
    const updated = days.filter((_, i) => i !== dayIndex).map((d, i) => ({
      ...d,
      dayNumber: i + 1,
      title: d.title.replace(/Day \d+/, `Day ${i + 1}`)
    }));
    setDays(updated);
  };

  const addSpotToDay = (spot: Service) => {
    if (activeDayIndexForSpot === null) return;

    const currentDay = days[activeDayIndexForSpot];
    const defaultTime = `${9 + (currentDay.items.length * 2)}:00 AM`;

    const newItem: ItineraryItem = {
      id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
      time: defaultTime,
      location: `${spot.name} (${spot.place || spot.city})`,
      description: spot.description,
      type: spot.type,
      visited: false,
      cost: spot.pricePerDay || 0,
      bookingUrl: spot.website || undefined,
      googleMapUrl: spot.googleMapUrl,
      imageUrl: spot.images[0],
      serviceId: spot.id
    };

    const updatedDays = [...days];
    updatedDays[activeDayIndexForSpot] = {
      ...currentDay,
      items: [...currentDay.items, newItem]
    };

    setDays(updatedDays);
    setActiveDayIndexForSpot(null);
  };

  const addCustomItemToDay = (dayIndex: number) => {
    const customLoc = prompt('Enter place or activity name:');
    if (!customLoc) return;

    const costStr = prompt('Enter estimated cost in ₹:', '500');
    const cost = parseInt(costStr || '0', 10) || 0;

    const currentDay = days[dayIndex];
    const defaultTime = `${9 + (currentDay.items.length * 2)}:00 AM`;

    const newItem: ItineraryItem = {
      id: `item_custom_${Date.now()}`,
      time: defaultTime,
      location: customLoc,
      description: `Custom planned activity in ${selectedCity}`,
      type: 'spot',
      visited: false,
      cost
    };

    const updatedDays = [...days];
    updatedDays[dayIndex] = {
      ...currentDay,
      items: [...currentDay.items, newItem]
    };
    setDays(updatedDays);
  };

  const removeItemFromDay = (dayIndex: number, itemId: string) => {
    const updatedDays = [...days];
    updatedDays[dayIndex] = {
      ...updatedDays[dayIndex],
      items: updatedDays[dayIndex].items.filter(it => it.id !== itemId)
    };
    setDays(updatedDays);
  };

  const totalCalculatedCost = days.reduce((total, day) => {
    return total + day.items.reduce((dayTotal, item) => dayTotal + (item.cost || 0), 0);
  }, 0);

  const handleSavePlan = () => {
    if (!tripName.trim()) {
      alert('Please enter a trip plan name.');
      return;
    }

    const today = new Date();
    const startDate = today.toISOString().split('T')[0];
    const endDateObj = new Date(today);
    endDateObj.setDate(today.getDate() + days.length);
    const endDate = endDateObj.toISOString().split('T')[0];

    const firstSpotImg = days[0]?.items[0]?.imageUrl || citySpots[0]?.images[0] || 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80';

    const newPlan: TripPlan = {
      id: `plan_manual_${Date.now()}`,
      travelerId: 'traveler1',
      name: tripName,
      destination: selectedCity,
      country: citySpots[0]?.country || 'India',
      city: selectedCity,
      startDate,
      endDate,
      transportMode,
      travelersCount,
      status: 'planned',
      itinerary: days,
      totalExpenses: totalCalculatedCost,
      rewardPointsEarned: Math.round(totalCalculatedCost / 100),
      coverImage: firstSpotImg,
      sourceFileType: 'manual',
      isCuratedByAdmin: true,
      notes: `Custom itinerary created with verified spots in ${selectedCity}.`
    };

    addPlan(newPlan);
    alert(`Trip plan "${tripName}" created successfully and saved to your trips!`);
    onClose();
  };

  const getCategoryIcon = (type: ServiceType) => {
    switch (type) {
      case 'hotel': return Building;
      case 'shop': return DollarSign;
      case 'rental': return Bike;
      case 'beach': return Waves;
      case 'church': return Church;
      case 'restaurant': return Utensils;
      default: return Compass;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-100 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-white/20 rounded-lg">
                <Compass className="w-5 h-5 text-amber-300" />
              </span>
              <h2 className="text-xl font-bold">Manual Trip Route Planner</h2>
            </div>
            <p className="text-xs text-blue-100 mt-1">
              Select your destination city and build your custom itinerary by picking available verified spots
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
          {/* Top Controls: City Selection & Basics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-600" /> Choose Location / City *
              </label>
              <select
                value={selectedCity}
                onChange={(e) => handleCityChange(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-bold border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
                {availableCities.map(city => (
                  <option key={city} value={city}>📍 {city}</option>
                ))}
                {availableCities.length === 0 && (
                  <option value="Kochi">📍 Kochi</option>
                )}
              </select>
              <span className="text-[11px] text-slate-500 mt-1 block">
                {citySpots.length} verified spots available in {selectedCity}
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Trip Plan Name
              </label>
              <input
                type="text"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                placeholder="e.g. Kochi 2-Day Adventure"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Travelers & Transport
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={travelersCount}
                  onChange={(e) => setTravelersCount(Number(e.target.value))}
                  className="w-full px-2.5 py-2 text-xs font-semibold border border-slate-300 rounded-xl bg-white"
                >
                  <option value={1}>1 Traveler</option>
                  <option value={2}>2 Travelers</option>
                  <option value={4}>4 Travelers</option>
                  <option value={6}>6+ Travelers</option>
                </select>

                <select
                  value={transportMode}
                  onChange={(e) => setTransportMode(e.target.value as any)}
                  className="w-full px-2.5 py-2 text-xs font-semibold border border-slate-300 rounded-xl bg-white capitalize"
                >
                  <option value="rental">Bike / Car</option>
                  <option value="flight">Flight</option>
                  <option value="train">Train</option>
                  <option value="bus">Bus</option>
                </select>
              </div>
            </div>
          </div>

          {/* Days Builder */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Itinerary Schedule ({days.length} Days)</h3>
                <p className="text-xs text-slate-500">Pick hotels, beaches, churches, and bike rentals from {selectedCity}</p>
              </div>

              <button
                type="button"
                onClick={addDay}
                className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl border border-blue-200 flex items-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" /> Add Another Day
              </button>
            </div>

            <div className="space-y-5">
              {days.map((day, dayIndex) => (
                <div key={day.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
                  {/* Day Header */}
                  <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
                    <div className="flex-1 flex items-center gap-2">
                      <span className="bg-blue-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-lg">
                        Day {day.dayNumber}
                      </span>
                      <input
                        type="text"
                        value={day.title}
                        onChange={(e) => {
                          const updated = [...days];
                          updated[dayIndex].title = e.target.value;
                          setDays(updated);
                        }}
                        className="text-sm font-bold text-slate-800 bg-transparent border-b border-dashed border-slate-300 hover:border-slate-500 focus:border-blue-500 focus:bg-white px-1 py-0.5 outline-none flex-1 max-w-md"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveDayIndexForSpot(dayIndex)}
                        className="px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-sm flex items-center gap-1 transition"
                      >
                        <Sparkles className="w-3.5 h-3.5" /> Pick Available {selectedCity} Spot
                      </button>

                      <button
                        type="button"
                        onClick={() => addCustomItemToDay(dayIndex)}
                        className="px-2.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl transition"
                      >
                        + Custom Item
                      </button>

                      <button
                        type="button"
                        onClick={() => removeDay(dayIndex)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition"
                        title="Remove Day"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Items in Day */}
                  <div className="space-y-2.5">
                    {day.items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between gap-3 group"
                      >
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt={item.location} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                          ) : (
                            <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-lg flex items-center justify-center shrink-0">
                              <MapPin className="w-5 h-5 text-blue-600" />
                            </div>
                          )}

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <input
                                type="text"
                                value={item.time}
                                onChange={(e) => {
                                  const updated = [...days];
                                  item.time = e.target.value;
                                  setDays(updated);
                                }}
                                className="text-[11px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 w-20 text-center"
                              />
                              <h5 className="font-bold text-xs text-slate-800 truncate">{item.location}</h5>
                              <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded capitalize">
                                {item.type}
                              </span>
                            </div>

                            <p className="text-[11px] text-slate-600 line-clamp-1">{item.description}</p>

                            <div className="flex items-center gap-3 mt-1 text-[11px]">
                              {item.googleMapUrl && (
                                <a
                                  href={item.googleMapUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                                >
                                  <MapPin className="w-3 h-3 text-red-500" /> Google Map Link
                                </a>
                              )}
                              {item.bookingUrl && (
                                <a
                                  href={item.bookingUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-slate-600 hover:underline flex items-center gap-1"
                                >
                                  <ExternalLink className="w-3 h-3" /> Booking Link
                                </a>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right">
                            <span className="text-[10px] text-slate-400 block uppercase font-bold">Cost</span>
                            <span className="font-bold text-xs text-slate-800">₹{item.cost}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItemFromDay(dayIndex, item.id)}
                            className="p-1 text-slate-300 hover:text-red-600 rounded transition"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {day.items.length === 0 && (
                      <p className="text-xs text-slate-400 italic py-3 text-center border border-dashed border-slate-200 rounded-xl">
                        No spots added yet. Click &quot;Pick Available {selectedCity} Spot&quot; above to select from hotels, churches, beaches, or bike rentals.
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div>
            <span className="text-xs text-slate-500 font-medium">Estimated Total Trip Cost:</span>
            <span className="text-lg font-extrabold text-slate-900 ml-2">
              ₹{totalCalculatedCost.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSavePlan}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-500/25 flex items-center gap-2 transition"
            >
              <CheckCircle2 className="w-4 h-4" /> Save & Publish Trip Plan
            </button>
          </div>
        </div>

        {/* DRAWER / PICKER: AVAILABLE CITY SPOTS */}
        {activeDayIndexForSpot !== null && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
              {/* Drawer Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
                <div>
                  <h4 className="text-base font-bold">
                    Available Spots in {selectedCity} (Day {activeDayIndexForSpot + 1})
                  </h4>
                  <p className="text-xs text-slate-300">
                    Click &quot;+ Add to Day&quot; to import the spot details, photos, and Google Maps link
                  </p>
                </div>
                <button
                  onClick={() => setActiveDayIndexForSpot(null)}
                  className="p-1.5 hover:bg-white/20 rounded-full text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Filter */}
              <div className="p-4 border-b border-slate-100 space-y-3 bg-slate-50">
                <input
                  type="text"
                  value={spotSearchQuery}
                  onChange={(e) => setSpotSearchQuery(e.target.value)}
                  placeholder={`Search ${selectedCity} hotels, shops, rentals, beaches, churches...`}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'hotel', label: 'Hotels' },
                    { id: 'shop', label: 'Shops & Markets' },
                    { id: 'rental', label: 'Bike & Car Rentals' },
                    { id: 'beach', label: 'Beaches' },
                    { id: 'church', label: 'Churches & Heritage' },
                    { id: 'spot', label: 'Spots' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setSpotCategoryFilter(tab.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                        spotCategoryFilter === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Spot List */}
              <div className="p-4 space-y-3 overflow-y-auto flex-1">
                {filteredCitySpots.map(spot => {
                  const Icon = getCategoryIcon(spot.type);
                  return (
                    <div
                      key={spot.id}
                      className="p-3 rounded-2xl border border-slate-200 hover:border-blue-400 bg-white shadow-sm flex items-center justify-between gap-3 transition"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={spot.images[0] || 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=400&q=80'}
                          alt={spot.name}
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="p-1 bg-slate-100 text-slate-700 rounded text-[10px]">
                              <Icon className="w-3 h-3" />
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                              {spot.type}
                            </span>
                            <span className="text-xs text-amber-500 font-bold">⭐ {spot.googleRating}</span>
                          </div>
                          <h5 className="font-bold text-xs text-slate-800 truncate mt-0.5">{spot.name}</h5>
                          <p className="text-[11px] text-slate-500 truncate">
                            📍 {spot.place ? `${spot.place}, ` : ''}{spot.city} {spot.postalCode ? `(${spot.postalCode})` : ''}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {spot.pricePerDay ? (
                          <span className="text-xs font-bold text-slate-700">₹{spot.pricePerDay}</span>
                        ) : null}

                        <button
                          type="button"
                          onClick={() => addSpotToDay(spot)}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add
                        </button>
                      </div>
                    </div>
                  );
                })}

                {filteredCitySpots.length === 0 && (
                  <div className="text-center py-8 text-slate-400 text-xs">
                    No spots found for this filter. You can add new spots for {selectedCity} in the Admin Dashboard!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
