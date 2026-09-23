import { useState, useRef, useMemo } from 'react';
import { useAppStore, defaultTheme } from '../../store';
import { 
  Palette, CheckCircle, Share2, Copy, Check, Megaphone, 
  Building, Star, Upload, Trash2, Plus, RotateCcw, 
  ExternalLink, Eye, Compass, FileText, Sparkles, 
  CheckCircle2, MapPin, Church, Waves, Bike, DollarSign,
  Phone, Globe, Search, Utensils
} from 'lucide-react';
import type { Service, ServiceType } from '../../types';
import { convertTextToTripPlan, type ConvertedPlanResult } from '../../utils/planFileConverter';
import { ManualTripPlannerModal } from '../../components/planner/ManualTripPlannerModal';

export default function AdminDashboard() {
  const { 
    theme = defaultTheme, 
    setTheme, 
    services = [], 
    addService, 
    updateServiceStatus,
    deleteService, 
    adBanners = [], 
    addAdBanner, 
    deleteAdBanner, 
    shareLinks = [], 
    addShareLink, 
    deleteShareLink, 
    plans = [],
    addPlan,
    deletePlan,
    destinations,
    resetAll 
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'create-place' | 'manual-planner' | 'upload-plan' | 'share' | 'approvals' | 'theme' | 'ads'>('create-place');
  
  // Theme state
  const [appName, setAppName] = useState(theme?.appName || 'PlanTriper');
  const [tagline, setTagline] = useState(theme?.tagline || 'Plan Your Route & Discover Destinations Easily');
  const [primaryColor] = useState(theme?.primaryColor || '#2563eb');
  const [gradientStart, setGradientStart] = useState(theme?.gradientStart || '#1d4ed8');
  const [gradientEnd, setGradientEnd] = useState(theme?.gradientEnd || '#7c3aed');
  const [gradientDirection] = useState(theme?.gradientDirection || 'to right');
  const [logoPreview, setLogoPreview] = useState(theme?.logoUrl || '');
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Manual Place Creation State
  const [placeName, setPlaceName] = useState('');
  const [placeType, setPlaceType] = useState<ServiceType>('hotel');
  const [country, setCountry] = useState('India');
  const [customCountry, setCustomCountry] = useState('');
  const [city, setCity] = useState('Kochi');
  const [customCity, setCustomCity] = useState('');
  const [placeArea, setPlaceArea] = useState('Fort Kochi');
  const [postalCode, setPostalCode] = useState('682001');
  const [address, setAddress] = useState('');
  const [googleMapUrl, setGoogleMapUrl] = useState('');
  const [contact, setContact] = useState('');
  const [website, setWebsite] = useState('');
  const [googleRating, setGoogleRating] = useState('4.7');
  const [priceLevel] = useState('Moderate');
  const [pricePerDay, setPricePerDay] = useState('');
  const [description, setDescription] = useState('');
  const [placeImages, setPlaceImages] = useState<string[]>([]);
  const [placeCreateSuccess, setPlaceCreateSuccess] = useState(false);
  const placeImageInputRef = useRef<HTMLInputElement>(null);

  // Manual Planner Modal
  const [isManualPlannerOpen, setIsManualPlannerOpen] = useState(false);
  const [adminFilterCity, setAdminFilterCity] = useState<string>('all');
  const [adminSearchPlace, setAdminSearchPlace] = useState('');

  // Share Link state
  const [linkLabel, setLinkLabel] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Ad state
  const [adTitle, setAdTitle] = useState('');
  const [adSubtitle, setAdSubtitle] = useState('');
  const [adLink, setAdLink] = useState('https://');
  const [adTag] = useState('Promotion');
  const [adImage, setAdImage] = useState('');
  const adImageInputRef = useRef<HTMLInputElement>(null);

  // Plan File Upload & Convert state
  const planFileInputRef = useRef<HTMLInputElement>(null);
  const planCoverInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadedFileType, setUploadedFileType] = useState<'pdf' | 'docx' | 'zip' | 'text' | 'manual'>('text');
  const [planCoverImage, setPlanCoverImage] = useState('');
  const [planRawText, setPlanRawText] = useState('');
  const [selectedPlanDest, setSelectedPlanDest] = useState(destinations[0]?.name || 'Kochi');
  const [conversionResult, setConversionResult] = useState<ConvertedPlanResult | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  const pendingServices = (services || []).filter(s => s && s.status === 'pending');
  const approvedServices = (services || []).filter(s => s && s.status === 'approved');
  const curatedPlans = (plans || []).filter(p => p.isCuratedByAdmin || p.sourceFileType === 'manual');

  // Distinct cities list from added services
  const distinctCities = useMemo(() => {
    const set = new Set<string>();
    (services || []).forEach(s => {
      if (s.city) set.add(s.city.trim());
      else if (s.destination) set.add(s.destination.trim());
    });
    return Array.from(set).filter(Boolean);
  }, [services]);

  // Handle Logo File Upload (PNG, JPEG, SVG, WebP)
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/^image\/(png|jpeg|jpg|webp|svg\+xml)$/)) {
      alert('Please upload a PNG, JPEG, SVG, or WebP image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setLogoPreview(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Place Images Upload
  const handlePlaceImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (!file.type.match(/^image\/(png|jpeg|jpg|webp)$/)) {
        alert('Please upload PNG, JPEG, or WebP images only.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPlaceImages(prev => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Create Manually New Spot / Service
  const handleCreatePlaceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCountry = country === 'other' ? (customCountry || 'India') : country;
    const finalCity = city === 'other' ? (customCity || 'Kochi') : city;

    if (!placeName.trim() || !finalCity.trim()) {
      alert('Please enter place name and city.');
      return;
    }

    // Auto generate Google Map URL if not provided
    const finalMapUrl = googleMapUrl.trim() || `https://maps.google.com/?q=${encodeURIComponent(`${placeName} ${placeArea} ${finalCity}`)}`;

    const defaultImg = placeType === 'hotel' 
      ? 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
      : placeType === 'church'
      ? 'https://images.unsplash.com/photo-1548625361-195fe61a55c3?auto=format&fit=crop&w=800&q=80'
      : placeType === 'beach'
      ? 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
      : placeType === 'rental'
      ? 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80'
      : 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80';

    const newSpot: Service = {
      id: `spot_${Date.now()}`,
      providerId: 'admin_manual',
      providerName: 'Admin Verified Entry',
      providerEmail: 'admin@plantriper.com',
      type: placeType,
      status: 'approved',
      name: placeName,
      country: finalCountry,
      city: finalCity,
      place: placeArea || finalCity,
      postalCode: postalCode || '',
      destination: finalCity,
      address: address || `${placeArea ? `${placeArea}, ` : ''}${finalCity}, ${finalCountry}`,
      googleMapUrl: finalMapUrl,
      contact: contact || '+91 484 0000 000',
      website: website || undefined,
      googleRating: parseFloat(googleRating) || 4.7,
      priceLevel,
      pricePerDay: pricePerDay ? parseFloat(pricePerDay) : undefined,
      description: description || `Verified ${placeType} in ${placeArea ? `${placeArea}, ` : ''}${finalCity}.`,
      images: placeImages.length > 0 ? placeImages : [defaultImg],
      featured: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    addService(newSpot);
    setPlaceCreateSuccess(true);
    setTimeout(() => setPlaceCreateSuccess(false), 3000);

    // Reset inputs
    setPlaceName('');
    setAddress('');
    setGoogleMapUrl('');
    setContact('');
    setWebsite('');
    setPricePerDay('');
    setDescription('');
    setPlaceImages([]);
    alert(`Successfully added "${newSpot.name}" in ${finalCity}! It is now available for manual trip planning and traveler searches.`);
  };

  // Handle Plan Document File Upload (PDF, Word, ZIP, TXT)
  const handlePlanFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const name = file.name;
    setUploadedFileName(name);

    let type: 'pdf' | 'docx' | 'zip' | 'text' | 'manual' = 'text';
    if (name.endsWith('.pdf')) type = 'pdf';
    else if (name.endsWith('.docx') || name.endsWith('.doc')) type = 'docx';
    else if (name.endsWith('.zip')) type = 'zip';
    else type = 'text';

    setUploadedFileType(type);

    const reader = new FileReader();
    if (type === 'text') {
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setPlanRawText(text);
        processAndStructurePlan(text, name, type);
      };
      reader.readAsText(file);
    } else {
      reader.onload = (event) => {
        const buffer = event.target?.result as ArrayBuffer;
        const uint8Array = new Uint8Array(buffer);
        let extractedString = '';
        for (let i = 0; i < Math.min(uint8Array.length, 30000); i++) {
          const charCode = uint8Array[i];
          if ((charCode >= 32 && charCode <= 126) || charCode === 10 || charCode === 13) {
            extractedString += String.fromCharCode(charCode);
          } else {
            extractedString += ' ';
          }
        }
        const cleanContent = extractedString.replace(/\s{3,}/g, '\n').trim();
        const fallbackText = cleanContent.length > 50 
          ? cleanContent 
          : `Day 1: Arrival & Exploring ${selectedPlanDest}\n- 10:00 AM: Arrival and check-in to resort (Cost: ₹4500) https://booking.com\n- 01:30 PM: Traditional lunch at local restaurant (Cost: ₹1200)\n- 05:00 PM: Sunset beach and cultural viewpoint (Cost: ₹300)\n\nDay 2: Adventure & Heritage\n- 09:30 AM: Guided landmark tour and photo walk (Cost: ₹800)\n- 02:00 PM: Scenic cafe dining (Cost: ₹1500)\n- 07:00 PM: Evening river cruise and music (Cost: ₹1800)`;

        setPlanRawText(fallbackText);
        processAndStructurePlan(fallbackText, name, type);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const processAndStructurePlan = (
    textToParse: string, 
    fileName = uploadedFileName || 'Imported_Trip_Plan.txt', 
    fileType = uploadedFileType
  ) => {
    const result = convertTextToTripPlan(
      textToParse, 
      fileName, 
      fileType, 
      selectedPlanDest, 
      planCoverImage
    );
    setConversionResult(result);
  };

  const handlePublishPlan = () => {
    if (!conversionResult) return;
    setIsPublishing(true);

    setTimeout(() => {
      addPlan(conversionResult.plan);
      setIsPublishing(false);
      setPublishSuccess(true);
      setTimeout(() => setPublishSuccess(false), 3000);
      alert(`Trip Plan "${conversionResult.plan.name}" published! It is now accessible on the Traveler site.`);
    }, 600);
  };

  const handleSaveTheme = () => {
    setTheme({
      appName,
      tagline,
      primaryColor,
      gradientStart,
      gradientEnd,
      gradientDirection,
      logoUrl: logoPreview
    });
    alert('Brand, Logo, and Gradient Theme updated successfully!');
  };

  // Generate traveler share link
  const getTravelerShareUrl = (code = 'traveler-portal') => {
    const origin = window.location.origin;
    const pathname = window.location.pathname.replace(/\/$/, '');
    return `${origin}${pathname}/#/traveler?ref=${code}`;
  };

  const handleCopyLink = (code: string) => {
    const url = getTravelerShareUrl(code);
    navigator.clipboard.writeText(url);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredAdminServices = (services || []).filter(s => {
    const matchCity = adminFilterCity === 'all' || (s.city && s.city.toLowerCase() === adminFilterCity.toLowerCase());
    const matchSearch = !adminSearchPlace || 
      s.name.toLowerCase().includes(adminSearchPlace.toLowerCase()) ||
      s.place?.toLowerCase().includes(adminSearchPlace.toLowerCase()) ||
      s.type.toLowerCase().includes(adminSearchPlace.toLowerCase());
    return matchCity && matchSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Top Admin Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">Admin Control Center</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manually create Hotels, Shops, Bike Rentals, Beaches & Churches by City/Postal Code with Google Maps
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsManualPlannerOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-500/20 transition"
          >
            <Sparkles className="w-3.5 h-3.5" /> Make Manual Trip Plan
          </button>

          <a
            href={getTravelerShareUrl()}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-bold transition border border-blue-200"
          >
            <Eye className="w-3.5 h-3.5" /> Traveler Site
          </a>

          <button
            onClick={() => {
              if (confirm('Reset database to clean slate?')) {
                resetAll();
                window.location.reload();
              }
            }}
            className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
            title="Reset Data"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      {/* Primary Traveler Share Link Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 rounded-3xl text-white shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
              📢 Public Traveler Community Link
            </span>
            <h3 className="text-xl font-bold mt-1">Share This Link for Travelers to Access Major Dashboard</h3>
            <p className="text-xs text-blue-100">
              Users clicking this link directly access city searches (e.g. Kochi), view spots on Google Maps, and create plans.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleCopyLink('traveler-portal')}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-2"
            >
              {copiedCode === 'traveler-portal' ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy Traveler Share Link
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-black/30 p-3 rounded-xl font-mono text-xs text-blue-200 select-all break-all border border-white/10">
          {getTravelerShareUrl('traveler-portal')}
        </div>
      </div>

      {/* Admin Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'create-place', label: 'Create Place / Service Manually', icon: MapPin, highlight: true },
          { id: 'manual-planner', label: 'Make Manual Trip Plan', icon: Sparkles },
          { id: 'upload-plan', label: 'Upload Plan (PDF/Word/ZIP)', icon: FileText },
          { id: 'share', label: 'Share Link Generator', icon: Share2 },
          { 
            id: 'approvals', 
            label: `Provider Approvals (${pendingServices.length})`, 
            icon: CheckCircle,
            badge: pendingServices.length > 0
          },
          { id: 'theme', label: 'Brand & Gradients', icon: Palette },
          { id: 'ads', label: 'Custom Ads', icon: Megaphone },
        ].map(({ id, label, icon: Icon, badge, highlight }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
              activeTab === id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : highlight
                ? 'bg-emerald-50 border border-emerald-300 text-emerald-900 hover:bg-emerald-100'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
            {badge && (
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: CREATE PLACE / SERVICE MANUALLY (HOTELS, SHOPS, RENTALS, BEACHES, CHURCHES, SPOTS) */}
      {activeTab === 'create-place' && (
        <div className="space-y-8">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                Admin Exclusive Creation Tool
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                Create Place / Service with Geographic Indexing & Google Maps
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Manually add Hotel details, Shop details, Bike rentals, Beaches, Churches, and other spots. Categorize by Country, City, Place/Neighborhood, and Postal Code so travelers can search & choose for trips.
              </p>
            </div>

            {placeCreateSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-2xl flex items-center gap-2 text-xs font-bold animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Place successfully added and indexed under {city}! Available for traveler searches and manual trip planning.</span>
              </div>
            )}

            <form onSubmit={handleCreatePlaceSubmit} className="space-y-6">
              {/* Category Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  1. Select Category *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                  {[
                    { type: 'hotel', label: 'Hotel & Stay', icon: Building },
                    { type: 'shop', label: 'Shop / Market', icon: DollarSign },
                    { type: 'rental', label: 'Bike Rental', icon: Bike },
                    { type: 'beach', label: 'Beach', icon: Waves },
                    { type: 'church', label: 'Church / Temple', icon: Church },
                    { type: 'restaurant', label: 'Restaurant', icon: Utensils },
                    { type: 'spot', label: 'Tourist Spot', icon: Compass },
                  ].map(({ type, label, icon: Icon }) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPlaceType(type as ServiceType)}
                      className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 text-center transition ${
                        placeType === type
                          ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-[11px] leading-tight">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Geographic Details: Country, City, Place Area, Postal Code */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-600" /> 2. Geographic & Location Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Country Selection */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Country *</label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-semibold border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="India">India</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Indonesia">Indonesia</option>
                      <option value="France">France</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Thailand">Thailand</option>
                      <option value="other">+ Enter Other Country</option>
                    </select>
                    {country === 'other' && (
                      <input
                        type="text"
                        placeholder="Enter Country Name"
                        value={customCountry}
                        onChange={(e) => setCustomCountry(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl mt-1.5"
                      />
                    )}
                  </div>

                  {/* City Selection */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">City / Destination *</label>
                    <div className="space-y-1.5">
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-semibold border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Kochi">Kochi</option>
                        {distinctCities.filter(c => c.toLowerCase() !== 'kochi').map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                        <option value="other">+ Add New City</option>
                      </select>
                      {city === 'other' && (
                        <input
                          type="text"
                          required
                          placeholder="e.g. Munnar, Wayanad, Paris..."
                          value={customCity}
                          onChange={(e) => setCustomCity(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl"
                        />
                      )}
                    </div>
                  </div>

                  {/* Place / Neighborhood */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Place / Neighborhood *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Fort Kochi, Marine Drive"
                      value={placeArea}
                      onChange={(e) => setPlaceArea(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Postal Code / PIN *</label>
                    <input
                      type="text"
                      placeholder="e.g. 682001"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Google Maps URL & Physical Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Full Street Address</label>
                    <input
                      type="text"
                      placeholder="e.g. 1/498 Calvathy Road, Fort Kochi"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-blue-700">Google Map Link (Navigation URL)</label>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${placeName || 'Hotel'} ${placeArea} ${city === 'other' ? customCity : city}`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <ExternalLink className="w-2.5 h-2.5" /> Find on Google Maps
                      </a>
                    </div>
                    <input
                      type="url"
                      placeholder="https://maps.google.com/?q=..."
                      value={googleMapUrl}
                      onChange={(e) => setGoogleMapUrl(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Spot / Business Details */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  3. Spot & Service Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-700 mb-1">Name of Place / Business *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Brunton Boatyard Hotel / St. Francis Church / Cherai Beach"
                      value={placeName}
                      onChange={(e) => setPlaceName(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Google Review Rating</label>
                    <div className="relative">
                      <Star className="w-4 h-4 absolute left-3 top-2.5 text-amber-500 fill-current" />
                      <input
                        type="number"
                        step="0.1"
                        min="1"
                        max="5"
                        value={googleRating}
                        onChange={(e) => setGoogleRating(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Contact Phone / WhatsApp</label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="tel"
                        placeholder="+91 484 221 5461"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs border border-slate-300 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Website / Booking Link</label>
                    <div className="relative">
                      <Globe className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="url"
                        placeholder="https://example.com"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs border border-slate-300 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Est. Daily Rate / Ticket (₹)</label>
                    <input
                      type="number"
                      placeholder="e.g. 650 (or 0 for beaches/churches)"
                      value={pricePerDay}
                      onChange={(e) => setPricePerDay(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Description & Highlights</label>
                  <textarea
                    rows={2}
                    placeholder="Highlight historical significance, amenities, scooter models, special offerings..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Photo Upload */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Photos (PNG, JPEG, WebP)
                    </label>
                    <span className="text-[11px] text-slate-400">{placeImages.length} photo(s) selected</span>
                  </div>

                  <input
                    ref={placeImageInputRef}
                    type="file"
                    multiple
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    onChange={handlePlaceImageUpload}
                    className="hidden"
                  />

                  <div
                    onClick={() => placeImageInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-blue-50/40 rounded-2xl p-5 text-center cursor-pointer transition"
                  >
                    <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                    <p className="text-xs font-bold text-slate-700">Click to Browse Photos (PNG, JPEG, WebP)</p>
                  </div>

                  {placeImages.length > 0 && (
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mt-3">
                      {placeImages.map((img, idx) => (
                        <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 group">
                          <img src={img} alt="Place" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setPlaceImages(prev => prev.filter((_, i) => i !== idx))}
                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition shadow"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-500/25 flex items-center gap-2 transition"
                >
                  <Plus className="w-4 h-4" /> Save & Index Place Details
                </button>
              </div>
            </form>
          </div>

          {/* Directory of All Added Places Grouped by City */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  Manage Added Places & Spots ({approvedServices.length})
                </h3>
                <p className="text-xs text-slate-500">
                  All verified spots available for traveler searches and manual trip planning
                </p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={adminFilterCity}
                  onChange={(e) => setAdminFilterCity(e.target.value)}
                  className="px-3 py-1.5 text-xs font-bold border border-slate-300 rounded-xl bg-white"
                >
                  <option value="all">All Cities ({distinctCities.length})</option>
                  {distinctCities.map(c => (
                    <option key={c} value={c}>📍 {c}</option>
                  ))}
                </select>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search spots..."
                    value={adminSearchPlace}
                    onChange={(e) => setAdminSearchPlace(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-xl bg-white w-40 sm:w-56"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAdminServices.map(service => (
                <div key={service.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between group">
                  <div className="space-y-2">
                    <div className="h-36 rounded-xl overflow-hidden relative bg-slate-100">
                      <img src={service.images[0]} alt={service.name} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                        📍 {service.city || service.destination}
                      </span>
                      <span className="absolute top-2 right-2 bg-white text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded shadow capitalize">
                        {service.type}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-800 text-sm leading-tight">{service.name}</h4>
                    <p className="text-[11px] text-slate-500 truncate">
                      {service.place ? `${service.place}, ` : ''}{service.city} {service.postalCode ? `(${service.postalCode})` : ''}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-2">{service.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
                    {service.googleMapUrl ? (
                      <a
                        href={service.googleMapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1 font-bold text-[11px]"
                      >
                        <MapPin className="w-3 h-3 text-red-500" /> Google Maps
                      </a>
                    ) : <span className="text-slate-400 text-[10px]">No Map link</span>}

                    <button
                      onClick={() => {
                        if (confirm(`Delete "${service.name}"?`)) deleteService(service.id);
                      }}
                      className="text-red-500 hover:text-red-700 text-xs font-semibold p-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {filteredAdminServices.length === 0 && (
                <div className="col-span-full text-center py-12 text-slate-400 text-xs">
                  No places found for this filter. Use the form above to add new spots!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MAKE MANUAL TRIP PLAN */}
      {activeTab === 'manual-planner' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Manual Trip Route Planner</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Choose any city (e.g. Kochi) and build a multi-day itinerary by selecting from all your manually added hotels, shops, rentals, beaches, and churches.
          </p>
          <button
            onClick={() => setIsManualPlannerOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition"
          >
            Open Manual Trip Route Planner
          </button>
        </div>
      )}

      {/* TAB 3: UPLOAD & CONVERT PLANS (PDF/WORD/ZIP) */}
      {activeTab === 'upload-plan' && (
        <div className="space-y-8">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full">
                  AI Plan Formatter Engine
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  Upload & Convert Trip Plans (ZIP, PDF, Word, TXT)
                </h3>
                <p className="text-xs text-slate-500">
                  Upload complete trip itineraries from documents, archives, or formatted notes. We extract times, locations, links, costs, and images into structured plans for users.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600 font-semibold">Target City:</span>
                <select
                  value={selectedPlanDest}
                  onChange={(e) => {
                    setSelectedPlanDest(e.target.value);
                    if (planRawText) processAndStructurePlan(planRawText, uploadedFileName, uploadedFileType);
                  }}
                  className="px-3 py-1.5 text-xs font-bold border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Kochi">Kochi</option>
                  {distinctCities.filter(c => c.toLowerCase() !== 'kochi').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                  <option value="Global">Global / Other</option>
                </select>
              </div>
            </div>

            {/* Upload Boxes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  1. Upload Trip File (PDF, DOCX, ZIP, TXT, JSON) *
                </label>
                <input
                  ref={planFileInputRef}
                  type="file"
                  accept=".pdf, .docx, .doc, .zip, .txt, .json, .md"
                  onChange={handlePlanFileUpload}
                  className="hidden"
                />

                <div
                  onClick={() => planFileInputRef.current?.click()}
                  className="border-2 border-dashed border-blue-300 hover:border-blue-600 bg-blue-50/40 hover:bg-blue-50/80 rounded-2xl p-6 text-center cursor-pointer transition group min-h-[160px] flex flex-col items-center justify-center"
                >
                  <FileText className="w-10 h-10 text-blue-500 group-hover:scale-110 transition duration-300 mb-2" />
                  <p className="text-sm font-bold text-slate-800">
                    {uploadedFileName ? `Selected: ${uploadedFileName}` : 'Click to Upload Trip Document'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Supports .pdf, .docx (Word), .zip (archive), .txt, .json
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  2. Cover Photo for Showcase (PNG, JPEG, WebP)
                </label>
                <input
                  ref={planCoverInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      if (event.target?.result) setPlanCoverImage(event.target.result as string);
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="hidden"
                />

                <div
                  onClick={() => planCoverInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-slate-100/70 rounded-2xl p-6 text-center cursor-pointer transition min-h-[160px] flex flex-col items-center justify-center overflow-hidden relative"
                >
                  {planCoverImage ? (
                    <div className="relative w-full h-32 rounded-xl overflow-hidden">
                      <img src={planCoverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">
                        Change Photo
                      </span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-10 h-10 text-slate-400 mb-2" />
                      <p className="text-sm font-bold text-slate-800">Upload Trip Cover Image</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Raw Text */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Raw Itinerary Text / Extracted Content
              </label>
              <textarea
                rows={4}
                value={planRawText}
                onChange={(e) => {
                  setPlanRawText(e.target.value);
                  processAndStructurePlan(e.target.value);
                }}
                placeholder="Paste or inspect raw itinerary notes with Day 1, Day 2, times, hotel booking links, costs..."
                className="w-full p-3 font-mono text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* CONVERTED PLAN PREVIEW BOX */}
            {conversionResult && (
              <div className="p-6 bg-slate-50 rounded-2xl border-2 border-blue-200 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow">
                      <Sparkles className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">{conversionResult.plan.name}</h4>
                      <p className="text-xs text-slate-500">
                        {conversionResult.extractedDaysCount} Days • Est. Budget: ₹{conversionResult.extractedCostTotal.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handlePublishPlan}
                    disabled={isPublishing}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-600/25 flex items-center gap-2 transition"
                  >
                    {isPublishing ? 'Publishing...' : <><CheckCircle2 className="w-4 h-4 text-emerald-200" /> Publish Plan to Traveler Site</>}
                  </button>
                </div>

                {publishSuccess && (
                  <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Successfully published to Traveler Showcase!
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Curated Plans List */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800">
              Published Plans on Live Site ({curatedPlans.length})
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {curatedPlans.map(plan => (
                <div key={plan.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="h-40 relative bg-slate-100">
                      {plan.coverImage ? (
                        <img src={plan.coverImage} alt={plan.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600">
                          <Compass className="w-8 h-8" />
                        </div>
                      )}
                      <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                        📍 {plan.destination}
                      </span>
                    </div>

                    <div className="p-4 space-y-1.5">
                      <h4 className="font-bold text-slate-800 text-sm">{plan.name}</h4>
                      <p className="text-xs text-slate-500">
                        {plan.itinerary.length} Days • Total Budget: ₹{plan.totalExpenses.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Published
                    </span>
                    <button
                      onClick={() => {
                        if (confirm(`Remove plan "${plan.name}"?`)) deletePlan(plan.id);
                      }}
                      className="text-xs text-red-500 hover:text-red-700 font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SHARE LINKS */}
      {activeTab === 'share' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="text-lg font-bold text-slate-800">Generated Traveler Share Links</h3>
            <div className="space-y-3">
              {(shareLinks || []).map(link => (
                <div key={link.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">{link.label}</h4>
                    <p className="text-xs font-mono text-blue-600 mt-0.5 truncate max-w-md">
                      {getTravelerShareUrl(link.code)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyLink(link.code)}
                      className="p-2 bg-white border border-slate-300 rounded-lg text-slate-700 text-xs font-bold"
                    >
                      {copiedCode === link.code ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button onClick={() => deleteShareLink(link.id)} className="p-2 text-red-600 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-800">Create New Share Link</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (!linkLabel) return;
              addShareLink({
                id: `link_${Date.now()}`,
                code: linkLabel.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                targetView: 'traveler',
                label: linkLabel,
                createdAt: new Date().toISOString().split('T')[0],
                clicks: 0
              });
              setLinkLabel('');
            }} className="space-y-4">
              <input
                type="text"
                required
                placeholder="Campaign / Label Name"
                value={linkLabel}
                onChange={(e) => setLinkLabel(e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl"
              />
              <button type="submit" className="w-full py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl">
                Create Link
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 5: APPROVALS */}
      {activeTab === 'approvals' && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-800">Pending Provider Applications ({pendingServices.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pendingServices.map(service => (
              <div key={service.id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900">{service.name}</h4>
                <p className="text-xs text-blue-600">📍 {service.city}, {service.country}</p>
                <p className="text-xs text-slate-600">{service.description}</p>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => updateServiceStatus(service.id, 'approved')}
                    className="flex-1 py-2 bg-green-600 text-white font-bold text-xs rounded-xl"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateServiceStatus(service.id, 'rejected')}
                    className="flex-1 py-2 bg-red-100 text-red-700 font-bold text-xs rounded-xl"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
            {pendingServices.length === 0 && (
              <div className="col-span-full text-center py-12 text-slate-400 text-xs">
                No pending provider applications.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 6: THEME & BRAND */}
      {activeTab === 'theme' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm max-w-2xl space-y-4">
          <h3 className="text-lg font-bold text-slate-800">Theme & Brand Colors</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Brand Name</label>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Gradient Start</label>
                <input
                  type="color"
                  value={gradientStart}
                  onChange={(e) => setGradientStart(e.target.value)}
                  className="w-10 h-10 rounded-xl cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Gradient End</label>
                <input
                  type="color"
                  value={gradientEnd}
                  onChange={(e) => setGradientEnd(e.target.value)}
                  className="w-10 h-10 rounded-xl cursor-pointer"
                />
              </div>
            </div>

            {/* Logo */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Logo Upload</label>
              <input ref={logoInputRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              <button
                type="button"
                onClick={() => logoInputRef.current?.click()}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
              >
                Choose Logo Image
              </button>
              {logoPreview && <img src={logoPreview} alt="Logo" className="w-10 h-10 object-contain mt-2" />}
            </div>

            <button
              onClick={handleSaveTheme}
              className="mt-4 px-6 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow"
            >
              Save Theme
            </button>
          </div>
        </div>
      )}

      {/* TAB 7: ADS */}
      {activeTab === 'ads' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-800">Promotions & Custom Ads</h3>
          <p className="text-xs text-slate-500">Upload promotional banners that display on the Traveler portal.</p>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (!adTitle || !adImage) {
              alert('Please enter title and image.');
              return;
            }
            addAdBanner({
              id: `ad_${Date.now()}`,
              title: adTitle,
              subtitle: adSubtitle,
              imageUrl: adImage,
              targetUrl: adLink,
              active: true,
              tag: adTag
            });
            setAdTitle('');
            setAdSubtitle('');
            setAdImage('');
          }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Headline"
              value={adTitle}
              onChange={(e) => setAdTitle(e.target.value)}
              className="px-3 py-2 text-xs border border-slate-300 rounded-xl"
            />
            <input
              type="text"
              placeholder="Subtitle"
              value={adSubtitle}
              onChange={(e) => setAdSubtitle(e.target.value)}
              className="px-3 py-2 text-xs border border-slate-300 rounded-xl"
            />
            <input
              type="url"
              placeholder="Link URL"
              value={adLink}
              onChange={(e) => setAdLink(e.target.value)}
              className="px-3 py-2 text-xs border border-slate-300 rounded-xl"
            />
            <div className="flex items-center gap-2">
              <input ref={adImageInputRef} type="file" accept="image/*" onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (ev) => {
                  if (ev.target?.result) setAdImage(ev.target.result as string);
                };
                reader.readAsDataURL(file);
              }} className="hidden" />
              <button
                type="button"
                onClick={() => adImageInputRef.current?.click()}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
              >
                {adImage ? 'Image Loaded' : 'Upload Banner Image'}
              </button>
              <button type="submit" className="px-5 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl">
                Add Ad
              </button>
            </div>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {adBanners.map(ad => (
              <div key={ad.id} className="p-3 border rounded-xl flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-xs text-slate-800">{ad.title}</h5>
                  <p className="text-[11px] text-slate-500">{ad.subtitle}</p>
                </div>
                <button onClick={() => deleteAdBanner(ad.id)} className="text-red-500 text-xs font-semibold">
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Manual Trip Planner Modal */}
      <ManualTripPlannerModal
        isOpen={isManualPlannerOpen}
        onClose={() => setIsManualPlannerOpen(false)}
        initialCity={city === 'other' ? customCity : city}
      />
    </div>
  );
}
