import { useState, useRef } from 'react';
import { useAppStore } from '../../store';
import { X, Upload, Building, Utensils, Bike, MapPin, Star, Phone, Globe, DollarSign, CheckCircle2 } from 'lucide-react';
import type { ServiceType } from '../../types';

interface ProviderRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProviderRegisterModal: React.FC<ProviderRegisterModalProps> = ({ isOpen, onClose }) => {
  const { addService, destinations } = useAppStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState<ServiceType>('hotel');
  const [destination, setDestination] = useState(destinations[0]?.name || 'Bali');
  const [customDestination, setCustomDestination] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [googleRating, setGoogleRating] = useState('4.8');
  const [priceLevel, setPriceLevel] = useState('Moderate');
  const [pricePerDay, setPricePerDay] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  // Handle PNG, JPEG, WebP file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      // Validate file type
      if (!file.type.match(/^image\/(png|jpeg|jpg|webp)$/)) {
        alert('Please upload PNG, JPEG, or WebP images only.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !address || !contact || !email) {
      alert('Please fill in all required fields (Name, Destination, Address, Contact, Email).');
      return;
    }

    const finalDestination = destination === 'other' ? (customDestination || 'Global') : destination;
    const defaultImg = businessType === 'hotel' 
      ? 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
      : businessType === 'rental'
      ? 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80'
      : businessType === 'restaurant'
      ? 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
      : 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';

    addService({
      id: `srv_${Date.now()}`,
      providerId: `provider_${Date.now()}`,
      providerName: businessName,
      providerEmail: email,
      type: businessType,
      status: 'pending', // Pending admin approval
      name: businessName,
      country: 'India',
      city: finalDestination,
      place: finalDestination,
      postalCode: '',
      destination: finalDestination,
      address,
      googleMapUrl: `https://maps.google.com/?q=${encodeURIComponent(`${businessName} ${finalDestination}`)}`,
      contact,
      website: website || undefined,
      googleRating: parseFloat(googleRating) || 4.5,
      priceLevel,
      pricePerDay: pricePerDay ? parseFloat(pricePerDay) : undefined,
      description: description || `Verified ${businessType} offering premium experiences in ${finalDestination}.`,
      images: images.length > 0 ? images : [defaultImg],
      createdAt: new Date().toISOString().split('T')[0]
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div>
            <h2 className="text-xl font-bold">List Your Business & Services</h2>
            <p className="text-xs text-blue-100 mt-1">
              Hotels, Restaurants, Bike & Car Rentals, Beach Clubs, or Local Attractions
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-100">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">Application Submitted!</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Your business listing has been received. Our administrators will review and approve your account within 24 hours.
            </p>
            <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-semibold">
              Status: Pending Admin Approval
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Service Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Service Category *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { type: 'hotel', label: 'Hotel & Stays', icon: Building },
                  { type: 'rental', label: 'Bike / Car Rental', icon: Bike },
                  { type: 'restaurant', label: 'Restaurant & Cafe', icon: Utensils },
                  { type: 'spot', label: 'Tourist Spot / Beach', icon: MapPin },
                ].map(({ type, label, icon: Icon }) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setBusinessType(type as ServiceType)}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 text-center transition ${
                      businessType === type
                        ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Company / Service Name *</label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Royal Beach Resort"
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Destination *</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  {destinations.map((d) => (
                    <option key={d.id} value={d.name}>{d.name} ({d.country})</option>
                  ))}
                  <option value="other">+ Enter Other Destination</option>
                </select>
              </div>
            </div>

            {destination === 'other' && (
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Custom Destination Name</label>
                <input
                  type="text"
                  value={customDestination}
                  onChange={(e) => setCustomDestination(e.target.value)}
                  placeholder="e.g. Rome, Phuket, Shimla..."
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Address & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Physical Address *</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, Area, City"
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Contact Phone / WhatsApp *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Email & Website */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Business Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="partner@yourcompany.com"
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Website / Booking Link</label>
                <div className="relative">
                  <Globe className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yourcompany.com"
                    className="w-full pl-9 pr-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Ratings & Price */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Google Rating (1 - 5)</label>
                <div className="relative">
                  <Star className="w-4 h-4 absolute left-3 top-2.5 text-amber-500" />
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={googleRating}
                    onChange={(e) => setGoogleRating(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Price Tier</label>
                <select
                  value={priceLevel}
                  onChange={(e) => setPriceLevel(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="Budget">Budget</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Est. Daily Rate / Cost (₹)</label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="number"
                    value={pricePerDay}
                    onChange={(e) => setPricePerDay(e.target.value)}
                    placeholder="e.g. 2500"
                    className="w-full pl-9 pr-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Service Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Highlight your amenities, special discounts, vehicle models, or unique features..."
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Photo Upload: PNG, JPEG, WebP */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Photos & Media (PNG, JPEG, WebP)
                </label>
                <span className="text-xs text-slate-500">{images.length} photo(s) selected</span>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/50 rounded-2xl p-6 text-center cursor-pointer transition group"
              >
                <Upload className="w-8 h-8 text-slate-400 group-hover:text-blue-600 mx-auto mb-2 transition" />
                <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-600">
                  Click to Browse or Drag & Drop Photos
                </p>
                <p className="text-xs text-slate-500 mt-1">Supports PNG, JPEG, JPG, WebP format</p>
              </div>

              {/* Uploaded Thumbnails */}
              {images.length > 0 && (
                <div className="grid grid-cols-4 gap-3 mt-4">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 group">
                      <img src={img} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition shadow"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 rounded-xl shadow-lg shadow-blue-500/25 transition"
              >
                Submit Listing for Approval
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
