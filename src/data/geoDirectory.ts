// Comprehensive Geographic Directory for PlanTriper
// Contains hierarchical data: Countries -> Cities/Destinations -> Places/Neighborhoods -> Postal Codes/PINs

export interface GeoPlace {
  name: string;
  postalCode: string;
  aliases?: string[];
}

export interface GeoCity {
  name: string;
  places: GeoPlace[];
  aliases?: string[];
}

export interface GeoCountry {
  name: string;
  code: string;
  cities: GeoCity[];
}

export interface LocationMatch {
  country: string;
  city: string;
  place: string;
  postalCode: string;
}

export const GEO_DATABASE: GeoCountry[] = [
  {
    name: 'India',
    code: 'IN',
    cities: [
      {
        name: 'Kochi',
        aliases: ['Cochin', 'Ernakulam'],
        places: [
          { name: 'Fort Kochi', postalCode: '682001', aliases: ['Fort Cochin', 'Vasco Square', 'Princess Street', 'Parade Ground'] },
          { name: 'Mattancherry', postalCode: '682002', aliases: ['Jew Town', 'Synagogue Lane', 'Dutch Palace'] },
          { name: 'Willingdon Island', postalCode: '682003', aliases: ['Port Trust', 'Embarkation Jetty'] },
          { name: 'Ernakulam South', postalCode: '682004', aliases: ['Gandhi Nagar', 'South Railway Station'] },
          { name: 'Thoppumpady', postalCode: '682005', aliases: ['Aroor Link', 'Kochangadi'] },
          { name: 'Kumbalangi', postalCode: '682007', aliases: ['Kumbalangi Tourism Village', 'Backwaters'] },
          { name: 'Thevara', postalCode: '682013', aliases: ['SH College', 'Waterfront'] },
          { name: 'Ernakulam North', postalCode: '682017', aliases: ['Kaloor', 'JLN Stadium', 'Banerji Road'] },
          { name: 'Kadavanthra', postalCode: '682020', aliases: ['Kadavanthra Junction', 'Elamkulam'] },
          { name: 'Edappally', postalCode: '682024', aliases: ['Lulu Mall', 'Edappally Toll', 'Amrita'] },
          { name: 'Palarivattom', postalCode: '682025', aliases: ['Palarivattom Bypass', 'Pipeline Junction'] },
          { name: 'Kakkanad', postalCode: '682030', aliases: ['InfoPark', 'SmartCity', 'Collectorate'] },
          { name: 'Marine Drive', postalCode: '682031', aliases: ['Broadway', 'Shanmugham Road', 'Menaka', 'Rainbow Bridge'] },
          { name: 'Panampilly Nagar', postalCode: '682036', aliases: ['Boutique Street', 'Central Avenue'] },
          { name: 'Cherai Beach', postalCode: '683514', aliases: ['Cherai', 'Vypin Island', 'Munambam', 'Pallippuram'] },
          { name: 'Aluva', postalCode: '683101', aliases: ['Aluva Palace', 'Periyar Riverfront'] },
          { name: 'Maradu', postalCode: '682304', aliases: ['Kundannoor', 'Lakeside Resorts'] },
          { name: 'Tripunithura', postalCode: '682301', aliases: ['Hill Palace', 'Statue Junction'] }
        ]
      },
      {
        name: 'Munnar',
        aliases: ['Idukki'],
        places: [
          { name: 'Old Munnar', postalCode: '685612', aliases: ['Munnar Town', 'Tea Museum', 'Headworks Dam'] },
          { name: 'Devikulam', postalCode: '685613', aliases: ['Sita Devi Lake', 'Tea Hills'] },
          { name: 'Top Station', postalCode: '685615', aliases: ['Echo Point', 'Kundala Lake'] },
          { name: 'Mattupetty', postalCode: '685616', aliases: ['Mattupetty Dam', 'Boating Hub'] },
          { name: 'Marayoor', postalCode: '685620', aliases: ['Sandalwood Forest', 'Chinnar Sanctuary', 'Dolmens'] },
          { name: 'Chithirapuram', postalCode: '685565', aliases: ['Pallivasal', 'Old Powerhouse'] }
        ]
      },
      {
        name: 'Wayanad',
        aliases: ['Kalpetta'],
        places: [
          { name: 'Kalpetta', postalCode: '673121', aliases: ['Kalpetta Bypass', 'District HQ'] },
          { name: 'Vythiri', postalCode: '673576', aliases: ['Lakkidi Viewpoint', 'Pookode Lake', 'Chain Tree'] },
          { name: 'Meppadi', postalCode: '673577', aliases: ['Chembra Peak', 'Heart Lake', 'Soochipara Waterfalls'] },
          { name: 'Sulthan Bathery', postalCode: '673592', aliases: ['Jain Temple', 'Heritage Town'] },
          { name: 'Mananthavady', postalCode: '673645', aliases: ['Thirunelly Temple', 'Kuruvadweep Island', 'Pazhassi Tomb'] }
        ]
      },
      {
        name: 'Alappuzha',
        aliases: ['Alleppey'],
        places: [
          { name: 'Alleppey Beach', postalCode: '688012', aliases: ['Old Pier', 'Lighthouse Area'] },
          { name: 'Punnamada', postalCode: '688006', aliases: ['Nehru Trophy Finishing Point', 'Houseboat Jetty'] },
          { name: 'Mararikulam', postalCode: '688523', aliases: ['Marari Beach', 'Fishing Village Resorts'] },
          { name: 'Kuttanad', postalCode: '688504', aliases: ['Rice Bowl of Kerala', 'Backwater Paddy Fields'] },
          { name: 'Champakkulam', postalCode: '688505', aliases: ['St Mary Forane Church', 'Snake Boat Hub'] }
        ]
      },
      {
        name: 'Varkala',
        aliases: ['Papanasam'],
        places: [
          { name: 'North Cliff', postalCode: '695141', aliases: ['Varkala Beach', 'Papanasam Beach', 'Cliff Walkway'] },
          { name: 'South Cliff', postalCode: '695141', aliases: ['Janardhana Swami Temple', 'South Beach'] },
          { name: 'Edava', postalCode: '695311', aliases: ['Odayam Beach', 'Edava Lake'] },
          { name: 'Kappil', postalCode: '695302', aliases: ['Kappil Beach & Estuary'] }
        ]
      },
      {
        name: 'Thiruvananthapuram',
        aliases: ['Trivandrum'],
        places: [
          { name: 'Kovalam Beach', postalCode: '695527', aliases: ['Lighthouse Beach', 'Hawa Beach', 'Samudra Beach'] },
          { name: 'Palayam', postalCode: '695001', aliases: ['MG Road', 'Secretariat', 'Museum Compound'] },
          { name: 'East Fort', postalCode: '695023', aliases: ['Padmanabhaswamy Temple', 'Chalai Bazaar'] },
          { name: 'Shankumugham', postalCode: '695007', aliases: ['Shanghumukham Beach', 'Airport Road'] },
          { name: 'Poovar', postalCode: '695525', aliases: ['Poovar Island', 'Golden Sand Beach', 'Estuary'] }
        ]
      },
      {
        name: 'Goa',
        aliases: ['North Goa', 'South Goa'],
        places: [
          { name: 'Calangute & Baga', postalCode: '403516', aliases: ['Tito Lane', 'Baga Beach', 'Calangute Beach'] },
          { name: 'Candolim', postalCode: '403515', aliases: ['Aguada Fort', 'Sinquerim Beach'] },
          { name: 'Anjuna & Vagator', postalCode: '403509', aliases: ['Chapora Fort', 'Flea Market', 'Little Vagator'] },
          { name: 'Panaji', postalCode: '403001', aliases: ['Fontainhas Latin Quarter', 'Miramar Beach', 'Mandovi Riverfront'] },
          { name: 'Colva', postalCode: '403708', aliases: ['Benaulim Beach', 'Colva Circle'] },
          { name: 'Palolem', postalCode: '403702', aliases: ['Agonda Beach', 'Butterfly Beach', 'Canacona'] }
        ]
      },
      {
        name: 'Mumbai',
        aliases: ['Bombay'],
        places: [
          { name: 'Colaba', postalCode: '400001', aliases: ['Gateway of India', 'Taj Mahal Palace', 'Colaba Causeway'] },
          { name: 'Marine Drive', postalCode: '400020', aliases: ['Churchgate', 'Nariman Point', 'Queens Necklace'] },
          { name: 'Bandra West', postalCode: '400050', aliases: ['Bandstand', 'Carter Road', 'Hill Road', 'Mount Mary'] },
          { name: 'Juhu Beach', postalCode: '400049', aliases: ['Juhu Tara Road', 'Prithvi Theatre'] },
          { name: 'Andheri West', postalCode: '400053', aliases: ['Lokhandwala', 'Oshiwara'] }
        ]
      },
      {
        name: 'Bengaluru',
        aliases: ['Bangalore'],
        places: [
          { name: 'Indiranagar', postalCode: '560038', aliases: ['100ft Road', '12th Main'] },
          { name: 'Koramangala', postalCode: '560034', aliases: ['5th Block', 'Forum Mall'] },
          { name: 'MG Road', postalCode: '560001', aliases: ['Brigade Road', 'Church Street', 'Cubbon Park'] },
          { name: 'Whitefield', postalCode: '560066', aliases: ['ITPL', 'Hope Farm'] }
        ]
      },
      {
        name: 'Delhi',
        aliases: ['New Delhi', 'NCR'],
        places: [
          { name: 'Connaught Place', postalCode: '110001', aliases: ['CP Inner Circle', 'Janpath'] },
          { name: 'Old Delhi', postalCode: '110006', aliases: ['Chandni Chowk', 'Red Fort', 'Jama Masjid'] },
          { name: 'Hauz Khas', postalCode: '110016', aliases: ['Hauz Khas Village', 'Green Park', 'Deer Park'] },
          { name: 'India Gate Area', postalCode: '110003', aliases: ['Khan Market', 'Lodhi Garden'] }
        ]
      },
      {
        name: 'Jaipur',
        aliases: ['Pink City'],
        places: [
          { name: 'Pink City', postalCode: '302003', aliases: ['Hawa Mahal', 'City Palace', 'Johari Bazaar'] },
          { name: 'Amer Fort Area', postalCode: '302028', aliases: ['Amber Palace', 'Jaigarh Fort'] },
          { name: 'C-Scheme', postalCode: '302001', aliases: ['MI Road', 'Civil Lines'] }
        ]
      }
    ]
  },
  {
    name: 'United Arab Emirates',
    code: 'AE',
    cities: [
      {
        name: 'Dubai',
        aliases: ['DXB'],
        places: [
          { name: 'Downtown Dubai', postalCode: 'Dubai-001', aliases: ['Burj Khalifa', 'Dubai Mall', 'Sheikh Mohammed Bin Rashid Blvd'] },
          { name: 'Dubai Marina & JBR', postalCode: 'Dubai-002', aliases: ['Jumeirah Beach Residence', 'Marina Promenade', 'The Walk'] },
          { name: 'Palm Jumeirah', postalCode: 'Dubai-003', aliases: ['Atlantis The Palm', 'The Pointe', 'Palm Crescent'] },
          { name: 'Deira', postalCode: 'Dubai-004', aliases: ['Gold Souk', 'Spice Souk', 'Dubai Creek Dhows'] },
          { name: 'Bur Dubai', postalCode: 'Dubai-005', aliases: ['Al Fahidi Historical', 'Al Seef', 'Meena Bazaar'] },
          { name: 'Business Bay', postalCode: 'Dubai-006', aliases: ['Dubai Water Canal', 'Marasi Drive'] },
          { name: 'Jumeirah', postalCode: 'Dubai-007', aliases: ['Kite Beach', 'Burj Al Arab Area', 'Jumeirah 1'] }
        ]
      },
      {
        name: 'Abu Dhabi',
        aliases: ['AUH'],
        places: [
          { name: 'Corniche Area', postalCode: 'AbuDhabi-001', aliases: ['Corniche Beach', 'Emirates Palace Area'] },
          { name: 'Yas Island', postalCode: 'AbuDhabi-002', aliases: ['Ferrari World', 'Yas Marina Circuit', 'Yas Mall'] },
          { name: 'Saadiyat Island', postalCode: 'AbuDhabi-003', aliases: ['Louvre Abu Dhabi', 'Saadiyat Beach'] }
        ]
      }
    ]
  },
  {
    name: 'Indonesia',
    code: 'ID',
    cities: [
      {
        name: 'Bali',
        places: [
          { name: 'Seminyak', postalCode: '80361', aliases: ['Petitenget', 'Double Six Beach', 'Oberoi'] },
          { name: 'Kuta & Legian', postalCode: '80361', aliases: ['Kuta Beach', 'Beachwalk'] },
          { name: 'Ubud', postalCode: '80571', aliases: ['Monkey Forest', 'Tegallalang', 'Ubud Art Market'] },
          { name: 'Canggu', postalCode: '80351', aliases: ['Batu Bolong', 'Echo Beach', 'Berawa'] },
          { name: 'Uluwatu', postalCode: '80364', aliases: ['Uluwatu Temple', 'Padang Padang', 'Single Fin'] },
          { name: 'Nusa Dua', postalCode: '80363', aliases: ['Geger Beach', 'Waterblow', 'BTDC Luxury Enclave'] }
        ]
      },
      {
        name: 'Jakarta',
        places: [
          { name: 'Menteng', postalCode: '10310', aliases: ['Central Jakarta', 'Monas Area'] },
          { name: 'Senopati', postalCode: '12190', aliases: ['SCBD', 'South Jakarta Dining Hub'] }
        ]
      }
    ]
  },
  {
    name: 'Thailand',
    code: 'TH',
    cities: [
      {
        name: 'Bangkok',
        aliases: ['BKK'],
        places: [
          { name: 'Sukhumvit', postalCode: '10110', aliases: ['Asok', 'Thonglor', 'Phrom Phong'] },
          { name: 'Silom & Sathorn', postalCode: '10500', aliases: ['Lumphini Park', 'Chong Nonsi'] },
          { name: 'Siam & Pratunam', postalCode: '10330', aliases: ['Siam Paragon', 'CentralWorld', 'Platinum'] },
          { name: 'Rattanakosin', postalCode: '10200', aliases: ['Grand Palace', 'Wat Pho', 'Khao San Road'] }
        ]
      },
      {
        name: 'Phuket',
        places: [
          { name: 'Patong Beach', postalCode: '83150', aliases: ['Bangla Road', 'Patong Promenade'] },
          { name: 'Kata Beach', postalCode: '83100', aliases: ['Karon Viewpoint', 'Kata Noi'] },
          { name: 'Phuket Old Town', postalCode: '83000', aliases: ['Thalang Road', 'Sino-Portuguese Heritage'] }
        ]
      }
    ]
  },
  {
    name: 'France',
    code: 'FR',
    cities: [
      {
        name: 'Paris',
        places: [
          { name: '1st Arr. Louvre & Palais-Royal', postalCode: '75001', aliases: ['Louvre Museum', 'Tuileries Garden'] },
          { name: '7th Arr. Eiffel Tower', postalCode: '75007', aliases: ['Champ de Mars', 'Musée d\'Orsay', 'Invalides'] },
          { name: '8th Arr. Champs-Élysées', postalCode: '75008', aliases: ['Arc de Triomphe', 'Place de la Concorde'] },
          { name: '18th Arr. Montmartre', postalCode: '75018', aliases: ['Sacré-Cœur', 'Place du Tertre'] }
        ]
      }
    ]
  },
  {
    name: 'United Kingdom',
    code: 'GB',
    cities: [
      {
        name: 'London',
        places: [
          { name: 'Westminster', postalCode: 'SW1A', aliases: ['Big Ben', 'Buckingham Palace', 'Houses of Parliament'] },
          { name: 'Soho & Covent Garden', postalCode: 'WC2H', aliases: ['West End', 'Leicester Square', 'Piccadilly'] },
          { name: 'City of London', postalCode: 'EC1A', aliases: ['Tower of London', 'St Pauls Cathedral'] },
          { name: 'Kensington', postalCode: 'W8', aliases: ['Hyde Park', 'Natural History Museum', 'Royal Albert Hall'] }
        ]
      }
    ]
  },
  {
    name: 'United States',
    code: 'US',
    cities: [
      {
        name: 'New York',
        aliases: ['NYC'],
        places: [
          { name: 'Midtown Manhattan', postalCode: '10001', aliases: ['Empire State Building', 'Penn Station', 'Hudson Yards'] },
          { name: 'Times Square & Theater District', postalCode: '10036', aliases: ['Broadway', 'Rockefeller Center'] },
          { name: 'Lower Manhattan', postalCode: '10004', aliases: ['Wall Street', 'Battery Park', 'One World Trade'] },
          { name: 'Brooklyn (DUMBO & Heights)', postalCode: '11201', aliases: ['Brooklyn Bridge', 'Brooklyn Promenade'] }
        ]
      }
    ]
  }
];

