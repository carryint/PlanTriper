export type UserRole = 'traveler' | 'provider' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  points?: number;
}

export type ServiceType = 'hotel' | 'restaurant' | 'rental' | 'spot';
export type ServiceStatus = 'pending' | 'approved' | 'rejected';

export interface Service {
  id: string;
  providerId: string;
  providerName: string;
  providerEmail: string;
  type: ServiceType;
  status: ServiceStatus;
  name: string;
  destination: string;
  address: string;
  contact: string;
  website?: string;
  googleRating: number;
  priceLevel?: string;
  pricePerDay?: number;
  description: string;
  images: string[];
  googleMapUrl?: string;
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
  type: 'spot' | 'restaurant' | 'rental' | 'hotel' | 'transit';
  visited: boolean;
  cost: number;
  bookingUrl?: string;
  imageUrl?: string;
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
  destination: string;
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
