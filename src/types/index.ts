export type UserRole = 'traveler' | 'provider' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  points?: number;
}

export type ServiceType = 
  | 'hotel' 
  | 'shop' 
  | 'rental' 
  | 'beach' 
  | 'church' 
  | 'restaurant' 
  | 'spot' 
  | 'other';

export type ServiceStatus = 'pending' | 'approved' | 'rejected';

export interface Service {
  id: string;
  providerId: string;
  providerName: string;
  providerEmail: string;
  type: ServiceType;
  status: ServiceStatus;
  name: string;
  
  // Detailed Geographic Information
  country: string;
  city: string;
  place: string; // Specific neighborhood / area (e.g. Fort Kochi, Marine Drive)
  postalCode: string; // Pin code / zip code
  destination: string; // Display string e.g. "Kochi, India"
  address: string;
  googleMapUrl: string; // Google Maps URL for exact navigation
  
  contact: string;
  website?: string;
  googleRating: number;
  priceLevel?: string;
  pricePerDay?: number;
  description: string;
  images: string[];
  featured?: boolean;
  createdAt: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  tagline: string;
  image: string;
  category: 'Beach' | 'Mountain' | 'City' | 'Heritage' | 'Desert';
  popularSpotsCount: number;
}

export interface AdBanner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  targetUrl: string;
  active: boolean;
  tag: string;
}

export interface AppTheme {
  appName: string;
  tagline: string;
  primaryColor: string;
  gradientStart: string;
  gradientEnd: string;
  gradientDirection: string;
  logoUrl?: string;
  customAdsEnabled: boolean;
}

export interface ItineraryItem {
  id: string;
  time: string;
  location: string;
  description: string;
  type: ServiceType | 'transit';
  visited: boolean;
  cost: number;
  bookingUrl?: string;
  googleMapUrl?: string;
  imageUrl?: string;
  serviceId?: string; // Reference to added spot
}

export interface ItineraryDay {
  id: string;
  dayNumber: number;
  date?: string;
  title: string;
  items: ItineraryItem[];
}

export interface TripPlan {
  id: string;
  travelerId: string;
  name: string;
  destination: string; // e.g. "Kochi"
  country?: string;
  city?: string;
  startDate: string;
  endDate: string;
  transportMode: 'flight' | 'train' | 'bus' | 'rental';
  travelersCount: number;
  status: 'planned' | 'in_progress' | 'completed';
  itinerary: ItineraryDay[];
  totalExpenses: number;
  rewardPointsEarned: number;
  coverImage?: string;
  sourceFile?: string;
  sourceFileType?: 'pdf' | 'docx' | 'zip' | 'text' | 'manual';
  isCuratedByAdmin?: boolean;
  notes?: string;
}

export interface ShareLink {
  id: string;
  code: string;
  targetView: 'traveler' | 'planner' | 'destination';
  label: string;
  createdAt: string;
  clicks: number;
}