// Helper Functions

export function getAllCountries(): string[] {
  return GEO_DATABASE.map(c => c.name);
}

export function getCitiesByCountry(countryName: string): string[] {
  const country = GEO_DATABASE.find(c => c.name.toLowerCase() === countryName.toLowerCase());
  if (!country) return [];
  return country.cities.map(city => city.name);
}

export function getPlacesByCity(countryName: string, cityName: string): GeoPlace[] {
  const country = GEO_DATABASE.find(c => c.name.toLowerCase() === countryName.toLowerCase());
  if (!country) return [];
  const city = country.cities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
  return city ? city.places : [];
}

/**
 * Find location by exact or prefix/substring Postal Code.
 * E.g. "682001" -> Fort Kochi, Kochi, India
 * E.g. "683514" -> Cherai Beach, Kochi, India
 */
export function findLocationByPostalCode(code: string): LocationMatch | null {
  const cleanCode = code.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!cleanCode || cleanCode.length < 3) return null;

  for (const country of GEO_DATABASE) {
    for (const city of country.cities) {
      for (const place of city.places) {
        const placeCodeClean = place.postalCode.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (placeCodeClean === cleanCode || placeCodeClean.includes(cleanCode) || cleanCode.includes(placeCodeClean)) {
          return {
            country: country.name,
            city: city.name,
            place: place.name,
            postalCode: place.postalCode
          };
        }
      }
    }
  }
  return null;
}

