import { useState, useMemo } from 'react';
import { useAppStore } from '../../store';
import { 
  X, Plus, Trash2, MapPin, Building, Utensils, 
  Bike, Church, Waves, Compass, DollarSign, ExternalLink, CheckCircle2,
  Sparkles, Navigation, Clock, Info, CheckSquare, Square, ArrowRight, Route,
  Download
} from 'lucide-react';
import type { TripPlan, ItineraryDay, ItineraryItem, Service, ServiceType } from '../../types';
import { arrangeDayPlan } from '../../utils/routeOptimizer';
import { downloadPlanAsPdf, generateShareablePlanUrl, copyPlanShareLink } from '../../utils/pdfGenerator';

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

  const defaultCity = initialCity || availableCities[0] || 'Goa';
  const [selectedCity, setSelectedCity] = useState(defaultCity);
  const [tripName, setTripName] = useState(`${defaultCity} Custom Itinerary`);
  const [travelersCount, setTravelersCount] = useState(2);
  const [transportMode, setTransportMode] = useState<'flight' | 'train' | 'bus' | 'rental'>('rental');
  
  // Starting Location & Starting Time Controls
  const [startLocationName, setStartLocationName] = useState(`Hotel / Stay in ${defaultCity}`);
  const [startTimeStr, setStartTimeStr] = useState('09:00 AM');
  
  // Optimization Status
  const [isArranging, setIsArranging] = useState(false);
  const [arrangeSuccessMsg, setArrangeSuccessMsg] = useState<string | null>(null);

  // Post-Save Share & Download Modal state
  const [savedShareModalPlan, setSavedShareModalPlan] = useState<TripPlan | null>(null);
  const [copiedToast, setCopiedToast] = useState(false);

  // Days state
  const [days, setDays] = useState<ItineraryDay[]>([
    {
      id: 'day_1',
      dayNumber: 1,
      title: `Day 1 in ${defaultCity} - Route & Highlights`,
      items: []
    }
  ]);

  // Drawer / modal for adding spots to a specific day
  const [activeDayIndexForSpot, setActiveDayIndexForSpot] = useState<number | null>(null);
  const [spotCategoryFilter, setSpotCategoryFilter] = useState<string>('all');
  const [spotSearchQuery, setSpotSearchQuery] = useState('');
  const [selectedDrawerSpotIds, setSelectedDrawerSpotIds] = useState<string[]>([]);

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
    setTripName(`${newCity} Custom Itinerary`);
    setStartLocationName(`Hotel / Stay in ${newCity}`);
    setDays([
      {
        id: 'day_1',
        dayNumber: 1,
        title: `Day 1 in ${newCity} - Route & Highlights`,
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

  const convertSpotToItineraryItem = (spot: Service, dayItemsCount: number): ItineraryItem => {
    const defaultTime = `${9 + (dayItemsCount * 2)}:00 AM`;
    return {
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
  };

  const addSpotToDay = (spot: Service) => {
    if (activeDayIndexForSpot === null) return;
    const currentDay = days[activeDayIndexForSpot];
    const newItem = convertSpotToItineraryItem(spot, currentDay.items.length);

    const updatedDays = [...days];
    updatedDays[activeDayIndexForSpot] = {
      ...currentDay,
      items: [...currentDay.items, newItem]
    };

    setDays(updatedDays);
    setActiveDayIndexForSpot(null);
    setSelectedDrawerSpotIds([]);
  };

  const toggleSelectDrawerSpot = (spotId: string) => {
    setSelectedDrawerSpotIds(prev => 
      prev.includes(spotId) ? prev.filter(id => id !== spotId) : [...prev, spotId]
    );
  };

  const addBatchSpotsToDay = () => {
    if (activeDayIndexForSpot === null || selectedDrawerSpotIds.length === 0) return;
    const currentDay = days[activeDayIndexForSpot];
    const spotsToAdd = citySpots.filter(s => selectedDrawerSpotIds.includes(s.id));

    let count = currentDay.items.length;
    const newItems: ItineraryItem[] = spotsToAdd.map(spot => {
      const item = convertSpotToItineraryItem(spot, count);
      count++;
      return item;
    });

    const updatedDays = [...days];
    updatedDays[activeDayIndexForSpot] = {
      ...currentDay,
      items: [...currentDay.items, ...newItems]
    };

    setDays(updatedDays);
    setActiveDayIndexForSpot(null);
    setSelectedDrawerSpotIds([]);
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

  /**
   * "Arrange Plan" Switch/Button Handler:
   * Analyzes distances, events, timings, and creates the optimal multi-stop route.
   */
  const handleArrangePlan = (targetDayIndex?: number) => {
    setIsArranging(true);

    setTimeout(() => {
      const updatedDays = days.map((day, idx) => {
        if (targetDayIndex !== undefined && idx !== targetDayIndex) {
          return day;
        }
        if (day.items.length === 0) return day;

        return arrangeDayPlan(
          day,
          selectedCity,
          startLocationName || `Hotel / Stay in ${selectedCity}`,
          startTimeStr || '09:00 AM',
          transportMode
        );
      });

      setDays(updatedDays);
      setIsArranging(false);
      const totalStops = updatedDays.reduce((acc, d) => acc + d.items.length, 0);
      setArrangeSuccessMsg(
        `✨ Arranged ${totalStops} spots by distance, event hours & created multi-stop Google Maps routes!`
      );
      setTimeout(() => setArrangeSuccessMsg(null), 5000);
    }, 450);
  };

  const totalCalculatedCost = days.reduce((total, day) => {
    return total + day.items.reduce((dayTotal, item) => dayTotal + (item.cost || 0), 0);
  }, 0);

  const totalSelectedSpotsCount = days.reduce((total, d) => total + d.items.length, 0);

  const buildCurrentPlanObject = (): TripPlan => {
    const today = new Date();
    const startDate = today.toISOString().split('T')[0];
    const endDateObj = new Date(today);
    endDateObj.setDate(today.getDate() + days.length);
    const endDate = endDateObj.toISOString().split('T')[0];

    const firstSpotImg = days[0]?.items[0]?.imageUrl || citySpots[0]?.images[0] || 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80';

    return {
      id: `plan_manual_${Date.now()}`,
      travelerId: 'traveler1',
      name: tripName || `${selectedCity} Custom Itinerary`,
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
      notes: `Custom itinerary created with verified spots in ${selectedCity}. Route analyzed & arranged.`
    };
  };

  const handleSavePlan = () => {
    if (!tripName.trim()) {
      alert('Please enter a trip plan name.');
      return;
    }
    const newPlan = buildCurrentPlanObject();
    addPlan(newPlan);
    setSavedShareModalPlan(newPlan);
  };

  const handleDownloadPreview = () => {
    const currentPlan = buildCurrentPlanObject();
    downloadPlanAsPdf(currentPlan);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-100 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[94vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white flex items-center justify-between shrink-0 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-white/20 rounded-lg">
                <Route className="w-5 h-5 text-amber-300" />
              </span>
              <h2 className="text-xl font-bold">Manual Trip Route & Itinerary Planner</h2>
            </div>
            <p className="text-xs text-blue-100 mt-1">
              Pick your spots, then tap <strong className="text-amber-300">Arrange Plan</strong> to automatically analyze distances, calculate drive times & generate full Google Maps routes.
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
                <MapPin className="w-3.5 h-3.5 text-blue-600" /> Choose Destination / City *
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
                  <option value="Goa">📍 Goa</option>
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
                placeholder="e.g. Goa 2-Day Adventure"
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
                  <option value="rental">Bike / Car Rental</option>
                  <option value="bus">Bus / Transit</option>
                  <option value="flight">Flight</option>
                  <option value="train">Train</option>
                </select>
              </div>
            </div>
          </div>

          {/* ARRANGE PLAN MASTER SWITCH & CONFIGURATION BAR */}
          <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 border-2 border-amber-300/80 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-amber-500 text-white rounded-xl shadow-md shrink-0">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-slate-900">
                      &quot;Arrange Plan&quot; Smart Route Engine
                    </h3>
                    <span className="bg-amber-200 text-amber-900 text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-wide">
                      AI & Heuristic Optimizer
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Analyzes road distances between all chosen spots, evaluates peak visiting hours &amp; events, and generates your complete step-by-step route map.
                  </p>
                </div>
              </div>

              {/* THE SWITCH / ACTION BUTTON */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleArrangePlan()}
                  disabled={totalSelectedSpotsCount === 0 || isArranging}
                  className={`px-5 py-3 rounded-xl font-black text-xs sm:text-sm shadow-lg flex items-center gap-2 transition transform active:scale-95 ${
                    totalSelectedSpotsCount === 0
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                      : isArranging
                      ? 'bg-amber-400 text-slate-950 cursor-wait'
                      : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 shadow-amber-500/25 hover:shadow-amber-500/40'
                  }`}
                >
                  <Navigation className={`w-4 h-4 ${isArranging ? 'animate-spin' : ''}`} />
                  {isArranging ? 'Analyzing Distances & Timing...' : '⚡ Arrange Plan Now'}
                </button>
              </div>
            </div>

            {/* Starting Location & Departure Time Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-3 border-t border-amber-200/60">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-red-500" /> Starting Location / Departure Point
                </label>
                <input
                  type="text"
                  value={startLocationName}
                  onChange={(e) => setStartLocationName(e.target.value)}
                  placeholder={`e.g. Hotel in ${selectedCity}, Airport, Railway Station`}
                  className="w-full px-3 py-1.5 text-xs font-semibold border border-amber-300 rounded-xl bg-white focus:ring-2 focus:ring-amber-500"
                />
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  Route starts from this address
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-blue-600" /> Morning Starting Time
                </label>
                <select
                  value={startTimeStr}
                  onChange={(e) => setStartTimeStr(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs font-bold border border-amber-300 rounded-xl bg-white focus:ring-2 focus:ring-amber-500"
                >
                  {['07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM'].map(t => (
                    <option key={t} value={t}>⏰ {t}</option>
                  ))}
                </select>
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  First stop departure timestamp
                </span>
              </div>

              <div className="flex flex-col justify-center">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Selected Route Spots
                </span>
                <div className="text-xs text-slate-700 bg-white/70 px-3 py-1.5 rounded-xl border border-amber-200 flex items-center justify-between">
                  <span><strong>{totalSelectedSpotsCount}</strong> spots across {days.length} day(s)</span>
                  {totalSelectedSpotsCount > 0 && (
                    <span className="text-emerald-700 font-bold text-[11px]">Ready to Arrange</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Success Banner */}
          {arrangeSuccessMsg && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold rounded-2xl flex items-center gap-2 shadow-sm animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{arrangeSuccessMsg}</span>
            </div>
          )}

          {/* Days Builder */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Itinerary Schedule ({days.length} Days)</h3>
                <p className="text-xs text-slate-500">Pick verified spots in {selectedCity} and let the engine sequence your route</p>
              </div>

              <button
                type="button"
                onClick={addDay}
                className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl border border-blue-200 flex items-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" /> Add Another Day
              </button>
            </div>

            <div className="space-y-6">
              {days.map((day, dayIndex) => (
                <div key={day.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
                  {/* Day Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
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

                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Pick Spot Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setActiveDayIndexForSpot(dayIndex);
                          setSelectedDrawerSpotIds([]);
                        }}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1 transition"
                      >
                        <Plus className="w-3.5 h-3.5" /> Pick {selectedCity} Spots ({day.items.length})
                      </button>

                      {/* Day-specific Arrange Plan Button */}
                      {day.items.length >= 2 && (
                        <button
                          type="button"
                          onClick={() => handleArrangePlan(dayIndex)}
                          className="px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-sm flex items-center gap-1 transition"
                          title="Optimize route order and times for Day only"
                        >
                          <Sparkles className="w-3.5 h-3.5" /> Arrange Day Route
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => addCustomItemToDay(dayIndex)}
                        className="px-2.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl transition"
                      >
                        + Custom
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

                  {/* OPTIMIZED ROUTE NAVIGATION BANNER (shown when arranged) */}
                  {day.isOptimizedRoute && day.routeMapUrl && (
                    <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border border-emerald-200 rounded-2xl p-3.5 space-y-2.5 animate-in fade-in">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-emerald-700 font-extrabold text-xs flex items-center gap-1">
                              <Route className="w-3.5 h-3.5" /> Optimized Multi-Stop Route Path:
                            </span>
                            <span className="bg-emerald-200 text-emerald-900 text-[10px] font-black px-2 py-0.2 rounded-full">
                              Google Maps Ready
                            </span>
                          </div>
                          
                          {/* Route Chain */}
                          <div className="flex items-center flex-wrap gap-1.5 text-xs font-semibold text-slate-700">
                            <span className="text-blue-700 font-bold">📍 {day.startLocationName || 'Start'}</span>
                            {day.items.map((it, i) => (
                              <span key={i} className="flex items-center gap-1">
                                <ArrowRight className="w-3 h-3 text-emerald-500" />
                                <span className="bg-white px-2 py-0.5 rounded-md border border-emerald-100 text-slate-800 text-[11px]">
                                  {it.location.split('(')[0].trim()}
                                </span>
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Navigation Button */}
                        <div className="flex items-center gap-2 shrink-0">
                          <a
                            href={day.routeMapUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-emerald-600/25 flex items-center gap-1.5 transition"
                          >
                            <Navigation className="w-3.5 h-3.5 text-amber-300" /> 🗺️ Open Full Route in Google Maps
                          </a>
                        </div>
                      </div>

                      {/* Metrics bar */}
                      <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-emerald-100 text-[11px] text-slate-600">
                        <span>🚗 Total Driving Distance: <strong>{day.totalDistanceKm} km</strong></span>
                        <span>•</span>
                        <span>⏱️ Estimated Road Travel: <strong>~{day.totalDriveMinutes} mins</strong></span>
                        <span>•</span>
                        <span>⏰ Start Time: <strong>{day.startTime}</strong></span>
                      </div>
                    </div>
                  )}

                  {/* Items in Day */}
                  <div className="space-y-3">
                    {day.items.map((item) => (
                      <div key={item.id} className="space-y-1.5">
                        
                        {/* Transit Connector between previous stop and this stop */}
                        {item.transitFromPrevious && (
                          <div className="flex items-center gap-2 pl-6 py-0.5 text-[11px] text-slate-500 font-semibold">
                            <div className="w-0.5 h-4 bg-emerald-400 rounded-full" />
                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                              <Navigation className="w-3 h-3 text-emerald-600" />
                              🚗 {item.transitFromPrevious.distanceKm} km • ~{item.transitFromPrevious.durationMinutes} mins drive to next stop
                            </span>
                          </div>
                        )}

                        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between gap-3 group hover:border-blue-300 transition">
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            {item.imageUrl ? (
                              <img src={item.imageUrl} alt={item.location} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                            ) : (
                              <div className="w-14 h-14 bg-slate-100 text-slate-500 rounded-xl flex items-center justify-center shrink-0">
                                <MapPin className="w-6 h-6 text-blue-600" />
                              </div>
                            )}

                            <div className="flex-1 min-w-0 space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-[11px] font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                                  ⏰ {item.time}
                                </span>
                                <h5 className="font-bold text-xs sm:text-sm text-slate-800 truncate">{item.location}</h5>
                                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded capitalize">
                                  {item.type}
                                </span>

                                {item.idealTimingBadge && (
                                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                                    {item.idealTimingBadge}
                                  </span>
                                )}
                              </div>

                              <p className="text-xs text-slate-600 line-clamp-1">{item.description}</p>

                              {/* Informative Event Tip Banner */}
                              {item.eventTip && (
                                <div className="text-[11px] text-amber-900 bg-amber-50/80 border border-amber-200/70 px-2.5 py-1 rounded-lg flex items-start gap-1.5 mt-1">
                                  <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                                  <span>{item.eventTip}</span>
                                </div>
                              )}

                              <div className="flex items-center gap-3 pt-0.5 text-xs">
                                {item.googleMapUrl && (
                                  <a
                                    href={item.googleMapUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                                  >
                                    <MapPin className="w-3.5 h-3.5 text-red-500" /> Spot Map Link
                                  </a>
                                )}
                                {item.bookingUrl && (
                                  <a
                                    href={item.bookingUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-slate-600 hover:underline flex items-center gap-1"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" /> Booking Link
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
                              title="Remove item"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {day.items.length === 0 && (
                      <p className="text-xs text-slate-400 italic py-5 text-center border border-dashed border-slate-200 rounded-xl bg-white/50">
                        No spots added yet. Click &quot;Pick {selectedCity} Spots&quot; above to select multiple beaches, churches, or bike rentals, then tap &quot;Arrange Plan&quot;!
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

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleDownloadPreview}
              disabled={totalSelectedSpotsCount === 0}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
              title="Download formatted PDF or print"
            >
              <Download className="w-3.5 h-3.5 text-amber-300" />
              <span>Download PDF</span>
            </button>

            <button
              type="button"
              onClick={handleSavePlan}
              className="px-5 sm:px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-500/25 flex items-center gap-2 transition"
            >
              <CheckCircle2 className="w-4 h-4" /> Save &amp; Publish Trip Plan
            </button>
          </div>
        </div>

        {/* POST-SAVE SHARE & DOWNLOAD DIALOG */}
        {savedShareModalPlan && (
          <div className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                    <CheckCircle2 className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Trip Plan Created &amp; Saved!</h3>
                    <p className="text-xs text-slate-500">Ready to share via link or download as PDF</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSavedShareModalPlan(null);
                    onClose();
                  }}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                <h4 className="font-bold text-sm text-slate-800">{savedShareModalPlan.name}</h4>
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <span>📍 {savedShareModalPlan.destination}</span>
                  <span>&bull;</span>
                  <span>{savedShareModalPlan.itinerary?.length} Day(s)</span>
                  <span>&bull;</span>
                  <span className="font-bold text-slate-700">₹{savedShareModalPlan.totalExpenses.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Direct Shareable Link (Anyone Can View)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={generateShareablePlanUrl(savedShareModalPlan)}
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-xl bg-slate-50 text-slate-700 outline-none select-all"
                  />
                  <button
                    onClick={async () => {
                      await copyPlanShareLink(savedShareModalPlan);
                      setCopiedToast(true);
                      setTimeout(() => setCopiedToast(false), 3000);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow shrink-0 transition"
                  >
                    {copiedToast ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => downloadPlanAsPdf(savedShareModalPlan)}
                  className="py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow transition"
                >
                  <Download className="w-4 h-4 text-amber-300" /> Download PDF
                </button>

                <a
                  href={generateShareablePlanUrl(savedShareModalPlan)}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition text-center"
                >
                  <ExternalLink className="w-4 h-4" /> Open Plan View
                </a>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSavedShareModalPlan(null);
                    onClose();
                  }}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DRAWER / PICKER: AVAILABLE CITY SPOTS (Supports Multi-Selection) */}
        {activeDayIndexForSpot !== null && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[88vh]">
              {/* Drawer Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
                <div>
                  <h4 className="text-base font-bold">
                    Select Spots in {selectedCity} for Day {activeDayIndexForSpot + 1}
                  </h4>
                  <p className="text-xs text-slate-300">
                    Pick individual spots or select multiple with checkboxes to import them together
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveDayIndexForSpot(null);
                    setSelectedDrawerSpotIds([]);
                  }}
                  className="p-1.5 hover:bg-white/20 rounded-full text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Filter & Search */}
              <div className="p-4 border-b border-slate-100 space-y-3 bg-slate-50">
                <input
                  type="text"
                  value={spotSearchQuery}
                  onChange={(e) => setSpotSearchQuery(e.target.value)}
                  placeholder={`Search ${selectedCity} beaches, churches, temples, hotels, rentals...`}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: `All (${citySpots.length})` },
                    { id: 'beach', label: 'Beaches' },
                    { id: 'church', label: 'Churches & Temples' },
                    { id: 'hotel', label: 'Hotels' },
                    { id: 'rental', label: 'Bike Rentals' },
                    { id: 'shop', label: 'Shops' },
                    { id: 'restaurant', label: 'Restaurants' },
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
              <div className="p-4 space-y-2.5 overflow-y-auto flex-1">
                {filteredCitySpots.map(spot => {
                  const Icon = getCategoryIcon(spot.type);
                  const isChecked = selectedDrawerSpotIds.includes(spot.id);

                  return (
                    <div
                      key={spot.id}
                      onClick={() => toggleSelectDrawerSpot(spot.id)}
                      className={`p-3 rounded-2xl border cursor-pointer transition flex items-center justify-between gap-3 ${
                        isChecked 
                          ? 'border-blue-500 bg-blue-50/60 shadow-sm' 
                          : 'border-slate-200 hover:border-blue-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSelectDrawerSpot(spot.id);
                          }}
                          className="text-blue-600 shrink-0"
                        >
                          {isChecked ? (
                            <CheckSquare className="w-5 h-5 text-blue-600 fill-blue-50" />
                          ) : (
                            <Square className="w-5 h-5 text-slate-400" />
                          )}
                        </button>

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
                          onClick={(e) => {
                            e.stopPropagation();
                            addSpotToDay(spot);
                          }}
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
                    No spots found for this filter.
                  </div>
                )}
              </div>

              {/* Drawer Footer with Batch Add */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
                <span className="text-xs text-slate-600">
                  Selected: <strong>{selectedDrawerSpotIds.length}</strong> spot(s)
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveDayIndexForSpot(null);
                      setSelectedDrawerSpotIds([]);
                    }}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition"
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    onClick={addBatchSpotsToDay}
                    disabled={selectedDrawerSpotIds.length === 0}
                    className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition ${
                      selectedDrawerSpotIds.length === 0
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25'
                    }`}
                  >
                    <Plus className="w-4 h-4" /> Add Selected ({selectedDrawerSpotIds.length}) Spots
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
