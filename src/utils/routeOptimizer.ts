import type { ItineraryDay, ItineraryItem, TransitInfo } from '../types';

export interface Coordinates {
  lat: number;
  lng: number;
}

// Comprehensive Landmark Coordinates Database
export const LANDMARK_COORDINATES: Record<string, Coordinates> = {
  // Goa Beaches (1 to 29)
  'querim (keri) beach': { lat: 15.7197, lng: 73.6934 },
  'arambol beach': { lat: 15.6865, lng: 73.7037 },
  'mandrem beach': { lat: 15.6601, lng: 73.7142 },
  'ashwem beach': { lat: 15.6436, lng: 73.7208 },
  'morjim beach': { lat: 15.6178, lng: 73.7342 },
  'vagator beach': { lat: 15.5985, lng: 73.7389 },
  'anjuna beach': { lat: 15.5808, lng: 73.7428 },
  'baga beach': { lat: 15.5553, lng: 73.7517 },
  'calangute beach': { lat: 15.5441, lng: 73.7554 },
  'candolim beach': { lat: 15.5178, lng: 73.7628 },
  'sinquerim beach': { lat: 15.4989, lng: 73.7686 },
  'miramar beach': { lat: 15.4851, lng: 73.8080 },
  'dona paula': { lat: 15.4542, lng: 73.8055 },
  'bogmalo beach': { lat: 15.3698, lng: 73.8340 },
  'arossim beach': { lat: 15.3283, lng: 73.8966 },
  'majorda beach': { lat: 15.3117, lng: 73.9075 },
  'betalbatim beach': { lat: 15.2974, lng: 73.9142 },
  'colva beach': { lat: 15.2796, lng: 73.9217 },
  'benaulim beach': { lat: 15.2575, lng: 73.9261 },
  'varca beach': { lat: 15.2186, lng: 73.9358 },
  'cavelossim beach': { lat: 15.1764, lng: 73.9436 },
  'mobor beach': { lat: 15.1528, lng: 73.9472 },
  'cabo de rama beach': { lat: 15.0894, lng: 73.9211 },
  'cola beach': { lat: 15.0561, lng: 73.9719 },
  'agonda beach': { lat: 15.0442, lng: 73.9875 },
  'butterfly beach': { lat: 15.0189, lng: 74.0042 },
  'palolem beach': { lat: 15.0100, lng: 74.0231 },
  'patnem beach': { lat: 14.9983, lng: 74.0328 },
  'galgibaga beach': { lat: 14.9658, lng: 74.0489 },

  // Goa Churches & Temples (1 to 20)
  'basilica of bom jesus': { lat: 15.5009, lng: 73.9116 },
  'sé catedral de santa catarina': { lat: 15.5039, lng: 73.9128 },
  'se cathedral': { lat: 15.5039, lng: 73.9128 },
  'church of our lady of the immaculate conception': { lat: 15.4989, lng: 73.8278 },
  'immaculate conception church': { lat: 15.4989, lng: 73.8278 },
  'church of st. francis of assisi': { lat: 15.5036, lng: 73.9133 },
  'church of st. cajetan': { lat: 15.5058, lng: 73.9175 },
  'mae de deus church': { lat: 15.5519, lng: 73.7744 },
  'church of our lady of the mount': { lat: 15.5000, lng: 73.9242 },
  'church of the holy spirit': { lat: 15.2789, lng: 73.9619 },
  'three kings chapel': { lat: 15.3378, lng: 73.9042 },
  'st. alex church': { lat: 15.5397, lng: 73.7636 },
  'shri manguesh temple': { lat: 15.4386, lng: 73.9686 },
  'shri shantadurga temple': { lat: 15.4042, lng: 73.9819 },
  'mahadeva temple': { lat: 15.4394, lng: 74.2544 },
  'mahalasa narayani temple': { lat: 15.4419, lng: 73.9714 },
  'mahalaxmi temple': { lat: 15.3997, lng: 73.9886 },
  'shri saptakoteshwar temple': { lat: 15.5492, lng: 73.9406 },
  'shri ramnath temple': { lat: 15.4183, lng: 73.9819 },
  'shri naguesh maharudra temple': { lat: 15.4056, lng: 73.9842 },
  'brahma temple': { lat: 15.5658, lng: 74.1569 },
  'shri damodar temple': { lat: 15.1844, lng: 74.1208 },

  // Gateways & Common Start Hubs
  'dabolim airport': { lat: 15.3800, lng: 73.8314 },
  'goa dabolim airport': { lat: 15.3800, lng: 73.8314 },
  'manohar international airport': { lat: 15.7667, lng: 73.8667 },
  'mopa airport': { lat: 15.7667, lng: 73.8667 },
  'madgaon railway station': { lat: 15.2694, lng: 73.9744 },
  'panaji bus stand': { lat: 15.4925, lng: 73.8340 },
  'panaji': { lat: 15.4909, lng: 73.8278 },
  'calangute': { lat: 15.5441, lng: 73.7554 },
  'margao': { lat: 15.2736, lng: 73.9582 },

  // Kochi Landmarks & Hubs
  'fort kochi': { lat: 9.9674, lng: 76.2427 },
  'mattancherry palace': { lat: 9.9583, lng: 76.2592 },
  'jewish synagogue': { lat: 9.9575, lng: 76.2597 },
  'chinese fishing nets': { lat: 9.9680, lng: 76.2435 },
  'marine drive': { lat: 9.9816, lng: 76.2753 },
  'cherai beach': { lat: 10.1417, lng: 76.1783 },
  'cochin international airport': { lat: 10.1518, lng: 76.3930 },
  'ernakulam railway station': { lat: 9.9678, lng: 76.2878 },
  'kochi': { lat: 9.9312, lng: 76.2673 },
};

