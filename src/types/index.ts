export type UserRole = 'traveler' | 'provider' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  points?: number; // For travelers: Van, Flight, Bike points
}

export type ServiceType = 'hotel' | 'restaurant' | 'rental' | 'spot';
export type ServiceStatus = 'pending' | 'approved' | 'rejected';

export interface Service {
  id: string;
  providerId: string;
  type: ServiceType;
  status: ServiceStatus;
  name: string;
  address: string;
  contact: string;
  website?: string;
  googleRating: number;
  description: string;
  images: string[];
}

export interface AppTheme {
  primaryColor: string;
  gradientStart: string;
  gradientEnd: string;
  logoUrl?: string;
}

export interface ItineraryItem {
  id: string;
  time: string;
  location: string;
  description: string;
  type: 'spot' | 'restaurant' | 'rental' | 'hotel' | 'transit';
  visited: boolean;
  cost: number;
}

export interface ItineraryDay {
  id: string;
  date: string;
  items: ItineraryItem[];
}

export interface TripPlan {
  id: string;
  travelerId: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'planned' | 'in_progress' | 'completed';
  itinerary: ItineraryDay[];
  totalExpenses: number;
}
