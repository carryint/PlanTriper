import type { TripPlan, Service, User, Destination, AdBanner, ShareLink } from '../types';

export const seedUsers: User[] = [
  { id: 'admin1', name: 'PlanTriper Admin', email: 'admin@plantriper.com', role: 'admin' },
  { id: 'provider1', name: 'Oceanic Hospitality Group', email: 'partner@oceanic.com', role: 'provider' },
  { id: 'traveler1', name: 'Alex Wanderer', email: 'alex@travel.com', role: 'traveler', points: 340 },
];

export const seedDestinations: Destination[] = [
  {
    id: 'dest_bali',
    name: 'Bali',
    country: 'Indonesia',
    tagline: 'Tropical paradise of volcanic mountains, beaches, and coral reefs',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    category: 'Beach',
    popularSpotsCount: 48
  },
  {
    id: 'dest_manali',
    name: 'Manali & Himalayas',
    country: 'India',
    tagline: 'Snow-capped peaks, pine forests, and adventure valleys',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    category: 'Mountain',
    popularSpotsCount: 32
  },
  {
    id: 'dest_dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    tagline: 'Futuristic architecture, luxury desert safaris, and lively nightlife',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    category: 'City',
    popularSpotsCount: 56
  },
  {
    id: 'dest_kerala',
    name: 'Kerala',
    country: 'India',
    tagline: 'Serene backwaters, tea gardens, and lush tropical landscapes',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    category: 'Heritage',
    popularSpotsCount: 40
  },
  {
    id: 'dest_goa',
    name: 'Goa',
    country: 'India',
    tagline: 'Golden beaches, Portuguese heritage, and vibrant coastal shacks',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    category: 'Beach',
    popularSpotsCount: 29
  },
  {
    id: 'dest_paris',
    name: 'Paris',
    country: 'France',
    tagline: 'City of light, world-class gastronomy, and timeless arts',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    category: 'City',
    popularSpotsCount: 65
  }
];