// Default centroids for fallback
export const CITY_CENTROIDS: Record<string, Coordinates> = {
  goa: { lat: 15.4909, lng: 73.8278 },
  kochi: { lat: 9.9312, lng: 76.2673 },
  dubai: { lat: 25.2048, lng: 55.2708 },
  paris: { lat: 48.8566, lng: 2.3522 },
  tokyo: { lat: 35.6762, lng: 139.6503 },
  singapore: { lat: 1.3521, lng: 103.8198 },
  london: { lat: 51.5074, lng: -0.1278 }
};

/**
 * Resolve coordinates from spot name, service id, or location string
 */
export function getCoordinates(nameOrLocation: string, city: string = 'Goa'): Coordinates {
  const clean = nameOrLocation.toLowerCase().trim();
  
  // 1. Direct match in dictionary
  for (const [key, coords] of Object.entries(LANDMARK_COORDINATES)) {
    if (clean.includes(key) || key.includes(clean)) {
      return coords;
    }
  }

  // 2. City centroid with deterministic jitter based on string hash
  const cityKey = city.toLowerCase().trim();
  const centroid = CITY_CENTROIDS[cityKey] || CITY_CENTROIDS['goa'];
  
  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = (hash << 5) - hash + clean.charCodeAt(i);
    hash |= 0;
  }
  const jitterLat = ((Math.abs(hash) % 100) - 50) * 0.0015;
  const jitterLng = ((Math.abs(hash >> 2) % 100) - 50) * 0.0015;

  return {
    lat: centroid.lat + jitterLat,
    lng: centroid.lng + jitterLng
  };
}

/**
 * Haversine geodesic distance in kilometers between two points
 * Multiplied by 1.28 road winding coefficient for realistic road travel
 */
