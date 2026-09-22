import { TripPlan, Service, User } from '../types';

export const seedUsers: User[] = [
  { id: 'admin1', name: 'Super Admin', email: 'admin@plantriper.com', role: 'admin' },
  { id: 'provider1', name: 'Goa Hotels & Co', email: 'host@goahotels.com', role: 'provider' },
  { id: 'traveler1', name: 'John Doe', email: 'john@example.com', role: 'traveler', points: 150 },
];

export const seedServices: Service[] = [
  {
    id: 'srv1',
    providerId: 'provider1',
    type: 'hotel',
    status: 'approved',
    name: 'Sunset Beach Resort',
    address: 'Baga Beach, North Goa',
    contact: '+91 9876543210',
    website: 'https://sunsetbeachgoa.com',
    googleRating: 4.5,
    description: 'Luxury resort located just steps from Baga beach with ocean views.',
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80']
  },
  {
    id: 'srv2',
    providerId: 'provider1',
    type: 'restaurant',
    status: 'approved',
    name: 'Curlies Beach Shack',
    address: 'Anjuna Beach, Goa',
    contact: '+91 9876543211',
    website: 'https://curliesgoa.com',
    googleRating: 4.2,
    description: 'Iconic beach shack offering great seafood, drinks, and sunset views.',
    images: ['https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=800&q=80']
  },
  {
    id: 'srv3',
    providerId: 'provider1',
    type: 'rental',
    status: 'pending',
    name: 'Goa Wheels Bike Rental',
    address: 'Calangute, Goa',
    contact: '+91 9876543212',
    googleRating: 4.8,
    description: 'Affordable scooters and Royal Enfields for daily rent.',
    images: ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80']
  }
];

export const seedPlans: TripPlan[] = [
  {
    id: 'plan1',
    travelerId: 'traveler1',
    name: 'Goa 2-Day Adventure',
    startDate: '2026-09-25',
    endDate: '2026-09-27',
    status: 'planned',
    totalExpenses: 21500,
    itinerary: [
      {
        id: 'day1',
        date: '2026-09-25',
        items: [
          { id: 'item1', time: '09:00 AM', location: 'Tivim Railway Station', description: 'Arrival at Tivim. Take a taxi to North Goa hotel.', type: 'transit', visited: false, cost: 1000 },
          { id: 'item2', time: '11:00 AM', location: 'Hotel Check-in', description: 'Check into hotel near Baga/Calangute. Freshen up.', type: 'hotel', visited: false, cost: 5000 },
          { id: 'item3', time: '01:00 PM', location: 'Baga Beach', description: 'Relax at Baga Beach, have lunch at a beach shack.', type: 'spot', visited: false, cost: 1500 },
          { id: 'item4', time: '04:00 PM', location: 'Chapora Fort', description: 'Visit Chapora Fort for a stunning sunset view (Dil Chahta Hai fort).', type: 'spot', visited: false, cost: 200 },
          { id: 'item5', time: '08:00 PM', location: 'Tito\'s Lane', description: 'Dinner and nightlife at Tito\'s Lane.', type: 'restaurant', visited: false, cost: 3000 }
        ]
      },
      {
        id: 'day2',
        date: '2026-09-26',
        items: [
          { id: 'item6', time: '09:30 AM', location: 'Old Goa', description: 'Visit Basilica of Bom Jesus and Se Cathedral.', type: 'spot', visited: false, cost: 500 },
          { id: 'item7', time: '12:30 PM', location: 'Fontainhas, Panjim', description: 'Explore the Latin Quarter of Fontainhas. Photography walk.', type: 'spot', visited: false, cost: 0 },
          { id: 'item8', time: '02:00 PM', location: 'Panjim', description: 'Authentic Goan lunch in Panjim.', type: 'restaurant', visited: false, cost: 2000 },
          { id: 'item9', time: '05:00 PM', location: 'Miramar Beach', description: 'Evening stroll at Miramar beach.', type: 'spot', visited: false, cost: 300 },
          { id: 'item10', time: '07:00 PM', location: 'Mandovi River Cruise', description: 'Enjoy a sunset river cruise with music and dancing.', type: 'spot', visited: false, cost: 1500 }
        ]
      },
      {
        id: 'day3',
        date: '2026-09-27',
        items: [
          { id: 'item11', time: '10:00 AM', location: 'Madgaon Station', description: 'Checkout and head to Madgaon station for departure.', type: 'transit', visited: false, cost: 1500 }
        ]
      }
    ]
  }
];