export const seedServices: Service[] = [
  // Bali
  {
    id: 'srv_bali_1',
    providerId: 'provider1',
    providerName: 'Maya Ubud Resorts',
    providerEmail: 'resv@mayaubud.com',
    type: 'hotel',
    status: 'approved',
    name: 'Maya Ubud Luxury Valley Resort',
    destination: 'Bali',
    address: 'Jl. Gunung Sari, Peliatan, Ubud, Bali',
    contact: '+62 361 977888',
    website: 'https://mayaresorts.com',
    googleRating: 4.8,
    priceLevel: 'Luxury',
    pricePerDay: 8500,
    description: 'Breathtaking valley views, infinity river pools, and signature Balinese spa villas.',
    images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'],
    googleMapUrl: 'https://maps.google.com/?q=Maya+Ubud+Resort',
    featured: true,
    createdAt: '2026-09-20'
  },
  {
    id: 'srv_bali_2',
    providerId: 'provider1',
    providerName: 'Bali Ride Scooters',
    providerEmail: 'scooters@baliride.com',
    type: 'rental',
    status: 'approved',
    name: 'Bali Premium NMAX & Bike Rental',
    destination: 'Bali',
    address: 'Seminyak & Canggu Hub, Bali',
    contact: '+62 812 3456 7890',
    website: 'https://baliride.id',
    googleRating: 4.9,
    priceLevel: 'Budget',
    pricePerDay: 600,
    description: 'Reliable Yamaha NMAX and Honda Scoopy automatic bikes delivered straight to your hotel or airport.',
    images: ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80'],
    googleMapUrl: 'https://maps.google.com/?q=Seminyak+Bali',
    featured: true,
    createdAt: '2026-09-21'
  },
  // Manali
  {
    id: 'srv_manali_1',
    providerId: 'provider1',
    providerName: 'Himalayan Escapes',
    providerEmail: 'contact@himalayanadventures.in',
    type: 'hotel',
    status: 'approved',
    name: 'The Himalayan Pine Glass Cottage',
    destination: 'Manali & Himalayas',
    address: 'Old Manali Road, Himachal Pradesh',
    contact: '+91 98160 12345',
    googleRating: 4.7,
    priceLevel: 'Moderate',
    pricePerDay: 4200,
    description: 'Panoramic glass bedroom overlooking apple orchards and towering snow-covered peaks.',
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'],
    featured: true,
    createdAt: '2026-09-18'
  },
  {
    id: 'srv_manali_2',
    providerId: 'provider1',
    providerName: 'Rohtang 4x4 Adventures',
    providerEmail: 'booking@rohtangexpeditions.com',
    type: 'rental',
    status: 'pending',
    name: 'Thar & Himalayan 4x4 Mountain Fleet',
    destination: 'Manali & Himalayas',
    address: 'Mall Road, Manali',
    contact: '+91 98160 54321',
    googleRating: 4.9,
    priceLevel: 'Moderate',
    pricePerDay: 3500,
    description: 'Rugged 4WD Mahindra Thars equipped with GPS, snow chains, and adventure gear for Spiti and Solang trips.',
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80'],
    createdAt: '2026-09-22'
  },
  // Dubai
  {
    id: 'srv_dubai_1',
    providerId: 'provider1',
    providerName: 'Emirates Grand Stays',
    providerEmail: 'info@dubaiapartments.ae',
    type: 'hotel',
    status: 'approved',
    name: 'Marina Skyview Luxury Suites',
    destination: 'Dubai',
    address: 'Dubai Marina Walk, Dubai, UAE',
    contact: '+971 4 456 7890',
    website: 'https://marinaskyview.ae',
    googleRating: 4.9,
    priceLevel: 'Luxury',
    pricePerDay: 12000,
    description: 'High-floor suites with floor-to-ceiling vistas of Dubai Marina yacht harbor and JBR beach.',
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'],
    featured: true,
    createdAt: '2026-09-19'
  },
  {
    id: 'srv_dubai_2',
    providerId: 'provider1',
    providerName: 'Al Fanar Heritage',
    providerEmail: 'contact@alfanarrestaurant.com',
    type: 'restaurant',
    status: 'approved',
    name: 'Al Fanar Emirati Heritage Bistro',
    destination: 'Dubai',
    address: 'Dubai Festival City Mall, Waterfront Centre',
    contact: '+971 4 232 9966',
    googleRating: 4.6,
    priceLevel: 'Moderate',
    pricePerDay: 1500,
    description: 'Authentic 1960s Emirati culinary journey serving fresh seafood Machboos and warm luqaimat pastries.',
    images: ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'],
    createdAt: '2026-09-20'
  },
  // Goa
  {
    id: 'srv_goa_1',
    providerId: 'provider1',
    providerName: 'Coastal Hospitality Goa',
    providerEmail: 'host@goahotels.com',
    type: 'hotel',
    status: 'approved',
    name: 'Sunset Beach Club & Villas',
    destination: 'Goa',
    address: 'Baga-Calangute Coastal Road, North Goa',
    contact: '+91 98765 43210',
    website: 'https://sunsetbeachgoa.com',
    googleRating: 4.5,
    priceLevel: 'Moderate',
    pricePerDay: 4800,
    description: 'Boutique resort located steps from Baga beach with swimming pools and palm gardens.',
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'],
    googleMapUrl: 'https://maps.google.com/?q=Baga+Beach+Goa',
    featured: true,
    createdAt: '2026-09-15'
  },
  {
    id: 'srv_goa_2',
    providerId: 'provider1',
    providerName: 'Goa Wheels',
    providerEmail: 'contact@goawheels.com',
    type: 'rental',
    status: 'pending',
    name: 'Goa Royal Enfield & Activa Rentals',
    destination: 'Goa',
    address: 'Near Calangute Circle, North Goa',
    contact: '+91 98765 43212',
    googleRating: 4.8,
    priceLevel: 'Budget',
    pricePerDay: 500,
    description: 'Doorstep bike delivery with sanitized helmets and instant documentation.',
    images: ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80'],
    createdAt: '2026-09-22'
  }
];

export const seedAds: AdBanner[] = [
  {
    id: 'ad_1',
    title: 'Fly to Bali with 25% Off Airlines',
    subtitle: 'Exclusive partner airline discount for PlanTriper members',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    targetUrl: 'https://www.skyscanner.com',
    active: true,
    tag: 'Flight Deal'
  },
  {
    id: 'ad_2',
    title: 'Himalayan Luxury Glamping Experience',
    subtitle: 'Book 3 nights get 1 free with complimentary bonfire & stargazing',
    imageUrl: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
    targetUrl: 'https://booking.com',
    active: true,
    tag: 'Special Promo'
  }
];

export const seedShareLinks: ShareLink[] = [
  {
    id: 'link_1',
    code: 'traveler-portal',
    targetView: 'traveler',
    label: 'Official Traveler Community Link',
    createdAt: '2026-09-22',
    clicks: 142
  },
  {
    id: 'link_2',
    code: 'explore-himalayas',
    targetView: 'destination',
    label: 'Himalaya Discovery Campaign',
    createdAt: '2026-09-22',
    clicks: 89
  }
];

