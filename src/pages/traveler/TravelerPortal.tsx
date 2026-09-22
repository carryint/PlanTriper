import { useState } from 'react';
import { useAppStore } from '../../store';
import { 
  Compass, MapPin, Sparkles, Building, Utensils, Bike, Star, 
  Phone, Globe, Check, DollarSign, 
  Plane, Bus, Search, ArrowRight, ExternalLink,
  Calendar, Users, BookmarkPlus, X, FileText, CheckCircle2
} from 'lucide-react';
import { AITripPlannerModal } from '../../components/planner/AITripPlannerModal';
import type { ServiceType, TripPlan } from '../../types';

export default function TravelerPortal() {
  const { destinations, services, plans, adBanners, toggleItemVisited, deletePlan, addPlan } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeServiceTab, setActiveServiceTab] = useState<ServiceType | 'all'>('all');
  const [selectedDestinationFilter, setSelectedDestinationFilter] = useState<string>('all');
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [plannerDestination, setPlannerDestination] = useState<string | undefined>(undefined);
  const [activeView, setActiveView] = useState<'explore' | 'my-trips'>('explore');

  // Modal for Viewing a Curated Plan's Details
  const [selectedViewingPlan, setSelectedViewingPlan] = useState<TripPlan | null>(null);
  const [savedSuccessMsg, setSavedSuccessMsg] = useState<string | null>(null);

  // Filter approved services
  const approvedServices = (services || []).filter(s => s && s.status === 'approved');

  const filteredServices = approvedServices.filter(service => {
    const matchesTab = activeServiceTab === 'all' || service.type === activeServiceTab;
    const matchesDest = selectedDestinationFilter === 'all' || service.destination.toLowerCase() === selectedDestinationFilter.toLowerCase();
    const matchesSearch = !searchQuery || 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesDest && matchesSearch;
  });

  const filteredDestinations = (destinations || []).filter(d => {
    const matchesCategory = selectedCategory === 'All' || d.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeAds = (adBanners || []).filter(ad => ad.active);

  const openPlannerFor = (destName: string) => {
    setPlannerDestination(destName);
    setIsPlannerOpen(true);
  };

  // Copy/Save plan to personal trips
  const handleSaveToMyTrips = (plan: TripPlan) => {
    const copiedPlan: TripPlan = {
      ...plan,
      id: `my_plan_${Date.now()}`,
      travelerId: 'traveler1',
      name: `My ${plan.name}`,
      status: 'planned'
    };
    addPlan(copiedPlan);
    setSavedSuccessMsg(`"${plan.name}" added to your saved trips!`);
    setTimeout(() => setSavedSuccessMsg(null), 3000);
  };

  // Calculate totals
  const totalPlannedExpenses = (plans || []).reduce((acc, p) => acc + (p.totalExpenses || 0), 0);
  const totalRewardPoints = (plans || []).reduce((acc, p) => acc + (p.rewardPointsEarned || 0), 0);

  return (
    <div className="space-y-10 pb-16">
      {/* Traveler Subheader / View Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('explore')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-2 ${
              activeView === 'explore'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-4 h-4" /> Explore Destinations & Spots
          </button>
          <button
            onClick={() => setActiveView('my-trips')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-2 ${
              activeView === 'my-trips'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <MapPin className="w-4 h-4" /> My Saved Trips
            {plans && plans.length > 0 && (
              <span className="bg-amber-400 text-slate-900 text-xs px-2 py-0.5 rounded-full font-bold">
                {plans.length}
              </span>
            )}
          </button>
        </div>

        <button
          onClick={() => {
            setPlannerDestination(undefined);
            setIsPlannerOpen(true);
          }}
          className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
        >
          <Sparkles className="w-4 h-4" /> Generate Plan with AI
        </button>
      </div>

      {savedSuccessMsg && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold rounded-2xl flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>{savedSuccessMsg}</span>
          </div>
          <button
            onClick={() => setActiveView('my-trips')}
            className="underline hover:text-emerald-950 font-bold"
          >
            View in My Trips →
          </button>
        </div>
      )}

      {/* VIEW 1: EXPLORE DESTINATIONS & SERVICES */}
      {activeView === 'explore' && (
        <>
          {/* Hero Banner */}
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white min-h-[380px] flex items-center shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80"
              alt="World Destinations"
              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
            />
            <div className="relative z-10 p-6 sm:p-10 md:p-12 max-w-2xl space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-blue-200">
                <Compass className="w-3.5 h-3.5" /> Multi-Destination Travel Hub
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Plan Your Trip Route & Spots Easily
              </h1>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                Discover verified hotels, authentic restaurants, bike & car rentals, and pristine beaches across top global and domestic destinations.
              </p>

              {/* Search Bar */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Bali, Manali, Dubai, hotels, bike rentals..."
                    className="w-full pl-11 pr-4 py-3 bg-white text-slate-800 rounded-xl text-sm font-medium focus:ring-4 focus:ring-blue-500/30 outline-none shadow-lg"
                  />
                </div>
                <button
                  onClick={() => setIsPlannerOpen(true)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition shadow-lg shrink-0 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" /> Plan with AI
                </button>
              </div>
            </div>
          </div>

          {/* Custom Ads Banner (Managed by Admin) */}
          {activeAds.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeAds.map(ad => (
                <a
                  key={ad.id}
                  href={ad.targetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="relative rounded-2xl overflow-hidden group shadow-md hover:shadow-lg transition flex items-center min-h-[120px] bg-slate-800"
                >
                  <img
                    src={ad.imageUrl}
                    alt={ad.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition duration-500"
                  />
                  <div className="relative z-10 p-5 text-white flex-1">
                    <span className="text-[10px] uppercase font-bold bg-amber-500 text-slate-900 px-2 py-0.5 rounded-full">
                      {ad.tag}
                    </span>
                    <h4 className="text-base font-bold mt-1 text-white group-hover:text-amber-300 transition">
                      {ad.title}
                    </h4>
                    <p className="text-xs text-slate-200 mt-0.5 line-clamp-1">{ad.subtitle}</p>
                  </div>
                  <div className="relative z-10 pr-5">
                    <ExternalLink className="w-5 h-5 text-white/80 group-hover:text-white" />
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* SHOWCASE SECTION: CURATED & ADMIN UPLOADED TRIP PLANS */}
          <div className="space-y-4 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h2 className="text-2xl font-bold text-slate-800">Featured Curated Itineraries</h2>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Complete day-by-day travel plans with schedules, booking links, and estimated costs uploaded by experts
                </p>
              </div>

              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 self-start sm:self-auto">
                {(plans || []).length} Plans Available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(plans || []).map(plan => (
                <div
                  key={plan.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col group justify-between"
                >
                  <div>
                    <div className="h-44 relative bg-slate-900 overflow-hidden">
                      <img
                        src={plan.coverImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'}
                        alt={plan.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className="bg-blue-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                          {plan.destination}
                        </span>
                        {plan.sourceFileType && (
                          <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase shadow">
                            {plan.sourceFileType} Plan
                          </span>
                        )}
                      </div>

                      <span className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur text-white text-xs font-bold px-2.5 py-0.5 rounded">
                        {plan.itinerary.length} Days
                      </span>
                    </div>

                    <div className="p-5 space-y-2.5">
                      <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-1 group-hover:text-blue-600 transition">
                        {plan.name}
                      </h3>
                      
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" /> {plan.itinerary.length} Days
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-slate-400" /> {plan.travelersCount} Travelers
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2">
                        {plan.notes || `Structured route featuring top spots, verified hotels, and restaurants in ${plan.destination}.`}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Est. Budget</span>
                      <span className="text-sm font-extrabold text-slate-800">
                        ₹{plan.totalExpenses.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedViewingPlan(plan)}
                        className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl transition"
                      >
                        View Route
                      </button>
                      <button
                        onClick={() => handleSaveToMyTrips(plan)}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
                        title="Copy to My Trips"
                      >
                        <BookmarkPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Destinations Grid */}
          <div className="space-y-4 pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Featured Destinations</h2>
                <p className="text-xs text-slate-500">Pick any destination to generate automated AI routes or explore local spots</p>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                {['All', 'Beach', 'Mountain', 'City', 'Heritage'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map(dest => (
                <div
                  key={dest.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col group"
                >
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
                      {dest.category}
                    </span>
                    <div className="absolute bottom-3 left-4 text-white">
                      <p className="text-xs font-medium text-blue-200">{dest.country}</p>
                      <h3 className="text-xl font-bold">{dest.name}</h3>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-slate-600 line-clamp-2 mb-4">{dest.tagline}</p>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <span className="text-xs font-semibold text-slate-500">
                        {dest.popularSpotsCount} verified spots
                      </span>
                      <button
                        onClick={() => openPlannerFor(dest.name)}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group/btn"
                      >
                        Plan AI Trip <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Directory of Services: Hotels, Restaurants, Bike & Car Rentals, Beaches */}
          <div className="space-y-6 pt-6 border-t border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Hotels, Rentals & Food Spots</h2>
                <p className="text-xs text-slate-500">
                  Approved service providers. Book stays, rent bikes/cars, or discover top restaurants.
                </p>
              </div>

              {/* Destination Filter Dropdown */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-600 shrink-0">Filter City:</span>
                <select
                  value={selectedDestinationFilter}
                  onChange={(e) => setSelectedDestinationFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs font-semibold border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Destinations</option>
                  {destinations.map(d => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Service Type Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Services', icon: Compass },
                { id: 'hotel', label: 'Hotels & Resorts', icon: Building },
                { id: 'rental', label: 'Bike & Car Rentals', icon: Bike },
                { id: 'restaurant', label: 'Restaurants & Shacks', icon: Utensils },
                { id: 'spot', label: 'Beaches & Attractions', icon: MapPin },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveServiceTab(id as any)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
                    activeServiceTab === id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4" /> {label}
                </button>
              ))}
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map(service => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col group"
                >
                  <div className="h-44 relative overflow-hidden bg-slate-100">
                    <img
                      src={service.images[0]}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full capitalize">
                      {service.type}
                    </span>
                    <span className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur text-amber-600 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                      <Star className="w-3.5 h-3.5 fill-current text-amber-500" /> {service.googleRating}
                    </span>
                    <span className="absolute bottom-2.5 left-2.5 bg-blue-600/90 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {service.destination}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-800 text-base mb-1">{service.name}</h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mb-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{service.address}</span>
                      </p>
                      <p className="text-xs text-slate-600 line-clamp-2 mb-3">{service.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">
                          {service.priceLevel ? `Tier: ${service.priceLevel}` : 'Daily Rate'}
                        </span>
                        {service.pricePerDay && (
                          <span className="font-bold text-slate-800 text-sm">
                            ₹{service.pricePerDay} <span className="text-[10px] text-slate-400">/ day</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <a
                          href={`tel:${service.contact}`}
                          className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition"
                        >
                          <Phone className="w-3 h-3" /> Call Provider
                        </a>
                        {service.website && (
                          <a
                            href={service.website}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition"
                          >
                            <Globe className="w-3 h-3" /> Website
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredServices.length === 0 && (
                <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                  <p className="text-slate-500 text-sm">No services found matching your filter criteria.</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* VIEW 2: SAVED TRIPS & EXPENSE TRACKER */}
      {activeView === 'my-trips' && (
        <div className="space-y-8">
          {/* Rewards & Expense Metric Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                <Plane className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Flight Points</p>
                <p className="text-2xl font-extrabold text-slate-800">180 pts</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center shrink-0">
                <Bus className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Van & Bus Points</p>
                <p className="text-2xl font-extrabold text-slate-800">95 pts</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
                <Bike className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Reward Points</p>
                <p className="text-2xl font-extrabold text-slate-800">{totalRewardPoints} pts</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Tracked Budget</p>
                <p className="text-2xl font-extrabold text-slate-800">₹{totalPlannedExpenses.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Saved Plans List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Your Saved Trip Plans</h2>
                <p className="text-xs text-slate-500">
                  Track visited spots, hotels booked, and manage total travel expenditure
                </p>
              </div>
              <button
                onClick={() => setIsPlannerOpen(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-300" /> New Plan
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {(plans || []).map(plan => (
                <div
                  key={plan.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col"
                >
                  {/* Plan Card Header */}
                  <div className="bg-slate-50 p-5 border-b border-slate-200 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                          {plan.destination}
                        </span>
                        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full capitalize">
                          {plan.transportMode}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">{plan.name}</h3>
                      <p className="text-xs text-slate-500">
                        {plan.startDate} to {plan.endDate} • {plan.travelersCount} Traveler(s)
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm('Delete this plan?')) deletePlan(plan.id);
                      }}
                      className="text-xs text-red-500 hover:text-red-700 font-semibold"
                    >
                      Delete
                    </button>
                  </div>

                  {/* Day-by-Day Timeline */}
                  <div className="p-5 flex-1 space-y-6">
                    {plan.itinerary.map(day => (
                      <div key={day.id} className="space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                            Day {day.dayNumber}: {day.title}
                          </h4>
                        </div>

                        <div className="space-y-2.5">
                          {day.items.map(item => (
                            <div
                              key={item.id}
                              className={`p-3 rounded-xl border transition flex items-center justify-between gap-3 ${
                                item.visited
                                  ? 'bg-green-50/70 border-green-200 text-green-950'
                                  : 'bg-white border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                                    {item.time}
                                  </span>
                                  <span className="font-semibold text-xs text-slate-800 truncate">
                                    {item.location}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-500 line-clamp-1">{item.description}</p>
                                {item.bookingUrl && (
                                  <a href={item.bookingUrl} target="_blank" rel="noreferrer" className="text-[10px] text-blue-600 hover:underline flex items-center gap-1 mt-1 font-semibold">
                                    <ExternalLink className="w-2.5 h-2.5" /> Booking Link
                                  </a>
                                )}
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                <span className="text-xs font-bold text-slate-700">₹{item.cost}</span>
                                <button
                                  onClick={() => toggleItemVisited(plan.id, day.id, item.id)}
                                  className={`p-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 transition ${
                                    item.visited
                                      ? 'bg-green-600 text-white border-green-600 shadow-sm'
                                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
                                  }`}
                                  title={item.visited ? 'Mark as Pending' : 'Mark as Visited / Booked'}
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span className="hidden sm:inline">
                                    {item.visited ? 'Visited' : 'Check-off'}
                                  </span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Plan Footer */}
                  <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-500">Estimated Total Expenditure:</span>
                    <span className="text-base font-extrabold text-slate-900">
                      ₹{plan.totalExpenses.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PLAN DETAIL MODAL (EXPLORE FULL ROUTE) */}
      {selectedViewingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="relative h-48 bg-slate-900">
              <img
                src={selectedViewingPlan.coverImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80'}
                alt={selectedViewingPlan.name}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <button
                onClick={() => setSelectedViewingPlan(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-[10px] font-extrabold bg-blue-600 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {selectedViewingPlan.destination}
                </span>
                <h3 className="text-xl font-bold mt-1 leading-snug">{selectedViewingPlan.name}</h3>
                <p className="text-xs text-slate-300">
                  {selectedViewingPlan.itinerary.length} Days • {selectedViewingPlan.travelersCount} Travelers • Total Budget: ₹{selectedViewingPlan.totalExpenses.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              {selectedViewingPlan.itinerary.map(day => (
                <div key={day.id} className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                    <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                      Day {day.dayNumber}: {day.title}
                    </h4>
                  </div>

                  <div className="space-y-2.5">
                    {day.items.map(item => (
                      <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-3 text-xs">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-[10px] text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">
                              {item.time}
                            </span>
                            <span className="font-bold text-slate-800">{item.location}</span>
                            <span className="text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 px-1.5 py-0.2 rounded capitalize">
                              {item.type}
                            </span>
                          </div>
                          <p className="text-slate-600">{item.description}</p>
                          {item.bookingUrl && (
                            <a
                              href={item.bookingUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600 hover:underline font-bold text-[11px] inline-flex items-center gap-1 mt-1"
                            >
                              <ExternalLink className="w-3 h-3" /> Booking / Map Information
                            </a>
                          )}
                        </div>

                        <span className="font-extrabold text-slate-800 shrink-0 text-sm">
                          ₹{item.cost}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500">Estimated Total:</span>
                <span className="text-base font-extrabold text-slate-900 ml-1.5">
                  ₹{selectedViewingPlan.totalExpenses.toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => {
                  handleSaveToMyTrips(selectedViewingPlan);
                  setSelectedViewingPlan(null);
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/25 flex items-center gap-1.5 transition"
              >
                <BookmarkPlus className="w-4 h-4" /> Save to My Trips & Track
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Trip Planner Modal */}
      <AITripPlannerModal
        isOpen={isPlannerOpen}
        onClose={() => setIsPlannerOpen(false)}
        initialDestination={plannerDestination}
      />
    </div>
  );
}