/**
 * Find location by Place Name or Alias (e.g. "Cherai Beach", "Mattancherry", "Jew Town", "Downtown Dubai")
 */
export function findLocationByPlaceName(query: string): LocationMatch | null {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery || cleanQuery.length < 2) return null;

  for (const country of GEO_DATABASE) {
    for (const city of country.cities) {
      for (const place of city.places) {
        if (
          place.name.toLowerCase() === cleanQuery ||
          place.name.toLowerCase().includes(cleanQuery) ||
          cleanQuery.includes(place.name.toLowerCase()) ||
          (place.aliases && place.aliases.some(a => a.toLowerCase().includes(cleanQuery) || cleanQuery.includes(a.toLowerCase())))
        ) {
          return {
            country: country.name,
            city: city.name,
            place: place.name,
            postalCode: place.postalCode
          };
        }
      }
    }
  }
  return null;
}

/**
 * Auto-detect geographic location from any arbitrary text pasted or typed.
 * Can be a PIN (682001), Place (Fort Kochi), or City (Kochi).
 */
export function autoDetectLocation(input: string): LocationMatch | null {
  if (!input || !input.trim()) return null;
  const trimmed = input.trim();

  // 1. Try postal code lookup first if digits/code format
  const pinMatch = findLocationByPostalCode(trimmed);
  if (pinMatch) return pinMatch;

  // 2. Try place or neighborhood lookup
  const placeMatch = findLocationByPlaceName(trimmed);
  if (placeMatch) return placeMatch;

  // 3. Try city lookup
  for (const country of GEO_DATABASE) {
    for (const city of country.cities) {
      if (
        city.name.toLowerCase() === trimmed.toLowerCase() ||
        city.name.toLowerCase().includes(trimmed.toLowerCase()) ||
        (city.aliases && city.aliases.some(a => a.toLowerCase() === trimmed.toLowerCase()))
      ) {
        const firstPlace = city.places[0];
        return {
          country: country.name,
          city: city.name,
          place: firstPlace ? firstPlace.name : city.name,
          postalCode: firstPlace ? firstPlace.postalCode : ''
        };
      }
    }
  }

  return null;
}