export const seedPlans: TripPlan[] = [
  {
    id: 'plan_bali',
    travelerId: 'traveler1',
    name: 'Bali Tropical Discovery & Culture',
    destination: 'Bali',
    startDate: '2026-10-12',
    endDate: '2026-10-16',
    transportMode: 'flight',
    travelersCount: 2,
    status: 'planned',
    totalExpenses: 46000,
    rewardPointsEarned: 240,
    itinerary: [
      {
        id: 'day1',
        dayNumber: 1,
        title: 'Arrival in Denpasar & Ubud Rainforest Valley',
        items: [
          { id: 'b1', time: '10:00 AM', location: 'Ngurah Rai Airport (DPS)', description: 'Arrival and private airport pickup to Ubud hotel.', type: 'transit', visited: true, cost: 2500 },
          { id: 'b2', time: '01:00 PM', location: 'Maya Ubud Resort', description: 'Check-in, welcome drinks, relax overlooking the Petanu river.', type: 'hotel', visited: true, cost: 8500 },
          { id: 'b3', time: '04:30 PM', location: 'Tegallalang Rice Terraces', description: 'Walk through cascading UNESCO green terraces and scenic swings.', type: 'spot', visited: false, cost: 600 },
          { id: 'b4', time: '07:30 PM', location: 'Bebek Bengil (Dirty Duck)', description: 'Crispy Balinese duck dinner in open-air garden gazebo.', type: 'restaurant', visited: false, cost: 1800 }
        ]
      },
      {
        id: 'day2',
        dayNumber: 2,
        title: 'Temples, Waterfalls & Sunset Cliff',
        items: [
          { id: 'b5', time: '09:00 AM', location: 'Tegenungan Waterfall', description: 'Morning swim in the natural plunge pool beneath the jungle falls.', type: 'spot', visited: false, cost: 400 },
          { id: 'b6', time: '01:00 PM', location: 'Uluwatu Clifftop', description: 'Scenic coast drive and lunch with Indian Ocean views.', type: 'restaurant', visited: false, cost: 2200 },
          { id: 'b7', time: '05:30 PM', location: 'Uluwatu Temple', description: 'Famous sunset Kecak Fire Dance performance high on the cliffs.', type: 'spot', visited: false, cost: 1500 }
        ]
      }
    ]
  },
  {
    id: 'plan_goa',
    travelerId: 'traveler1',
    name: 'Goa Coastal & Heritage Tour',
    destination: 'Goa',
    startDate: '2026-09-25',
    endDate: '2026-09-27',
    transportMode: 'train',
    travelersCount: 5,
    status: 'planned',
    totalExpenses: 21500,
    rewardPointsEarned: 150,
    itinerary: [
      {
        id: 'day1',
        dayNumber: 1,
        title: 'North Goa Beaches & Sunset Forts',
        items: [
          { id: 'g1', time: '09:00 AM', location: 'Tivim Station Arrival', description: 'Arrival at Tivim. Hired taxi to North Goa accommodation.', type: 'transit', visited: false, cost: 1000 },
          { id: 'g2', time: '11:00 AM', location: 'Hotel Check-in Baga', description: 'Check into hotel near Baga/Calangute coastal stretch.', type: 'hotel', visited: false, cost: 5000 },
          { id: 'g3', time: '01:30 PM', location: 'Baga Beach Shack', description: 'Fresh Goan fish thali and beachside cold beverages.', type: 'restaurant', visited: false, cost: 1500 },
          { id: 'g4', time: '04:30 PM', location: 'Chapora Fort (Dil Chahta Hai)', description: 'Panoramic sea views and cliff sunset walk.', type: 'spot', visited: false, cost: 200 },
          { id: 'g5', time: '08:00 PM', location: 'Tito\'s Lane Nightlife', description: 'Dinner, live music, and evening walk on Tito\'s street.', type: 'restaurant', visited: false, cost: 3000 }
        ]
      },
      {
        id: 'day2',
        dayNumber: 2,
        title: 'Old Goa Heritage & Panjim Latin Quarter',
        items: [
          { id: 'g6', time: '09:30 AM', location: 'Basilica of Bom Jesus', description: 'UNESCO World Heritage 16th-century baroque architecture.', type: 'spot', visited: false, cost: 500 },
          { id: 'g7', time: '12:30 PM', location: 'Fontainhas, Panjim', description: 'Colorful Portuguese villas and heritage photo walk.', type: 'spot', visited: false, cost: 0 },
          { id: 'g8', time: '06:30 PM', location: 'Mandovi River Sunset Cruise', description: '2-hour cruise with Goan folk dance and DJ performance.', type: 'spot', visited: false, cost: 1800 }
        ]
      }
    ]
  }
];
