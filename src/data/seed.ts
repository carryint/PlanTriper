import type { TripPlan, Service, User, Destination, AdBanner, ShareLink } from '../types';

export const seedUsers: User[] = [
  { id: 'admin1', name: 'PlanTriper Admin', email: 'admin@plantriper.com', role: 'admin' },
  { id: 'traveler1', name: 'Alex Traveler', email: 'traveler@plantriper.com', role: 'traveler', points: 0 },
];

// Clean starter destinations - dynamic destination creation is available in Admin
export const seedDestinations: Destination[] = [
  {
    id: 'dest_kochi',
    name: 'Kochi',
    country: 'India',
    tagline: 'Historic spice port, colonial heritage, backwaters and coastal beaches',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
    category: 'Heritage',
    popularSpotsCount: 4
  }
];

// Starter verified items for Kochi illustrating the new structure with country, city, place, postal code, and Google Map links
export const seedServices: Service[] = [
  {
    id: 'srv_kochi_hotel_1',
    providerId: 'admin_created',
    providerName: 'Brunton Boatyard',
    providerEmail: 'brunton@cghearth.com',
    type: 'hotel',
    status: 'approved',
    name: 'Brunton Boatyard Heritage Hotel',
    country: 'India',
    city: 'Kochi',
    place: 'Fort Kochi',
    postalCode: '682001',
    destination: 'Kochi',
    address: '1/498, Calvathy Road, Fort Kochi, Kochi, Kerala',
    googleMapUrl: 'https://maps.google.com/?q=Brunton+Boatyard+Fort+Kochi',
    contact: '+91 484 221 5461',
    website: 'https://www.cghearth.com/brunton-boatyard',
    googleRating: 4.7,
    priceLevel: 'Luxury',
    pricePerDay: 11000,
    description: 'Victorian shipyard inspired waterfront luxury hotel overlooking the Arabian Sea harbor and passing ships.',
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'],
    featured: true,
    createdAt: '2026-09-23'
  },
  {
    id: 'srv_kochi_church_1',
    providerId: 'admin_created',
    providerName: 'St. Francis Heritage Trust',
    providerEmail: 'heritage@fortkochi.org',
    type: 'church',
    status: 'approved',
    name: 'St. Francis Church (Oldest European Church in India)',
    country: 'India',
    city: 'Kochi',
    place: 'Fort Kochi',
    postalCode: '682001',
    destination: 'Kochi',
    address: 'Opposite Parade Ground, Fort Kochi, Kochi, Kerala',
    googleMapUrl: 'https://maps.google.com/?q=St+Francis+Church+Fort+Kochi',
    contact: '+91 484 221 7505',
    website: 'https://keralatourism.org/destination/st-francis-church-kochi',
    googleRating: 4.6,
    priceLevel: 'Free',
    pricePerDay: 0,
    description: 'Historic landmark church originally built in 1503 where explorer Vasco da Gama was initially buried.',
    images: ['https://images.unsplash.com/photo-1548625361-195fe61a55c3?auto=format&fit=crop&w=800&q=80'],
    featured: true,
    createdAt: '2026-09-23'
  },
  {
    id: 'srv_kochi_beach_1',
    providerId: 'admin_created',
    providerName: 'Cherai Coastal Tourism',
    providerEmail: 'info@cheraibeach.com',
    type: 'beach',
    status: 'approved',
    name: 'Cherai Beach & Backwaters',
    country: 'India',
    city: 'Kochi',
    place: 'Vypin Island',
    postalCode: '683514',
    destination: 'Kochi',
    address: 'Cherai Beach Road, Vypin Island, Kochi, Kerala',
    googleMapUrl: 'https://maps.google.com/?q=Cherai+Beach+Kochi',
    contact: '+91 484 248 8888',
    googleRating: 4.5,
    priceLevel: 'Free',
    pricePerDay: 0,
    description: '10km long golden sand beach known for calm swimming waters, dolphin sightings, and bordering coconut lagoons.',
    images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'],
    featured: true,
    createdAt: '2026-09-23'
  },
  {
    id: 'srv_kochi_rental_1',
    providerId: 'admin_created',
    providerName: 'Kochi Coastal Wheels',
    providerEmail: 'rentals@coastalwheelskochi.in',
    type: 'rental',
    status: 'approved',
    name: 'Kochi Royal Enfield & Scooter Rentals',
    country: 'India',
    city: 'Kochi',
    place: 'Marine Drive & Fort Kochi',
    postalCode: '682031',
    destination: 'Kochi',
    address: 'Marine Drive Walkway & Princess Street Hub, Kochi',
    googleMapUrl: 'https://maps.google.com/?q=Marine+Drive+Kochi',
    contact: '+91 98470 11223',
    website: 'https://coastalwheelskochi.in',
    googleRating: 4.8,
    priceLevel: 'Budget',
    pricePerDay: 650,
    description: 'Daily and weekly rentals of Royal Enfield Classics, Honda Activas, and automatic gearless scooters with sanitized helmets.',
    images: ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80'],
    featured: true,
    createdAt: '2026-09-23'
  },
  {
    id: 'srv_kochi_shop_1',
    providerId: 'admin_created',
    providerName: 'Jew Town Spice Markets',
    providerEmail: 'spices@jewtownkochi.com',
    type: 'shop',
    status: 'approved',
    name: 'Jew Town Heritage Antiques & Spice Bazaar',
    country: 'India',
    city: 'Kochi',
    place: 'Mattancherry',
    postalCode: '682002',
    destination: 'Kochi',
    address: 'Synagogue Lane, Jew Town, Mattancherry, Kochi',
    googleMapUrl: 'https://maps.google.com/?q=Jew+Town+Mattancherry+Kochi',
    contact: '+91 484 222 4114',
    googleRating: 4.6,
    priceLevel: 'Moderate',
    pricePerDay: 500,
    description: 'Aromatic traditional market selling authentic Malabar black pepper, cardamom, cinnamon, and carved colonial wood antiques.',
    images: ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'],
    featured: true,
    createdAt: '2026-09-23'
  }
];

// Clean starter ads & share links
export const seedAds: AdBanner[] = [];

export const seedShareLinks: ShareLink[] = [
  {
    id: 'link_default',
    code: 'traveler-portal',
    targetView: 'traveler',
    label: 'Main Public Traveler Link',
    createdAt: '2026-09-23',
    clicks: 12
  }
];

// Empty default plans as requested: "remove the detailes of created default plans"
export const seedPlans: TripPlan[] = [];
