import { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useAppStore } from '../../store';
import { seedPlans } from '../../data/seed';
import type { TripPlan } from '../../types';
import { 
  decodePlanFromDataString, 
  generateShareablePlanUrl, 
  copyPlanShareLink, 
  downloadPlanAsPdf 
} from '../../utils/pdfGenerator';
import { 
  Compass, MapPin, Calendar, 
  Download, Share2, BookmarkPlus, CheckCircle2, ArrowLeft, 
  Navigation, Route, Info, Check, MessageCircle, X
} from 'lucide-react';

export default function SharedPlanView() {
  const { planId } = useParams<{ planId: string }>();
  const [searchParams] = useSearchParams();
  const { plans, addPlan } = useAppStore();

  const [copiedToast, setCopiedToast] = useState(false);
  const [savedToast, setSavedToast] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Resolve plan from URL payload or store
  const plan: TripPlan | null = useMemo(() => {
    // 1. Try URL encoded payload first (cross-device universal link)
    const dataParam = searchParams.get('data');
    if (dataParam) {
      const decoded = decodePlanFromDataString(dataParam);
      if (decoded) return decoded;
    }

    // 2. Try looking up in local app store by ID
    if (planId && plans) {
      const match = plans.find(p => p.id === planId);
      if (match) return match;
    }

    // 3. Fallback to seed plans
    if (planId) {
      const seedMatch = seedPlans.find(p => p.id === planId);
      if (seedMatch) return seedMatch;
    }

    // 4. Default to first available plan if any
    return plans?.[0] || seedPlans[0] || null;
  }, [planId, searchParams, plans]);

  if (!plan) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-xl border border-slate-200 space-y-4">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <Compass className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Trip Plan Not Found</h2>
          <p className="text-xs text-slate-500">
            The trip plan link might have expired or is incomplete. Explore more travel routes on PlanTriper.
          </p>
          <Link
            to="/traveler"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition"
          >
            <Compass className="w-4 h-4" /> Go to Traveler Portal
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = generateShareablePlanUrl(plan);

  const handleCopy = async () => {
    await copyPlanShareLink(plan);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 3500);
  };

  const handleSaveToMyTrips = () => {
    // Avoid duplicate IDs
    const exists = plans.some(p => p.id === plan.id);
    if (!exists) {
      addPlan(plan);
    }
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3500);
  };

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `Check out our trip itinerary for ${plan.destination}: "${plan.name}" on PlanTriper!\n${shareUrl}`
  )}`;

  return (
    <div className="min-h-screen bg-slate-100/70 pb-16">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            to="/traveler"
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-600 transition flex items-center gap-1.5 text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Traveler Portal</span>
          </Link>
          <div className="h-5 w-px bg-slate-200" />
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 bg-blue-600 text-white rounded-lg flex items-center justify-center font-black text-xs shadow-sm">
              PT
            </span>
            <span className="font-extrabold text-sm text-slate-900 tracking-tight">
              Plan<span className="text-blue-600">Triper</span>
            </span>
            <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full hidden sm:inline-block">
              Shared Itinerary View
            </span>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => downloadPlanAsPdf(plan)}
            className="px-3 sm:px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5"
            title="Download formatted PDF or print"
          >
            <Download className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Download</span> PDF
          </button>

          <button
            onClick={() => setIsShareModalOpen(true)}
            className="px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span> Link
          </button>

          <button
            onClick={handleSaveToMyTrips}
            className="px-3 sm:px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
          >
            {savedToast ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <BookmarkPlus className="w-3.5 h-3.5 text-blue-600" />
            )}
            <span className="hidden sm:inline">{savedToast ? 'Saved!' : 'Save to My Trips'}</span>
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Floating Notification Banners */}
        {copiedToast && (
          <div className="p-3.5 bg-blue-600 text-white text-xs font-bold rounded-2xl flex items-center justify-between shadow-lg animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Shareable plan link copied to your clipboard!</span>
            </div>
            <span className="text-[11px] text-blue-200">Ready to paste &amp; send</span>
          </div>
        )}

        {savedToast && (
          <div className="p-3.5 bg-emerald-600 text-white text-xs font-bold rounded-2xl flex items-center justify-between shadow-lg animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Itinerary saved to your &quot;My Saved Trips&quot; list!</span>
            </div>
            <Link to="/traveler" className="underline text-[11px] font-bold text-emerald-100">
              View in My Trips &rarr;
            </Link>
          </div>
        )}

        {/* Hero Card */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white shadow-xl min-h-[300px] flex flex-col justify-end p-6 sm:p-8">
          <img
            src={plan.coverImage || 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=80'}
            alt={plan.name}
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-blue-600/90 backdrop-blur text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                📍 {plan.destination || plan.city}
              </span>
              <span className="bg-amber-400 text-slate-950 text-[11px] font-extrabold px-2.5 py-0.8 rounded-full">
                {plan.itinerary?.length || 1} Day Itinerary
              </span>
              {plan.sourceFileType === 'manual' && (
                <span className="bg-white/20 backdrop-blur text-white text-[11px] font-semibold px-2.5 py-0.8 rounded-full">
                  Custom Arranged Plan
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              {plan.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl line-clamp-2">
              {plan.notes || `Curated travel itinerary featuring verified spots, beaches, heritage sights, and driving route in ${plan.destination}.`}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/20 text-xs">
              <div className="bg-white/10 backdrop-blur rounded-xl p-2.5">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Estimated Cost</span>
                <span className="text-white font-extrabold text-sm sm:text-base">
                  ₹{(plan.totalExpenses || 0).toLocaleString()}
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-xl p-2.5">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Travelers</span>
                <span className="text-white font-bold text-sm">
                  {plan.travelersCount || 2} Persons
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-xl p-2.5">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Transport</span>
                <span className="text-white font-bold text-sm capitalize">
                  {plan.transportMode || 'Rental Bike/Car'}
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-xl p-2.5">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Stops</span>
                <span className="text-amber-300 font-bold text-sm">
                  {plan.itinerary?.reduce((acc, d) => acc + (d.items?.length || 0), 0)} Verified Spots
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Day-by-Day Schedule */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" /> Complete Daily Schedule
            </h2>
            <button
              onClick={() => downloadPlanAsPdf(plan)}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition"
            >
              <Download className="w-3.5 h-3.5" /> Print / Save PDF
            </button>
          </div>

          <div className="space-y-6">
            {(plan.itinerary || []).map((day) => (
              <div
                key={day.id}
                className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4"
              >
                {/* Day Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="bg-blue-600 text-white font-extrabold text-xs px-3 py-1 rounded-xl shadow-sm">
                      Day {day.dayNumber}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-800">
                      {day.title || `Day ${day.dayNumber} Highlights`}
                    </h3>
                  </div>

                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {day.items?.length || 0} Activities
                  </span>
                </div>

                {/* Day Route Navigation Banner (if route was arranged) */}
                {day.routeMapUrl && (
                  <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-800 font-extrabold text-xs flex items-center gap-1">
                          <Route className="w-4 h-4 text-emerald-600" /> Multi-Stop Driving Route Map
                        </span>
                        {day.totalDistanceKm && (
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                            🚗 {day.totalDistanceKm} km total
                          </span>
                        )}
                        {day.totalDriveMinutes && (
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                            ⏱️ ~{day.totalDriveMinutes} mins drive
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600">
                        Optimized travel sequence between selected landmarks.
                      </p>
                    </div>

                    <a
                      href={day.routeMapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition shrink-0"
                    >
                      <Navigation className="w-3.5 h-3.5 text-amber-300" /> 🗺️ Open in Google Maps
                    </a>
                  </div>
                )}

                {/* Items Timeline */}
                <div className="space-y-3 pt-1">
                  {(day.items || []).map((item) => (
                    <div key={item.id} className="space-y-1.5">
                      
                      {/* Transit Connector */}
                      {item.transitFromPrevious && (
                        <div className="flex items-center gap-2 pl-6 py-0.5 text-[11px] text-slate-500 font-semibold">
                          <div className="w-0.5 h-4 bg-emerald-400 rounded-full" />
                          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            <Navigation className="w-3 h-3 text-emerald-600" />
                            🚗 {item.transitFromPrevious.distanceKm} km • ~{item.transitFromPrevious.durationMinutes} mins drive
                          </span>
                        </div>
                      )}

                      <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200 flex items-start justify-between gap-3.5 hover:bg-slate-50 transition">
                        <div className="flex items-start gap-3.5 flex-1 min-w-0">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.location}
                              className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-sm"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-slate-200 text-slate-600 rounded-xl flex items-center justify-center shrink-0">
                              <MapPin className="w-6 h-6 text-blue-600" />
                            </div>
                          )}

                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[11px] font-black text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-md">
                                ⏰ {item.time}
                              </span>
                              <h4 className="font-bold text-sm text-slate-900 truncate">
                                {item.location}
                              </h4>
                              <span className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded capitalize">
                                {item.type}
                              </span>

                              {item.idealTimingBadge && (
                                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                                  {item.idealTimingBadge}
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-slate-600 line-clamp-2">
                              {item.description}
                            </p>

                            {/* Informative Tip */}
                            {item.eventTip && (
                              <div className="text-[11px] text-amber-900 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-lg flex items-start gap-1.5 mt-1">
                                <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                                <span>{item.eventTip}</span>
                              </div>
                            )}

                            {/* Spot Google Maps link */}
                            {item.googleMapUrl && (
                              <div className="pt-1">
                                <a
                                  href={item.googleMapUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs text-blue-600 hover:underline font-bold inline-flex items-center gap-1"
                                >
                                  <MapPin className="w-3.5 h-3.5 text-red-500" /> Google Maps Location &rarr;
                                </a>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">Estimated</span>
                          <span className="font-bold text-sm text-slate-900">
                            {item.cost ? `₹${item.cost.toLocaleString()}` : 'Free Entry'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Explorer CTA */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div>
            <h3 className="text-xl font-bold">Create Your Own Custom Itinerary</h3>
            <p className="text-xs text-blue-100 mt-1 max-w-lg">
              Explore 49 verified beaches, churches, temples, hotels, and bike rentals in Goa with turn-by-turn routing.
            </p>
          </div>
          <Link
            to="/traveler"
            className="px-6 py-3 bg-white hover:bg-slate-100 text-blue-900 font-extrabold text-xs sm:text-sm rounded-xl shadow transition shrink-0"
          >
            Start Planning Free &rarr;
          </Link>
        </div>
      </main>

      {/* SHARE MODAL DIALOG */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <Share2 className="w-5 h-5" />
                </span>
                <h3 className="text-base font-bold text-slate-900">Share Trip Plan</h3>
              </div>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Anyone with this link can view this full itinerary, daily timetable, and open the Google Maps navigation routes.
            </p>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Direct Shareable Link
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-xl bg-slate-50 text-slate-700 outline-none select-all"
                />
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow shrink-0 transition"
                >
                  {copiedToast ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="pt-2 flex items-center gap-2">
              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow transition"
              >
                <MessageCircle className="w-4 h-4" /> Share on WhatsApp
              </a>

              <button
                onClick={() => {
                  downloadPlanAsPdf(plan);
                  setIsShareModalOpen(false);
                }}
                className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow transition"
              >
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