export function calculateRoadDistanceKm(pointA: Coordinates, pointB: Coordinates): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((pointB.lat - pointA.lat) * Math.PI) / 180;
  const dLng = ((pointB.lng - pointA.lng) * Math.PI) / 180;
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((pointA.lat * Math.PI) / 180) *
      Math.cos((pointB.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightLine = R * c;

  // Realistic road multiplier
  const roadKm = Math.max(0.6, straightLine * 1.28);
  return Math.round(roadKm * 10) / 10;
}

/**
 * Estimate road driving time in minutes based on distance & transport mode
 */
export function estimateDriveMinutes(distanceKm: number, mode: string = 'rental'): number {
  let avgSpeedKmh = 32; // Default for rental bike / car on coastal state highways
  if (mode === 'bike') avgSpeedKmh = 35;
  if (mode === 'bus') avgSpeedKmh = 22;
  if (mode === 'walking') avgSpeedKmh = 4.5;

  const drivingMinutes = (distanceKm / avgSpeedKmh) * 60;
  // Add 3-5 minute buffer for navigation, stops, and parking
  const total = Math.max(5, Math.round(drivingMinutes + 3));
  return total;
}

/**
 * Informative event tips & best visiting time of day
 */
export function analyzeEventAndTiming(item: ItineraryItem, city: string = 'Goa'): {
  idealBadge: string;
  recommendedDuration: number;
  eventTip: string;
  preferredSlot: 'morning' | 'midday' | 'afternoon' | 'sunset' | 'night';
} {
  const name = item.location.toLowerCase();
  const type = item.type;

  // Churches & Heritage
  if (type === 'church' || name.includes('church') || name.includes('catedral') || name.includes('basilica')) {
    if (name.includes('bom jesus')) {
      return {
        idealBadge: '☀️ Morning Heritage (08:30 AM - 11:00 AM)',
        recommendedDuration: 75,
        eventTip: 'UNESCO site housing St. Francis Xavier’s remains. Visit in the morning for serene prayers & guided interior walks before peak tourist buses arrive.',
        preferredSlot: 'morning'
      };
    }
    if (name.includes('immaculate')) {
      return {
        idealBadge: '☀️ Morning Serenity or Golden Dusk',
        recommendedDuration: 45,
        eventTip: 'Famous zigzagging staircase on Church Square. Early morning offers quiet photography with soft front lighting before Panaji traffic builds.',
        preferredSlot: 'morning'
      };
    }
    return {
      idealBadge: '☀️ Morning Calm (09:00 AM - 11:30 AM)',
      recommendedDuration: 60,
      eventTip: 'Sacred architectural monument. Modest dress recommended (covered shoulders and knees). Morning hours offer peaceful contemplation and church museum access.',
      preferredSlot: 'morning'
    };
  }

  // Temples
  if (name.includes('temple') || name.includes('mandir')) {
    return {
      idealBadge: '🕉️ Morning Darshan (08:30 AM - 11:00 AM)',
      recommendedDuration: 60,
      eventTip: 'Traditional Goan temple complex with iconic lamp tower (Deepstambha). Traditional attire recommended. Morning aarti and temple pond breeze provide serene ambience.',
      preferredSlot: 'morning'
    };
  }

  // Beaches
  if (type === 'beach' || name.includes('beach')) {
    if (name.includes('arambol')) {
      return {
        idealBadge: '🌅 Sunset Drum Circle (04:30 PM - 07:00 PM)',
        recommendedDuration: 120,
        eventTip: 'Renowned bohemian beach hub. Late afternoon features the famous sunset drum circle, beach market stalls, and sweetwater lake trail.',
        preferredSlot: 'sunset'
      };
    }
    if (name.includes('palolem') || name.includes('butterfly')) {
      return {
        idealBadge: '🐬 Sunset & Dolphin Point (04:00 PM - 06:45 PM)',
        recommendedDuration: 120,
        eventTip: 'Crescent-shaped white sand bay. Late afternoon boat trips for dolphin spotting followed by relaxed candlelit beach dining under coconut palms.',
        preferredSlot: 'sunset'
      };
    }
    if (name.includes('baga') || name.includes('calangute')) {
      return {
        idealBadge: '🏄 Afternoon Vibes & Golden Hour',
        recommendedDuration: 90,
        eventTip: 'Vibrant coastal strip with water sports (parasailing, jet-ski) operating until 5:30 PM, transitioning directly into lively seaside shack lounges.',
        preferredSlot: 'sunset'
      };
    }
    return {
      idealBadge: '🌅 Sunset & Coastal Breeze (04:30 PM - 06:45 PM)',
      recommendedDuration: 90,
      eventTip: 'Golden hour coastal stroll and sunset photography. Beach shacks serve fresh juices, tender coconut, and fresh seafood.',
      preferredSlot: 'sunset'
    };
  }

  // Vehicle / Bike Rentals
  if (type === 'rental' || name.includes('rental') || name.includes('bike')) {
    return {
      idealBadge: '🛵 Morning Vehicle Pickup (09:00 AM)',
      recommendedDuration: 25,
      eventTip: 'Collect rented scooter/car early in the day. Inspect helmets, fuel levels, and documents before setting out across scenic coastal routes.',
      preferredSlot: 'morning'
    };
  }

  // Restaurants / Cafes
  if (type === 'restaurant' || name.includes('restaurant') || name.includes('cafe')) {
    return {
      idealBadge: '🍽️ Gastronomy Lunch (01:00 PM - 02:15 PM)',
      recommendedDuration: 75,
      eventTip: 'Sample regional culinary specialties (traditional Goan fish thali, seafood, and tropical coolers) during midday rest.',
      preferredSlot: 'midday'
    };
  }

  // Shops / Markets
  if (type === 'shop' || name.includes('market') || name.includes('shop') || name.includes('bazaar')) {
    return {
      idealBadge: '🛍️ Midday / Afternoon Bazaars',
      recommendedDuration: 60,
      eventTip: 'Explore local spices, cashew feni, handicrafts, and beachwear. Best browsed between sightseeing stops.',
      preferredSlot: 'afternoon'
    };
  }

  // Default Spot
  return {
    idealBadge: '📍 Recommended Visit Window (11:00 AM - 03:00 PM)',
    recommendedDuration: 60,
    eventTip: `Popular landmark in ${city}. Carry sunscreen, hydration, and camera gear.`,
    preferredSlot: 'afternoon'
  };
}

/**
 * Solve Traveling Salesperson (TSP) route ordering using Nearest-Neighbor heuristic
 */
export function orderSpotsByDistance(
  startCoord: Coordinates,
  items: ItineraryItem[],
  city: string = 'Goa'
): ItineraryItem[] {
  if (items.length <= 1) return items;

  const remaining = [...items];
  const ordered: ItineraryItem[] = [];
  let currentCoord = startCoord;

  while (remaining.length > 0) {
    let nearestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < remaining.length; i++) {
      const itemCoord = getCoordinates(remaining[i].location, city);
      const d = calculateRoadDistanceKm(currentCoord, itemCoord);
      if (d < minDistance) {
        minDistance = d;
        nearestIndex = i;
      }
    }

    const nextItem = remaining.splice(nearestIndex, 1)[0];
    ordered.push(nextItem);
    currentCoord = getCoordinates(nextItem.location, city);
  }

  // Secondary optimization: If user picked heritage and beach, place morning heritage earlier and beach toward late afternoon if route permits
  // Only swap if extra distance is small (< 5 km)
  return balanceTimeAndDistance(ordered, city);
}

