import { useState, useRef } from 'react';
import { useAppStore, defaultTheme } from '../../store';
import { 
  Palette, CheckCircle, XCircle, Share2, Copy, Check, Megaphone, 
  Building, Star, Upload, Trash2, Plus, RotateCcw, 
  ExternalLink, Eye, Compass
} from 'lucide-react';
import type { AdBanner, ShareLink } from '../../types';

export default function AdminDashboard() {
  const { 
    theme = defaultTheme, 
    setTheme, 
    services = [], 
    updateServiceStatus, 
    deleteService, 
    adBanners = [], 
    addAdBanner, 
    toggleAdBanner, 
    deleteAdBanner, 
    shareLinks = [], 
    addShareLink, 
    deleteShareLink, 
    resetAll 
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'share' | 'approvals' | 'theme' | 'ads' | 'services'>('share');
  
  // Theme state
  const [appName, setAppName] = useState(theme?.appName || 'PlanTriper');
  const [tagline, setTagline] = useState(theme?.tagline || 'Plan Your Route & Discover Destinations Easily');
  const [primaryColor] = useState(theme?.primaryColor || '#2563eb');
  const [gradientStart, setGradientStart] = useState(theme?.gradientStart || '#1d4ed8');
  const [gradientEnd, setGradientEnd] = useState(theme?.gradientEnd || '#7c3aed');
  const [gradientDirection, setGradientDirection] = useState(theme?.gradientDirection || 'to right');
  const [logoPreview, setLogoPreview] = useState(theme?.logoUrl || '');
  const logoInputRef = useRef<HTMLInputElement>(null);

  // New Share Link state
  const [linkLabel, setLinkLabel] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // New Ad state
  const [adTitle, setAdTitle] = useState('');
  const [adSubtitle, setAdSubtitle] = useState('');
  const [adLink, setAdLink] = useState('https://');
  const [adTag, setAdTag] = useState('Promotion');
  const [adImage, setAdImage] = useState('');
  const adImageInputRef = useRef<HTMLInputElement>(null);

  const pendingServices = (services || []).filter(s => s && s.status === 'pending');
  const approvedServices = (services || []).filter(s => s && s.status === 'approved');

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
        const base64Url = event.target.result as string;
        setLogoPreview(base64Url);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Ad Image Upload
  const handleAdImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setAdImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
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

  const handleCreateShareLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkLabel) return;

    const newLink: ShareLink = {
      id: `link_${Date.now()}`,
      code: linkLabel.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      targetView: 'traveler',
      label: linkLabel,
      createdAt: new Date().toISOString().split('T')[0],
      clicks: 0
    };

    addShareLink(newLink);
    setLinkLabel('');
  };

  const handleCreateAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adTitle || !adImage) {
      alert('Please provide a title and upload an image for the advertisement.');
      return;
    }

    const newAd: AdBanner = {
      id: `ad_${Date.now()}`,
      title: adTitle,
      subtitle: adSubtitle || 'Featured sponsor promotion',
      imageUrl: adImage,
      targetUrl: adLink || 'https://',
      active: true,
      tag: adTag
    };

    addAdBanner(newAd);
    setAdTitle('');
    setAdSubtitle('');
    setAdImage('');
    alert('Ad campaign banner published to traveler dashboard!');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Admin Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">Admin Control Center</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Generate traveler share links, approve service providers, customize ads, and design brand gradients
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={getTravelerShareUrl()}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-bold transition border border-blue-200"
          >
            <Eye className="w-3.5 h-3.5" /> Preview Traveler View
          </a>

          <button
            onClick={() => {
              if (confirm('Reset mock database to initial state?')) {
                resetAll();
                window.location.reload();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
            title="Reset Database"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Data
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
              Anyone clicking this link will directly experience the Traveler Dashboard, AI Planner, and Bookings.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleCopyLink('traveler-portal')}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-2"
            >
              {copiedCode === 'traveler-portal' ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" /> Copied to Clipboard!
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
          { id: 'share', label: 'Share Link Generator', icon: Share2 },
          { 
            id: 'approvals', 
            label: `Provider Approvals (${pendingServices.length})`, 
            icon: CheckCircle,
            badge: pendingServices.length > 0
          },
          { id: 'theme', label: 'Brand, Logo & Gradients', icon: Palette },
          { id: 'ads', label: 'Custom Ads & Banners', icon: Megaphone },
          { id: 'services', label: 'Service Provider Directory', icon: Building },
        ].map(({ id, label, icon: Icon, badge }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
              activeTab === id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
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

      {/* TAB 1: SHARE LINKS GENERATOR */}
      {activeTab === 'share' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="text-lg font-bold text-slate-800">Generated Traveler Share Links</h3>
            <p className="text-xs text-slate-500">
              Create campaign links or audience-specific URLs. When users open these links, they land on the major Traveler Dashboard.
            </p>

            <div className="space-y-3">
              {(shareLinks || []).map(link => (
                <div key={link.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">{link.label}</h4>
                    <p className="text-xs font-mono text-blue-600 mt-0.5 truncate max-w-md">
                      {getTravelerShareUrl(link.code)}
                    </p>
                    <span className="text-[10px] text-slate-400">Created: {link.createdAt}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyLink(link.code)}
                      className="p-2 bg-white border border-slate-300 hover:border-blue-500 rounded-lg text-slate-700 text-xs font-bold flex items-center gap-1 shadow-sm transition"
                      title="Copy URL"
                    >
                      {copiedCode === link.code ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => deleteShareLink(link.id)}
                      className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition"
                      title="Delete Link"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Create New Link Form */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-800">Generate New Share Link</h3>
            <form onSubmit={handleCreateShareLink} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Campaign / Label Name
                </label>
                <input
                  type="text"
                  required
                  value={linkLabel}
                  onChange={(e) => setLinkLabel(e.target.value)}
                  placeholder="e.g. Instagram Bio, Summer Promo, WhatsApp Group"
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Create Shareable Link
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: PROVIDER APPROVALS */}
      {activeTab === 'approvals' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-800">Pending Service Applications</h3>
              <p className="text-xs text-slate-500">
                Review submitted hotels, restaurants, and bike/car rentals. Approve to make them visible to travelers.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pendingServices.map(service => (
              <div key={service.id} className="bg-white p-5 rounded-2xl border-2 border-amber-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-44 rounded-xl overflow-hidden relative bg-slate-100">
                    <img src={service.images[0]} alt={service.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      Awaiting Verification
                    </span>
                    <span className="absolute top-2 right-2 bg-white/95 text-slate-900 text-xs font-bold px-2 py-0.5 rounded shadow capitalize">
                      {service.type}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-slate-900">{service.name}</h4>
                    <p className="text-xs text-blue-600 font-semibold">{service.destination}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{service.address}</p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3">{service.description}</p>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-bold block">Contact</span>
                      <span className="font-semibold text-slate-700">{service.contact}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-bold block">Email</span>
                      <span className="font-semibold text-slate-700 truncate block">{service.providerEmail}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-bold block">Google Rating</span>
                      <span className="font-semibold text-amber-600 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" /> {service.googleRating}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-bold block">Daily Cost</span>
                      <span className="font-semibold text-slate-700">₹{service.pricePerDay || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => updateServiceStatus(service.id, 'approved')}
                    className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-1.5 transition"
                  >
                    <CheckCircle className="w-4 h-4" /> Approve & Publish
                  </button>
                  <button
                    onClick={() => updateServiceStatus(service.id, 'rejected')}
                    className="flex-1 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
                  >
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                </div>
              </div>
            ))}

            {pendingServices.length === 0 && (
              <div className="col-span-full text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                <h4 className="text-base font-bold text-slate-800">All caught up!</h4>
                <p className="text-xs text-slate-500">There are no pending service provider applications.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: BRAND, LOGO & GRADIENTS STUDIO */}
      {activeTab === 'theme' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Palette className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-800">Brand & Gradient Customization</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Brand Tagline
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Logo Upload with PNG, JPEG, SVG support */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Upload Custom Logo (PNG, JPEG, SVG)
                </label>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
                  onChange={handleLogoUpload}
                  className="hidden"
                />

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo" className="w-full h-full object-contain p-1" />
                    ) : (
                      <Upload className="w-6 h-6 text-slate-400" />
                    )}
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <button
                      type="button"
                      onClick={() => logoInputRef.current?.click()}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                    >
                      Choose PNG / JPEG / SVG File
                    </button>
                    {logoPreview && (
                      <button
                        type="button"
                        onClick={() => setLogoPreview('')}
                        className="text-xs text-red-500 hover:underline block"
                      >
                        Remove Logo
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Gradient Controls */}
              <div className="pt-2 border-t border-slate-100 space-y-4">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Color Gradients
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Gradient Start Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={gradientStart}
                        onChange={(e) => setGradientStart(e.target.value)}
                        className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200"
                      />
                      <span className="font-mono text-xs text-slate-600">{gradientStart}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Gradient End Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={gradientEnd}
                        onChange={(e) => setGradientEnd(e.target.value)}
                        className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200"
                      />
                      <span className="font-mono text-xs text-slate-600">{gradientEnd}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-500 mb-1">Gradient Direction</label>
                  <select
                    value={gradientDirection}
                    onChange={(e) => setGradientDirection(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="to right">Horizontal (Left to Right)</option>
                    <option value="to bottom right">Diagonal (Top-Left to Bottom-Right)</option>
                    <option value="to bottom">Vertical (Top to Bottom)</option>
                    <option value="to top right">Diagonal (Bottom-Left to Top-Right)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveTheme}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/25 transition"
                >
                  Save & Apply Changes
                </button>
              </div>
            </div>
          </div>

          {/* Live Gradient Preview Box */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-800">Live Header Preview</h3>
            <div
              className="p-6 rounded-3xl text-white shadow-xl min-h-[220px] flex flex-col justify-between transition-all"
              style={{
                background: `linear-gradient(${gradientDirection}, ${gradientStart}, ${gradientEnd})`
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" className="w-9 h-9 object-contain rounded" />
                  ) : (
                    <Compass className="w-8 h-8 text-white" />
                  )}
                  <span className="text-xl font-extrabold tracking-wide">{appName}</span>
                </div>
                <span className="text-xs bg-white/20 backdrop-blur px-3 py-1 rounded-full font-medium">
                  Traveler Portal
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-semibold opacity-90">{tagline}</p>
                <p className="text-xs opacity-75 font-mono">
                  linear-gradient({gradientDirection}, {gradientStart}, {gradientEnd})
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CUSTOM ADS & BANNERS */}
      {activeTab === 'ads' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-slate-800">Active Ad Campaigns</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(adBanners || []).map(ad => (
                <div key={ad.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
                  <div className="h-32 relative bg-slate-800">
                    <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover opacity-60" />
                    <span className="absolute top-2 left-2 bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {ad.tag}
                    </span>
                    <button
                      onClick={() => toggleAdBanner(ad.id)}
                      className={`absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded ${
                        ad.active ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {ad.active ? 'Active' : 'Paused'}
                    </button>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{ad.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{ad.subtitle}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-3">
                      <a href={ad.targetUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-600 font-semibold flex items-center gap-1">
                        Visit <ExternalLink className="w-3 h-3" />
                      </a>
                      <button onClick={() => deleteAdBanner(ad.id)} className="text-xs text-red-500 hover:text-red-700 font-semibold">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* New Ad Banner Form */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-800">Upload New Ad Banner</h3>
            <form onSubmit={handleCreateAd} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Ad Headline *
                </label>
                <input
                  type="text"
                  required
                  value={adTitle}
                  onChange={(e) => setAdTitle(e.target.value)}
                  placeholder="e.g. 30% Off Luxury Bali Villas"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Subtitle / Promo Text
                </label>
                <input
                  type="text"
                  value={adSubtitle}
                  onChange={(e) => setAdSubtitle(e.target.value)}
                  placeholder="e.g. Book directly with PlanTriper discount"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Destination Tag / Category
                </label>
                <input
                  type="text"
                  value={adTag}
                  onChange={(e) => setAdTag(e.target.value)}
                  placeholder="e.g. Bali Deal, Flight Promo, Special"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Destination Link URL
                </label>
                <input
                  type="url"
                  value={adLink}
                  onChange={(e) => setAdLink(e.target.value)}
                  placeholder="https://partner.com"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Upload Ad Banner Image (PNG, JPEG) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Upload Ad Banner (PNG / JPEG) *
                </label>
                <input
                  ref={adImageInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={handleAdImageUpload}
                  className="hidden"
                />
                <div
                  onClick={() => adImageInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-4 text-center cursor-pointer bg-slate-50 transition"
                >
                  {adImage ? (
                    <img src={adImage} alt="Ad Preview" className="h-20 w-full object-cover rounded-lg" />
                  ) : (
                    <div className="space-y-1">
                      <Upload className="w-5 h-5 text-slate-400 mx-auto" />
                      <p className="text-xs font-bold text-slate-600">Select Banner File</p>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition"
              >
                Publish Advertisement
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 5: SERVICE DIRECTORY */}
      {activeTab === 'services' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800">
              Approved Provider Listings ({approvedServices.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedServices.map(service => (
              <div key={service.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="h-36 rounded-xl overflow-hidden relative">
                    <img src={service.images[0]} alt={service.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      {service.destination}
                    </span>
                    <span className="absolute top-2 right-2 bg-white text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded shadow capitalize">
                      {service.type}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">{service.name}</h4>
                  <p className="text-xs text-slate-500 truncate">{service.address}</p>
                  <p className="text-xs text-slate-600 line-clamp-2">{service.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
                  <span className="text-slate-500">Rating: ⭐ {service.googleRating}</span>
                  <button
                    onClick={() => deleteService(service.id)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Delete Listing
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