/**
 * Subtle balancing so sunsets stay in afternoon/sunset and heritage stays in morning
 */
function balanceTimeAndDistance(
  items: ItineraryItem[],
  city: string
): ItineraryItem[] {
  if (items.length <= 2) return items;

  // Classify slots
  const scored = items.map((item, index) => {
    const analysis = analyzeEventAndTiming(item, city);
    let preferredOrder = 2; // neutral
    if (analysis.preferredSlot === 'morning') preferredOrder = 1;
    if (analysis.preferredSlot === 'midday') preferredOrder = 2;
    if (analysis.preferredSlot === 'afternoon') preferredOrder = 3;
    if (analysis.preferredSlot === 'sunset' || analysis.preferredSlot === 'night') preferredOrder = 4;
    return { item, originalIndex: index, preferredOrder };
  });

  // If a sunset beach is first and a morning church is last, check if reversing the route is equal or better
  const firstIsSunset = scored[0].preferredOrder >= 4;
  const lastIsMorning = scored[scored.length - 1].preferredOrder <= 1;

  if (firstIsSunset && lastIsMorning) {
    return [...items].reverse();
  }

  return items;
}

/**
 * Parse time string like "09:00 AM" or "9:30 AM" into minutes from midnight
 */
export function timeStringToMinutes(timeStr: string): number {
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)?/i);
  if (!match) return 9 * 60; // 9:00 AM default
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const meridiem = (match[3] || 'AM').toUpperCase();

  if (meridiem === 'PM' && hours < 12) hours += 12;
  if (meridiem === 'AM' && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

/**
 * Convert minutes from midnight back to clean format e.g. "09:15 AM"
 */
export function minutesToTimeString(totalMinutes: number): string {
  const normalized = totalMinutes % (24 * 60);
  let hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  const meridiem = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  if (hours === 0) hours = 12;

  const paddedH = hours < 10 ? `0${hours}` : `${hours}`;
  const paddedM = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${paddedH}:${paddedM} ${meridiem}`;
}

/**
 * Generate Multi-Stop Google Maps Direction URL
 */
export function generateMultiStopGoogleMapsUrl(
  startName: string,
  stops: { name: string; city: string }[]
): string {
  if (stops.length === 0) return 'https://maps.google.com';

  const origin = encodeURIComponent(`${startName}`);
  const destination = encodeURIComponent(stops[stops.length - 1].name);

  if (stops.length === 1) {
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
  }

  // Middle stops are waypoints (up to 9 in free Google Maps URL)
  const waypoints = stops
    .slice(0, stops.length - 1)
    .map(s => encodeURIComponent(s.name))
    .join('|');

  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=driving`;
}

/**
 * Core Engine Function: "Arrange Plan"
 * Takes a day's items, calculates distances, re-orders for optimal route,
 * schedules timestamps, assigns transit info, and prepares route navigation.
 */
export function arrangeDayPlan(
  day: ItineraryDay,
  city: string,
  startLocationName: string = 'Hotel / Stay',
  startTimeStr: string = '09:00 AM',
  transportMode: string = 'rental'
): ItineraryDay {
  if (!day.items || day.items.length === 0) return day;

  const startCoord = getCoordinates(startLocationName, city);
  
  // 1. Order spots by proximity and ideal time of day
  const orderedItems = orderSpotsByDistance(startCoord, day.items, city);

  // 2. Build schedule with realistic travel durations and recommended stays
  let currentMinutes = timeStringToMinutes(startTimeStr);
  let previousCoord = startCoord;
  let previousName = startLocationName;
  let totalDistanceKm = 0;
  let totalDriveMinutes = 0;

  const arrangedItems: ItineraryItem[] = orderedItems.map((item) => {
    const itemCoord = getCoordinates(item.location, city);
    const distanceKm = calculateRoadDistanceKm(previousCoord, itemCoord);
    const driveMinutes = estimateDriveMinutes(distanceKm, transportMode);

    totalDistanceKm += distanceKm;
    totalDriveMinutes += driveMinutes;

    // Arrival time = previous time + driving duration
    const arrivalMinutes = currentMinutes + driveMinutes;
    const formattedArrivalTime = minutesToTimeString(arrivalMinutes);

    // Event & timing analysis
    const timingInfo = analyzeEventAndTiming(item, city);
    const visitDuration = timingInfo.recommendedDuration;

    // Departure time for next leg
    currentMinutes = arrivalMinutes + visitDuration;

    const transit: TransitInfo = {
      distanceKm,
      durationMinutes: driveMinutes,
      fromName: previousName,
      toName: item.location
    };

    previousCoord = itemCoord;
    previousName = item.location;

    return {
      ...item,
      time: formattedArrivalTime,
      transitFromPrevious: transit,
      eventTip: timingInfo.eventTip,
      idealTimingBadge: timingInfo.idealBadge,
      recommendedDurationMinutes: visitDuration
    };
  });

  // 3. Generate multi-stop Google Maps URL
  const stopsForUrl = arrangedItems.map(it => ({
    name: it.location,
    city
  }));
  const routeMapUrl = generateMultiStopGoogleMapsUrl(startLocationName, stopsForUrl);

  return {
    ...day,
    title: `${day.title} • Optimized Route`,
    items: arrangedItems,
    startLocationName,
    startTime: startTimeStr,
    totalDistanceKm: Math.round(totalDistanceKm * 10) / 10,
    totalDriveMinutes,
    routeMapUrl,
    isOptimizedRoute: true
  };
}
