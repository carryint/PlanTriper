// Comprehensive Geographic Directory for PlanTriper
// Contains hierarchical data for ALL countries, destinations, cities, neighborhoods, and postal codes/PINs.

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

export const POPULAR_COUNTRIES: string[] = [
  "India",
  "United Arab Emirates",
  "United States",
  "United Kingdom",
  "France",
  "Italy",
  "Spain",
  "Thailand",
  "Indonesia",
  "Singapore",
  "Malaysia",
  "Japan",
  "Switzerland",
  "Germany",
  "Australia",
  "Canada",
  "Maldives",
  "Sri Lanka",
  "Egypt",
  "Greece",
  "Portugal",
  "Turkey",
  "Vietnam",
  "Netherlands",
  "Saudi Arabia",
  "Qatar",
  "Oman",
  "South Africa",
  "New Zealand",
  "Mexico"
];

export const GEO_DATABASE: GeoCountry[] = [
  {
    "name": "Afghanistan",
    "code": "AF",
    "cities": [
      {
        "name": "Kabul",
        "places": [
          {
            "name": "Kabul City Centre",
            "postalCode": "1001",
            "aliases": [
              "Kabul City Centre",
              "Kabul Kabul City Centre"
            ]
          },
          {
            "name": "Shahr-e Naw",
            "postalCode": "1001",
            "aliases": [
              "Shahr-e Naw",
              "Kabul Shahr-e Naw"
            ]
          },
          {
            "name": "Wazir Akbar Khan",
            "postalCode": "1001",
            "aliases": [
              "Wazir Akbar Khan",
              "Kabul Wazir Akbar Khan"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Albania",
    "code": "AL",
    "cities": [
      {
        "name": "Tirana",
        "places": [
          {
            "name": "Skanderbeg Square",
            "postalCode": "1001",
            "aliases": [
              "Skanderbeg Square",
              "Tirana Skanderbeg Square"
            ]
          },
          {
            "name": "Blloku",
            "postalCode": "1001",
            "aliases": [
              "Blloku",
              "Tirana Blloku"
            ]
          },
          {
            "name": "Dajti Mountain",
            "postalCode": "1001",
            "aliases": [
              "Dajti Mountain",
              "Tirana Dajti Mountain"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Algeria",
    "code": "DZ",
    "cities": [
      {
        "name": "Algiers",
        "places": [
          {
            "name": "Casbah of Algiers",
            "postalCode": "16000",
            "aliases": [
              "Casbah of Algiers",
              "Algiers Casbah of Algiers"
            ]
          },
          {
            "name": "Didouche Mourad",
            "postalCode": "16000",
            "aliases": [
              "Didouche Mourad",
              "Algiers Didouche Mourad"
            ]
          },
          {
            "name": "El Hamma",
            "postalCode": "16000",
            "aliases": [
              "El Hamma",
              "Algiers El Hamma"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Andorra",
    "code": "AD",
    "cities": [
      {
        "name": "Andorra la Vella",
        "places": [
          {
            "name": "Avinguda Meritxell",
            "postalCode": "AD500",
            "aliases": [
              "Avinguda Meritxell",
              "Andorra la Vella Avinguda Meritxell"
            ]
          },
          {
            "name": "Old Town",
            "postalCode": "AD500",
            "aliases": [
              "Old Town",
              "Andorra la Vella Old Town"
            ]
          },
          {
            "name": "Vallnord",
            "postalCode": "AD500",
            "aliases": [
              "Vallnord",
              "Andorra la Vella Vallnord"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Angola",
    "code": "AO",
    "cities": [
      {
        "name": "Luanda",
        "places": [
          {
            "name": "Luanda Waterfront (Marginal)",
            "postalCode": "1000",
            "aliases": [
              "Luanda Waterfront (Marginal)",
              "Luanda Luanda Waterfront (Marginal)"
            ]
          },
          {
            "name": "Ilha do Cabo",
            "postalCode": "1000",
            "aliases": [
              "Ilha do Cabo",
              "Luanda Ilha do Cabo"
            ]
          },
          {
            "name": "Miramar",
            "postalCode": "1000",
            "aliases": [
              "Miramar",
              "Luanda Miramar"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Antigua and Barbuda",
    "code": "AG",
    "cities": [
      {
        "name": "St. John's",
        "places": [
          {
            "name": "Dickenson Bay",
            "postalCode": "00000",
            "aliases": [
              "Dickenson Bay",
              "St. John's Dickenson Bay"
            ]
          },
          {
            "name": "St. John's Harbour",
            "postalCode": "00000",
            "aliases": [
              "St. John's Harbour",
              "St. John's St. John's Harbour"
            ]
          },
          {
            "name": "English Harbour",
            "postalCode": "00000",
            "aliases": [
              "English Harbour",
              "St. John's English Harbour"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Argentina",
    "code": "AR",
    "cities": [
      {
        "name": "Buenos Aires",
        "places": [
          {
            "name": "Palermo",
            "postalCode": "C1001",
            "aliases": [
              "Palermo",
              "Buenos Aires Palermo"
            ]
          },
          {
            "name": "Recoleta",
            "postalCode": "C1001",
            "aliases": [
              "Recoleta",
              "Buenos Aires Recoleta"
            ]
          },
          {
            "name": "San Telmo",
            "postalCode": "C1001",
            "aliases": [
              "San Telmo",
              "Buenos Aires San Telmo"
            ]
          },
          {
            "name": "Puerto Madero",
            "postalCode": "C1001",
            "aliases": [
              "Puerto Madero",
              "Buenos Aires Puerto Madero"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Armenia",
    "code": "AM",
    "cities": [
      {
        "name": "Yerevan",
        "places": [
          {
            "name": "Republic Square",
            "postalCode": "0010",
            "aliases": [
              "Republic Square",
              "Yerevan Republic Square"
            ]
          },
          {
            "name": "Cascade Complex",
            "postalCode": "0010",
            "aliases": [
              "Cascade Complex",
              "Yerevan Cascade Complex"
            ]
          },
          {
            "name": "Northern Avenue",
            "postalCode": "0010",
            "aliases": [
              "Northern Avenue",
              "Yerevan Northern Avenue"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Aruba",
    "code": "AW",
    "cities": [
      {
        "name": "Oranjestad",
        "places": [
          {
            "name": "Palm Beach High Rise",
            "postalCode": "0000",
            "aliases": [
              "Palm Beach High Rise",
              "Oranjestad Palm Beach High Rise"
            ]
          },
          {
            "name": "Eagle Beach",
            "postalCode": "0000",
            "aliases": [
              "Eagle Beach",
              "Oranjestad Eagle Beach"
            ]
          },
          {
            "name": "Baby Beach",
            "postalCode": "0000",
            "aliases": [
              "Baby Beach",
              "Oranjestad Baby Beach"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Australia",
    "code": "AU",
    "cities": [
      {
        "name": "Sydney",
        "aliases": [
          "NSW"
        ],
        "places": [
          {
            "name": "Sydney Harbour & Circular Quay",
            "postalCode": "2000",
            "aliases": [
              "Sydney Opera House",
              "Harbour Bridge",
              "The Rocks"
            ]
          },
          {
            "name": "Bondi Beach",
            "postalCode": "2026",
            "aliases": [
              "Bondi to Coogee Coastal Walk",
              "Icebergs Pool"
            ]
          },
          {
            "name": "Darling Harbour",
            "postalCode": "2000",
            "aliases": [
              "Cockle Bay",
              "Barangaroo"
            ]
          },
          {
            "name": "Manly Beach",
            "postalCode": "2095",
            "aliases": [
              "Manly Ferry",
              "The Corso"
            ]
          }
        ]
      },
      {
        "name": "Melbourne",
        "aliases": [
          "Victoria"
        ],
        "places": [
          {
            "name": "CBD & Federation Square",
            "postalCode": "3000",
            "aliases": [
              "Flinders Street Station",
              "Hosier Lane Street Art",
              "Yarra River"
            ]
          },
          {
            "name": "St Kilda Beach",
            "postalCode": "3182",
            "aliases": [
              "Luna Park",
              "Acland Street Bakeries",
              "St Kilda Pier"
            ]
          }
        ]
      },
      {
        "name": "Gold Coast",
        "aliases": [
          "Queensland"
        ],
        "places": [
          {
            "name": "Surfers Paradise",
            "postalCode": "4217",
            "aliases": [
              "Cavill Avenue",
              "SkyPoint Observation Deck"
            ]
          }
        ]
      },
      {
        "name": "Cairns",
        "aliases": [
          "Great Barrier Reef Gateway"
        ],
        "places": [
          {
            "name": "Cairns Esplanade & Marina",
            "postalCode": "4870",
            "aliases": [
              "Lagoon",
              "Reef Fleet Terminal"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Austria",
    "code": "AT",
    "cities": [
      {
        "name": "Vienna",
        "places": [
          {
            "name": "Innere Stadt",
            "postalCode": "1010",
            "aliases": [
              "Innere Stadt",
              "Vienna Innere Stadt"
            ]
          },
          {
            "name": "Schönbrunn Palace",
            "postalCode": "1010",
            "aliases": [
              "Schönbrunn Palace",
              "Vienna Schönbrunn Palace"
            ]
          },
          {
            "name": "MuseumsQuartier",
            "postalCode": "1010",
            "aliases": [
              "MuseumsQuartier",
              "Vienna MuseumsQuartier"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Azerbaijan",
    "code": "AZ",
    "cities": [
      {
        "name": "Baku",
        "places": [
          {
            "name": "Old City (Icherisheher)",
            "postalCode": "AZ1000",
            "aliases": [
              "Old City (Icherisheher)",
              "Baku Old City (Icherisheher)"
            ]
          },
          {
            "name": "Flame Towers",
            "postalCode": "AZ1000",
            "aliases": [
              "Flame Towers",
              "Baku Flame Towers"
            ]
          },
          {
            "name": "Baku Boulevard",
            "postalCode": "AZ1000",
            "aliases": [
              "Baku Boulevard",
              "Baku Baku Boulevard"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Bahamas",
    "code": "BS",
    "cities": [
      {
        "name": "Nassau",
        "places": [
          {
            "name": "Paradise Island",
            "postalCode": "00000",
            "aliases": [
              "Paradise Island",
              "Nassau Paradise Island"
            ]
          },
          {
            "name": "Downtown Nassau",
            "postalCode": "00000",
            "aliases": [
              "Downtown Nassau",
              "Nassau Downtown Nassau"
            ]
          },
          {
            "name": "Cable Beach",
            "postalCode": "00000",
            "aliases": [
              "Cable Beach",
              "Nassau Cable Beach"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Bahrain",
    "code": "BH",
    "cities": [
      {
        "name": "Manama",
        "places": [
          {
            "name": "Bab Al Bahrain",
            "postalCode": "316",
            "aliases": [
              "Bab Al Bahrain",
              "Manama Bab Al Bahrain"
            ]
          },
          {
            "name": "Seef District",
            "postalCode": "316",
            "aliases": [
              "Seef District",
              "Manama Seef District"
            ]
          },
          {
            "name": "Juffair",
            "postalCode": "316",
            "aliases": [
              "Juffair",
              "Manama Juffair"
            ]
          },
          {
            "name": "Amwaj Islands",
            "postalCode": "316",
            "aliases": [
              "Amwaj Islands",
              "Manama Amwaj Islands"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Bangladesh",
    "code": "BD",
    "cities": [
      {
        "name": "Dhaka",
        "places": [
          {
            "name": "Gulshan",
            "postalCode": "1000",
            "aliases": [
              "Gulshan",
              "Dhaka Gulshan"
            ]
          },
          {
            "name": "Banani",
            "postalCode": "1000",
            "aliases": [
              "Banani",
              "Dhaka Banani"
            ]
          },
          {
            "name": "Old Dhaka",
            "postalCode": "1000",
            "aliases": [
              "Old Dhaka",
              "Dhaka Old Dhaka"
            ]
          },
          {
            "name": "Cox’s Bazar Beach",
            "postalCode": "1000",
            "aliases": [
              "Cox’s Bazar Beach",
              "Dhaka Cox’s Bazar Beach"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Barbados",
    "code": "BB",
    "cities": [
      {
        "name": "Bridgetown",
        "places": [
          {
            "name": "Carlisle Bay",
            "postalCode": "BB11000",
            "aliases": [
              "Carlisle Bay",
              "Bridgetown Carlisle Bay"
            ]
          },
          {
            "name": "St. Lawrence Gap",
            "postalCode": "BB11000",
            "aliases": [
              "St. Lawrence Gap",
              "Bridgetown St. Lawrence Gap"
            ]
          },
          {
            "name": "Holetown",
            "postalCode": "BB11000",
            "aliases": [
              "Holetown",
              "Bridgetown Holetown"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Belarus",
    "code": "BY",
    "cities": [
      {
        "name": "Minsk",
        "places": [
          {
            "name": "Independence Square",
            "postalCode": "220030",
            "aliases": [
              "Independence Square",
              "Minsk Independence Square"
            ]
          },
          {
            "name": "Nemiga",
            "postalCode": "220030",
            "aliases": [
              "Nemiga",
              "Minsk Nemiga"
            ]
          },
          {
            "name": "Trinity Suburb",
            "postalCode": "220030",
            "aliases": [
              "Trinity Suburb",
              "Minsk Trinity Suburb"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Belgium",
    "code": "BE",
    "cities": [
      {
        "name": "Brussels",
        "places": [
          {
            "name": "Grand Place",
            "postalCode": "1000",
            "aliases": [
              "Grand Place",
              "Brussels Grand Place"
            ]
          },
          {
            "name": "Sablon",
            "postalCode": "1000",
            "aliases": [
              "Sablon",
              "Brussels Sablon"
            ]
          },
          {
            "name": "European Quarter",
            "postalCode": "1000",
            "aliases": [
              "European Quarter",
              "Brussels European Quarter"
            ]
          },
          {
            "name": "Bruges Old Town",
            "postalCode": "1000",
            "aliases": [
              "Bruges Old Town",
              "Brussels Bruges Old Town"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Belize",
    "code": "BZ",
    "cities": [
      {
        "name": "Belize City",
        "places": [
          {
            "name": "San Pedro (Ambergris Caye)",
            "postalCode": "00000",
            "aliases": [
              "San Pedro (Ambergris Caye)",
              "Belize City San Pedro (Ambergris Caye)"
            ]
          },
          {
            "name": "Caye Caulker",
            "postalCode": "00000",
            "aliases": [
              "Caye Caulker",
              "Belize City Caye Caulker"
            ]
          },
          {
            "name": "Placencia",
            "postalCode": "00000",
            "aliases": [
              "Placencia",
              "Belize City Placencia"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Benin",
    "code": "BJ",
    "cities": [
      {
        "name": "Porto-Novo",
        "places": [
          {
            "name": "Cotonou Beach",
            "postalCode": "00000",
            "aliases": [
              "Cotonou Beach",
              "Porto-Novo Cotonou Beach"
            ]
          },
          {
            "name": "Ganvie Lake Village",
            "postalCode": "00000",
            "aliases": [
              "Ganvie Lake Village",
              "Porto-Novo Ganvie Lake Village"
            ]
          },
          {
            "name": "Ouidah",
            "postalCode": "00000",
            "aliases": [
              "Ouidah",
              "Porto-Novo Ouidah"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Bermuda",
    "code": "BM",
    "cities": [
      {
        "name": "Hamilton",
        "places": [
          {
            "name": "Horseshoe Bay Beach",
            "postalCode": "HM 11",
            "aliases": [
              "Horseshoe Bay Beach",
              "Hamilton Horseshoe Bay Beach"
            ]
          },
          {
            "name": "St. George UNESCO Town",
            "postalCode": "HM 11",
            "aliases": [
              "St. George UNESCO Town",
              "Hamilton St. George UNESCO Town"
            ]
          },
          {
            "name": "Front Street",
            "postalCode": "HM 11",
            "aliases": [
              "Front Street",
              "Hamilton Front Street"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Bhutan",
    "code": "BT",
    "cities": [
      {
        "name": "Thimphu",
        "places": [
          {
            "name": "Tashichho Dzong",
            "postalCode": "11001",
            "aliases": [
              "Tashichho Dzong",
              "Thimphu Tashichho Dzong"
            ]
          },
          {
            "name": "Buddha Dordenma",
            "postalCode": "11001",
            "aliases": [
              "Buddha Dordenma",
              "Thimphu Buddha Dordenma"
            ]
          },
          {
            "name": "Paro Tiger’s Nest (Taktsang)",
            "postalCode": "11001",
            "aliases": [
              "Paro Tiger’s Nest (Taktsang)",
              "Thimphu Paro Tiger’s Nest (Taktsang)"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Bolivia",
    "code": "BO",
    "cities": [
      {
        "name": "La Paz",
        "places": [
          {
            "name": "Witches’ Market",
            "postalCode": "00000",
            "aliases": [
              "Witches’ Market",
              "La Paz Witches’ Market"
            ]
          },
          {
            "name": "Teleférico Line",
            "postalCode": "00000",
            "aliases": [
              "Teleférico Line",
              "La Paz Teleférico Line"
            ]
          },
          {
            "name": "Salar de Uyuni",
            "postalCode": "00000",
            "aliases": [
              "Salar de Uyuni",
              "La Paz Salar de Uyuni"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Bosnia and Herzegovina",
    "code": "BA",
    "cities": [
      {
        "name": "Sarajevo",
        "places": [
          {
            "name": "Baščaršija Old Bazaar",
            "postalCode": "71000",
            "aliases": [
              "Baščaršija Old Bazaar",
              "Sarajevo Baščaršija Old Bazaar"
            ]
          },
          {
            "name": "Latin Bridge",
            "postalCode": "71000",
            "aliases": [
              "Latin Bridge",
              "Sarajevo Latin Bridge"
            ]
          },
          {
            "name": "Mostar Old Bridge",
            "postalCode": "71000",
            "aliases": [
              "Mostar Old Bridge",
              "Sarajevo Mostar Old Bridge"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Botswana",
    "code": "BW",
    "cities": [
      {
        "name": "Gaborone",
        "places": [
          {
            "name": "Okavango Delta",
            "postalCode": "00000",
            "aliases": [
              "Okavango Delta",
              "Gaborone Okavango Delta"
            ]
          },
          {
            "name": "Chobe National Park",
            "postalCode": "00000",
            "aliases": [
              "Chobe National Park",
              "Gaborone Chobe National Park"
            ]
          },
          {
            "name": "Central Business District",
            "postalCode": "00000",
            "aliases": [
              "Central Business District",
              "Gaborone Central Business District"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Brazil",
    "code": "BR",
    "cities": [
      {
        "name": "Brasilia",
        "places": [
          {
            "name": "Copacabana Beach",
            "postalCode": "70000-000",
            "aliases": [
              "Copacabana Beach",
              "Brasilia Copacabana Beach"
            ]
          },
          {
            "name": "Ipanema",
            "postalCode": "70000-000",
            "aliases": [
              "Ipanema",
              "Brasilia Ipanema"
            ]
          },
          {
            "name": "Corcovado / Christ the Redeemer",
            "postalCode": "70000-000",
            "aliases": [
              "Corcovado / Christ the Redeemer",
              "Brasilia Corcovado / Christ the Redeemer"
            ]
          },
          {
            "name": "Avenida Paulista",
            "postalCode": "70000-000",
            "aliases": [
              "Avenida Paulista",
              "Brasilia Avenida Paulista"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Brunei",
    "code": "BN",
    "cities": [
      {
        "name": "Bandar Seri Begawan",
        "places": [
          {
            "name": "Sultan Omar Ali Saifuddien Mosque",
            "postalCode": "BS8611",
            "aliases": [
              "Sultan Omar Ali Saifuddien Mosque",
              "Bandar Seri Begawan Sultan Omar Ali Saifuddien Mosque"
            ]
          },
          {
            "name": "Kampong Ayer",
            "postalCode": "BS8611",
            "aliases": [
              "Kampong Ayer",
              "Bandar Seri Begawan Kampong Ayer"
            ]
          },
          {
            "name": "Gadong",
            "postalCode": "BS8611",
            "aliases": [
              "Gadong",
              "Bandar Seri Begawan Gadong"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Bulgaria",
    "code": "BG",
    "cities": [
      {
        "name": "Sofia",
        "places": [
          {
            "name": "Alexander Nevsky Cathedral",
            "postalCode": "1000",
            "aliases": [
              "Alexander Nevsky Cathedral",
              "Sofia Alexander Nevsky Cathedral"
            ]
          },
          {
            "name": "Vitosha Boulevard",
            "postalCode": "1000",
            "aliases": [
              "Vitosha Boulevard",
              "Sofia Vitosha Boulevard"
            ]
          },
          {
            "name": "Bansko Ski Resort",
            "postalCode": "1000",
            "aliases": [
              "Bansko Ski Resort",
              "Sofia Bansko Ski Resort"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Burkina Faso",
    "code": "BF",
    "cities": [
      {
        "name": "Ouagadougou",
        "places": [
          {
            "name": "Grand Mosque",
            "postalCode": "00000",
            "aliases": [
              "Grand Mosque",
              "Ouagadougou Grand Mosque"
            ]
          },
          {
            "name": "Ouaga 2000",
            "postalCode": "00000",
            "aliases": [
              "Ouaga 2000",
              "Ouagadougou Ouaga 2000"
            ]
          },
          {
            "name": "National Museum",
            "postalCode": "00000",
            "aliases": [
              "National Museum",
              "Ouagadougou National Museum"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Burundi",
    "code": "BI",
    "cities": [
      {
        "name": "Gitega",
        "places": [
          {
            "name": "Bujumbura Lake Tanganyika",
            "postalCode": "00000",
            "aliases": [
              "Bujumbura Lake Tanganyika",
              "Gitega Bujumbura Lake Tanganyika"
            ]
          },
          {
            "name": "Livingstone-Stanley Monument",
            "postalCode": "00000",
            "aliases": [
              "Livingstone-Stanley Monument",
              "Gitega Livingstone-Stanley Monument"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Cabo Verde",
    "code": "CV",
    "cities": [
      {
        "name": "Praia",
        "places": [
          {
            "name": "Santa Maria Beach (Sal)",
            "postalCode": "7600",
            "aliases": [
              "Santa Maria Beach (Sal)",
              "Praia Santa Maria Beach (Sal)"
            ]
          },
          {
            "name": "Mindelo Harbor",
            "postalCode": "7600",
            "aliases": [
              "Mindelo Harbor",
              "Praia Mindelo Harbor"
            ]
          },
          {
            "name": "Plateau",
            "postalCode": "7600",
            "aliases": [
              "Plateau",
              "Praia Plateau"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Cambodia",
    "code": "KH",
    "cities": [
      {
        "name": "Phnom Penh",
        "places": [
          {
            "name": "Angkor Wat (Siem Reap)",
            "postalCode": "12000",
            "aliases": [
              "Angkor Wat (Siem Reap)",
              "Phnom Penh Angkor Wat (Siem Reap)"
            ]
          },
          {
            "name": "Pub Street",
            "postalCode": "12000",
            "aliases": [
              "Pub Street",
              "Phnom Penh Pub Street"
            ]
          },
          {
            "name": "Royal Palace Phnom Penh",
            "postalCode": "12000",
            "aliases": [
              "Royal Palace Phnom Penh",
              "Phnom Penh Royal Palace Phnom Penh"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Cameroon",
    "code": "CM",
    "cities": [
      {
        "name": "Yaounde",
        "places": [
          {
            "name": "Douala Bonanjo",
            "postalCode": "00000",
            "aliases": [
              "Douala Bonanjo",
              "Yaounde Douala Bonanjo"
            ]
          },
          {
            "name": "Limbe Black Beach",
            "postalCode": "00000",
            "aliases": [
              "Limbe Black Beach",
              "Yaounde Limbe Black Beach"
            ]
          },
          {
            "name": "Mount Cameroon",
            "postalCode": "00000",
            "aliases": [
              "Mount Cameroon",
              "Yaounde Mount Cameroon"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Canada",
    "code": "CA",
    "cities": [
      {
        "name": "Toronto",
        "aliases": [
          "Ontario",
          "GTA"
        ],
        "places": [
          {
            "name": "Downtown Toronto & CN Tower",
            "postalCode": "M5V 3L9",
            "aliases": [
              "Ripley Aquarium",
              "Rogers Centre",
              "Union Station"
            ]
          },
          {
            "name": "Distillery Historic District",
            "postalCode": "M5A 3C4",
            "aliases": [
              "Cobblestone Streets",
              "Art Galleries"
            ]
          }
        ]
      },
      {
        "name": "Vancouver",
        "aliases": [
          "British Columbia"
        ],
        "places": [
          {
            "name": "Downtown Vancouver & Gastown",
            "postalCode": "V6B 1B8",
            "aliases": [
              "Gastown Steam Clock",
              "Canada Place"
            ]
          },
          {
            "name": "Stanley Park & English Bay",
            "postalCode": "V6G 1Z4",
            "aliases": [
              "Seawall Promenade",
              "Totem Poles"
            ]
          }
        ]
      },
      {
        "name": "Montreal",
        "aliases": [
          "Montréal",
          "Quebec"
        ],
        "places": [
          {
            "name": "Old Montreal (Vieux-Montréal)",
            "postalCode": "H2Y 1T1",
            "aliases": [
              "Notre-Dame Basilica",
              "Old Port"
            ]
          }
        ]
      },
      {
        "name": "Banff",
        "aliases": [
          "Alberta",
          "Canadian Rockies"
        ],
        "places": [
          {
            "name": "Banff Townsite & Avenue",
            "postalCode": "T1L 1A1",
            "aliases": [
              "Lake Louise",
              "Moraine Lake",
              "Banff Gondola"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Cape Verde",
    "code": "CV",
    "cities": [
      {
        "name": "Praia",
        "places": [
          {
            "name": "Santa Maria Beach (Sal)",
            "postalCode": "7600",
            "aliases": [
              "Santa Maria Beach (Sal)",
              "Praia Santa Maria Beach (Sal)"
            ]
          },
          {
            "name": "Mindelo Harbor",
            "postalCode": "7600",
            "aliases": [
              "Mindelo Harbor",
              "Praia Mindelo Harbor"
            ]
          },
          {
            "name": "Plateau",
            "postalCode": "7600",
            "aliases": [
              "Plateau",
              "Praia Plateau"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Cayman Islands",
    "code": "KY",
    "cities": [
      {
        "name": "George Town",
        "places": [
          {
            "name": "Seven Mile Beach",
            "postalCode": "KY1-1102",
            "aliases": [
              "Seven Mile Beach",
              "George Town Seven Mile Beach"
            ]
          },
          {
            "name": "Stingray City",
            "postalCode": "KY1-1102",
            "aliases": [
              "Stingray City",
              "George Town Stingray City"
            ]
          },
          {
            "name": "Camana Bay",
            "postalCode": "KY1-1102",
            "aliases": [
              "Camana Bay",
              "George Town Camana Bay"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Central African Republic",
    "code": "CF",
    "cities": [
      {
        "name": "Bangui",
        "places": [
          {
            "name": "Boganda Museum",
            "postalCode": "00000",
            "aliases": [
              "Boganda Museum",
              "Bangui Boganda Museum"
            ]
          },
          {
            "name": "Ubangi Riverfront",
            "postalCode": "00000",
            "aliases": [
              "Ubangi Riverfront",
              "Bangui Ubangi Riverfront"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Chad",
    "code": "TD",
    "cities": [
      {
        "name": "N'Djamena",
        "places": [
          {
            "name": "Chari River",
            "postalCode": "00000",
            "aliases": [
              "Chari River",
              "N'Djamena Chari River"
            ]
          },
          {
            "name": "Grand Marché",
            "postalCode": "00000",
            "aliases": [
              "Grand Marché",
              "N'Djamena Grand Marché"
            ]
          },
          {
            "name": "Avenue Charles de Gaulle",
            "postalCode": "00000",
            "aliases": [
              "Avenue Charles de Gaulle",
              "N'Djamena Avenue Charles de Gaulle"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Chile",
    "code": "CL",
    "cities": [
      {
        "name": "Santiago",
        "places": [
          {
            "name": "Bellavista",
            "postalCode": "8320000",
            "aliases": [
              "Bellavista",
              "Santiago Bellavista"
            ]
          },
          {
            "name": "San Cristóbal Hill",
            "postalCode": "8320000",
            "aliases": [
              "San Cristóbal Hill",
              "Santiago San Cristóbal Hill"
            ]
          },
          {
            "name": "Valparaíso Port",
            "postalCode": "8320000",
            "aliases": [
              "Valparaíso Port",
              "Santiago Valparaíso Port"
            ]
          },
          {
            "name": "Atacama Desert",
            "postalCode": "8320000",
            "aliases": [
              "Atacama Desert",
              "Santiago Atacama Desert"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "China",
    "code": "CN",
    "cities": [
      {
        "name": "Beijing",
        "places": [
          {
            "name": "Forbidden City",
            "postalCode": "100000",
            "aliases": [
              "Forbidden City",
              "Beijing Forbidden City"
            ]
          },
          {
            "name": "Great Wall (Mutianyu)",
            "postalCode": "100000",
            "aliases": [
              "Great Wall (Mutianyu)",
              "Beijing Great Wall (Mutianyu)"
            ]
          },
          {
            "name": "The Bund (Shanghai)",
            "postalCode": "100000",
            "aliases": [
              "The Bund (Shanghai)",
              "Beijing The Bund (Shanghai)"
            ]
          },
          {
            "name": "Guilin Riverfront",
            "postalCode": "100000",
            "aliases": [
              "Guilin Riverfront",
              "Beijing Guilin Riverfront"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Colombia",
    "code": "CO",
    "cities": [
      {
        "name": "Bogota",
        "places": [
          {
            "name": "La Candelaria",
            "postalCode": "110111",
            "aliases": [
              "La Candelaria",
              "Bogota La Candelaria"
            ]
          },
          {
            "name": "Monserrate",
            "postalCode": "110111",
            "aliases": [
              "Monserrate",
              "Bogota Monserrate"
            ]
          },
          {
            "name": "Cartagena Walled City",
            "postalCode": "110111",
            "aliases": [
              "Cartagena Walled City",
              "Bogota Cartagena Walled City"
            ]
          },
          {
            "name": "Medellin El Poblado",
            "postalCode": "110111",
            "aliases": [
              "Medellin El Poblado",
              "Bogota Medellin El Poblado"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Comoros",
    "code": "KM",
    "cities": [
      {
        "name": "Moroni",
        "places": [
          {
            "name": "Old Friday Mosque",
            "postalCode": "00000",
            "aliases": [
              "Old Friday Mosque",
              "Moroni Old Friday Mosque"
            ]
          },
          {
            "name": "Karthala Volcano",
            "postalCode": "00000",
            "aliases": [
              "Karthala Volcano",
              "Moroni Karthala Volcano"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Costa Rica",
    "code": "CR",
    "cities": [
      {
        "name": "San Jose",
        "places": [
          {
            "name": "Manuel Antonio Beach",
            "postalCode": "10101",
            "aliases": [
              "Manuel Antonio Beach",
              "San Jose Manuel Antonio Beach"
            ]
          },
          {
            "name": "Arenal Volcano (La Fortuna)",
            "postalCode": "10101",
            "aliases": [
              "Arenal Volcano (La Fortuna)",
              "San Jose Arenal Volcano (La Fortuna)"
            ]
          },
          {
            "name": "Monteverde Cloud Forest",
            "postalCode": "10101",
            "aliases": [
              "Monteverde Cloud Forest",
              "San Jose Monteverde Cloud Forest"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Croatia",
    "code": "HR",
    "cities": [
      {
        "name": "Zagreb",
        "places": [
          {
            "name": "Dubrovnik Old Town Walls",
            "postalCode": "10000",
            "aliases": [
              "Dubrovnik Old Town Walls",
              "Zagreb Dubrovnik Old Town Walls"
            ]
          },
          {
            "name": "Diocletian’s Palace (Split)",
            "postalCode": "10000",
            "aliases": [
              "Diocletian’s Palace (Split)",
              "Zagreb Diocletian’s Palace (Split)"
            ]
          },
          {
            "name": "Plitvice Lakes",
            "postalCode": "10000",
            "aliases": [
              "Plitvice Lakes",
              "Zagreb Plitvice Lakes"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Cuba",
    "code": "CU",
    "cities": [
      {
        "name": "Havana",
        "places": [
          {
            "name": "Old Havana (Habana Vieja)",
            "postalCode": "10100",
            "aliases": [
              "Old Havana (Habana Vieja)",
              "Havana Old Havana (Habana Vieja)"
            ]
          },
          {
            "name": "Malecón Promenade",
            "postalCode": "10100",
            "aliases": [
              "Malecón Promenade",
              "Havana Malecón Promenade"
            ]
          },
          {
            "name": "Varadero Beach",
            "postalCode": "10100",
            "aliases": [
              "Varadero Beach",
              "Havana Varadero Beach"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Curaçao",
    "code": "CW",
    "cities": [
      {
        "name": "Willemstad",
        "places": [
          {
            "name": "Handelskade Waterfront",
            "postalCode": "0000",
            "aliases": [
              "Handelskade Waterfront",
              "Willemstad Handelskade Waterfront"
            ]
          },
          {
            "name": "Queen Emma Bridge",
            "postalCode": "0000",
            "aliases": [
              "Queen Emma Bridge",
              "Willemstad Queen Emma Bridge"
            ]
          },
          {
            "name": "Kenepa Beach",
            "postalCode": "0000",
            "aliases": [
              "Kenepa Beach",
              "Willemstad Kenepa Beach"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Cyprus",
    "code": "CY",
    "cities": [
      {
        "name": "Nicosia",
        "places": [
          {
            "name": "Ayia Napa Nissi Beach",
            "postalCode": "1010",
            "aliases": [
              "Ayia Napa Nissi Beach",
              "Nicosia Ayia Napa Nissi Beach"
            ]
          },
          {
            "name": "Limassol Marina",
            "postalCode": "1010",
            "aliases": [
              "Limassol Marina",
              "Nicosia Limassol Marina"
            ]
          },
          {
            "name": "Paphos Archaeological Park",
            "postalCode": "1010",
            "aliases": [
              "Paphos Archaeological Park",
              "Nicosia Paphos Archaeological Park"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Czech Republic",
    "code": "CZ",
    "cities": [
      {
        "name": "Prague",
        "places": [
          {
            "name": "Old Town Square",
            "postalCode": "110 00",
            "aliases": [
              "Old Town Square",
              "Prague Old Town Square"
            ]
          },
          {
            "name": "Charles Bridge",
            "postalCode": "110 00",
            "aliases": [
              "Charles Bridge",
              "Prague Charles Bridge"
            ]
          },
          {
            "name": "Prague Castle",
            "postalCode": "110 00",
            "aliases": [
              "Prague Castle",
              "Prague Prague Castle"
            ]
          },
          {
            "name": "Cesky Krumlov",
            "postalCode": "110 00",
            "aliases": [
              "Cesky Krumlov",
              "Prague Cesky Krumlov"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Democratic Republic of the Congo",
    "code": "CD",
    "cities": [
      {
        "name": "Kinshasa",
        "places": [
          {
            "name": "Gombe",
            "postalCode": "00000",
            "aliases": [
              "Gombe",
              "Kinshasa Gombe"
            ]
          },
          {
            "name": "Boulevard du 30 Juin",
            "postalCode": "00000",
            "aliases": [
              "Boulevard du 30 Juin",
              "Kinshasa Boulevard du 30 Juin"
            ]
          },
          {
            "name": "Virunga National Park",
            "postalCode": "00000",
            "aliases": [
              "Virunga National Park",
              "Kinshasa Virunga National Park"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Denmark",
    "code": "DK",
    "cities": [
      {
        "name": "Copenhagen",
        "places": [
          {
            "name": "Nyhavn",
            "postalCode": "1050",
            "aliases": [
              "Nyhavn",
              "Copenhagen Nyhavn"
            ]
          },
          {
            "name": "Tivoli Gardens",
            "postalCode": "1050",
            "aliases": [
              "Tivoli Gardens",
              "Copenhagen Tivoli Gardens"
            ]
          },
          {
            "name": "The Little Mermaid",
            "postalCode": "1050",
            "aliases": [
              "The Little Mermaid",
              "Copenhagen The Little Mermaid"
            ]
          },
          {
            "name": "Strøget",
            "postalCode": "1050",
            "aliases": [
              "Strøget",
              "Copenhagen Strøget"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Djibouti",
    "code": "DJ",
    "cities": [
      {
        "name": "Djibouti City",
        "places": [
          {
            "name": "Lake Assal",
            "postalCode": "00000",
            "aliases": [
              "Lake Assal",
              "Djibouti City Lake Assal"
            ]
          },
          {
            "name": "Plaza Menelik",
            "postalCode": "00000",
            "aliases": [
              "Plaza Menelik",
              "Djibouti City Plaza Menelik"
            ]
          },
          {
            "name": "Day Forest",
            "postalCode": "00000",
            "aliases": [
              "Day Forest",
              "Djibouti City Day Forest"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Dominica",
    "code": "DM",
    "cities": [
      {
        "name": "Roseau",
        "places": [
          {
            "name": "Morne Trois Pitons",
            "postalCode": "00000",
            "aliases": [
              "Morne Trois Pitons",
              "Roseau Morne Trois Pitons"
            ]
          },
          {
            "name": "Boiling Lake",
            "postalCode": "00000",
            "aliases": [
              "Boiling Lake",
              "Roseau Boiling Lake"
            ]
          },
          {
            "name": "Trafalgar Falls",
            "postalCode": "00000",
            "aliases": [
              "Trafalgar Falls",
              "Roseau Trafalgar Falls"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Dominican Republic",
    "code": "DO",
    "cities": [
      {
        "name": "Santo Domingo",
        "places": [
          {
            "name": "Punta Cana Bavaro Beach",
            "postalCode": "10210",
            "aliases": [
              "Punta Cana Bavaro Beach",
              "Santo Domingo Punta Cana Bavaro Beach"
            ]
          },
          {
            "name": "Zona Colonial",
            "postalCode": "10210",
            "aliases": [
              "Zona Colonial",
              "Santo Domingo Zona Colonial"
            ]
          },
          {
            "name": "Puerto Plata",
            "postalCode": "10210",
            "aliases": [
              "Puerto Plata",
              "Santo Domingo Puerto Plata"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Ecuador",
    "code": "EC",
    "cities": [
      {
        "name": "Quito",
        "places": [
          {
            "name": "Galapagos Islands",
            "postalCode": "170150",
            "aliases": [
              "Galapagos Islands",
              "Quito Galapagos Islands"
            ]
          },
          {
            "name": "Quito Old Town",
            "postalCode": "170150",
            "aliases": [
              "Quito Old Town",
              "Quito Quito Old Town"
            ]
          },
          {
            "name": "Mitad del Mundo (Equator)",
            "postalCode": "170150",
            "aliases": [
              "Mitad del Mundo (Equator)",
              "Quito Mitad del Mundo (Equator)"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Egypt",
    "code": "EG",
    "cities": [
      {
        "name": "Cairo & Giza",
        "aliases": [
          "Greater Cairo"
        ],
        "places": [
          {
            "name": "Pyramids of Giza & Sphinx",
            "postalCode": "12561",
            "aliases": [
              "Great Pyramid of Khufu",
              "Giza Plateau"
            ]
          },
          {
            "name": "Tahrir & Downtown Cairo",
            "postalCode": "11511",
            "aliases": [
              "Egyptian Museum",
              "Khan el-Khalili Bazaar"
            ]
          }
        ]
      },
      {
        "name": "Luxor",
        "aliases": [
          "Thebes"
        ],
        "places": [
          {
            "name": "Valley of the Kings & Karnak",
            "postalCode": "85951",
            "aliases": [
              "Karnak Temple",
              "Luxor Temple",
              "Hatshepsut Temple"
            ]
          }
        ]
      },
      {
        "name": "Sharm El Sheikh",
        "aliases": [
          "Red Sea Resort"
        ],
        "places": [
          {
            "name": "Naama Bay",
            "postalCode": "46619",
            "aliases": [
              "Ras Mohammed National Park",
              "Coral Diving"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "El Salvador",
    "code": "SV",
    "cities": [
      {
        "name": "San Salvador",
        "places": [
          {
            "name": "El Tunco Surf Beach",
            "postalCode": "01101",
            "aliases": [
              "El Tunco Surf Beach",
              "San Salvador El Tunco Surf Beach"
            ]
          },
          {
            "name": "Santa Ana Volcano",
            "postalCode": "01101",
            "aliases": [
              "Santa Ana Volcano",
              "San Salvador Santa Ana Volcano"
            ]
          },
          {
            "name": "Ruta de las Flores",
            "postalCode": "01101",
            "aliases": [
              "Ruta de las Flores",
              "San Salvador Ruta de las Flores"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Equatorial Guinea",
    "code": "GQ",
    "cities": [
      {
        "name": "Malabo",
        "places": [
          {
            "name": "Malabo Port Promenade",
            "postalCode": "00000",
            "aliases": [
              "Malabo Port Promenade",
              "Malabo Malabo Port Promenade"
            ]
          },
          {
            "name": "Santa Isabel Cathedral",
            "postalCode": "00000",
            "aliases": [
              "Santa Isabel Cathedral",
              "Malabo Santa Isabel Cathedral"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Eritrea",
    "code": "ER",
    "cities": [
      {
        "name": "Asmara",
        "places": [
          {
            "name": "Harnet Avenue",
            "postalCode": "00000",
            "aliases": [
              "Harnet Avenue",
              "Asmara Harnet Avenue"
            ]
          },
          {
            "name": "Futurist Cinema Impero",
            "postalCode": "00000",
            "aliases": [
              "Futurist Cinema Impero",
              "Asmara Futurist Cinema Impero"
            ]
          },
          {
            "name": "Massawa Port",
            "postalCode": "00000",
            "aliases": [
              "Massawa Port",
              "Asmara Massawa Port"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Estonia",
    "code": "EE",
    "cities": [
      {
        "name": "Tallinn",
        "places": [
          {
            "name": "Tallinn Medieval Old Town",
            "postalCode": "10123",
            "aliases": [
              "Tallinn Medieval Old Town",
              "Tallinn Tallinn Medieval Old Town"
            ]
          },
          {
            "name": "Toompea Castle",
            "postalCode": "10123",
            "aliases": [
              "Toompea Castle",
              "Tallinn Toompea Castle"
            ]
          },
          {
            "name": "Kalamaja",
            "postalCode": "10123",
            "aliases": [
              "Kalamaja",
              "Tallinn Kalamaja"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Eswatini",
    "code": "SZ",
    "cities": [
      {
        "name": "Mbabane",
        "places": [
          {
            "name": "Ezulwini Valley",
            "postalCode": "H100",
            "aliases": [
              "Ezulwini Valley",
              "Mbabane Ezulwini Valley"
            ]
          },
          {
            "name": "Mlilwane Wildlife Sanctuary",
            "postalCode": "H100",
            "aliases": [
              "Mlilwane Wildlife Sanctuary",
              "Mbabane Mlilwane Wildlife Sanctuary"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Ethiopia",
    "code": "ET",
    "cities": [
      {
        "name": "Addis Ababa",
        "places": [
          {
            "name": "Meskel Square",
            "postalCode": "1000",
            "aliases": [
              "Meskel Square",
              "Addis Ababa Meskel Square"
            ]
          },
          {
            "name": "Lalibela Rock Churches",
            "postalCode": "1000",
            "aliases": [
              "Lalibela Rock Churches",
              "Addis Ababa Lalibela Rock Churches"
            ]
          },
          {
            "name": "Simien Mountains",
            "postalCode": "1000",
            "aliases": [
              "Simien Mountains",
              "Addis Ababa Simien Mountains"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Fiji",
    "code": "FJ",
    "cities": [
      {
        "name": "Suva",
        "places": [
          {
            "name": "Nadi Denarau Island",
            "postalCode": "00000",
            "aliases": [
              "Nadi Denarau Island",
              "Suva Nadi Denarau Island"
            ]
          },
          {
            "name": "Coral Coast",
            "postalCode": "00000",
            "aliases": [
              "Coral Coast",
              "Suva Coral Coast"
            ]
          },
          {
            "name": "Mamanuca Islands",
            "postalCode": "00000",
            "aliases": [
              "Mamanuca Islands",
              "Suva Mamanuca Islands"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Finland",
    "code": "FI",
    "cities": [
      {
        "name": "Helsinki",
        "places": [
          {
            "name": "Senate Square & Cathedral",
            "postalCode": "00100",
            "aliases": [
              "Senate Square & Cathedral",
              "Helsinki Senate Square & Cathedral"
            ]
          },
          {
            "name": "Suomenlinna Sea Fortress",
            "postalCode": "00100",
            "aliases": [
              "Suomenlinna Sea Fortress",
              "Helsinki Suomenlinna Sea Fortress"
            ]
          },
          {
            "name": "Rovaniemi Santa Village",
            "postalCode": "00100",
            "aliases": [
              "Rovaniemi Santa Village",
              "Helsinki Rovaniemi Santa Village"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "France",
    "code": "FR",
    "cities": [
      {
        "name": "Paris",
        "aliases": [
          "City of Light"
        ],
        "places": [
          {
            "name": "Louvre & Palais-Royal (1st Arr.)",
            "postalCode": "75001",
            "aliases": [
              "Louvre Museum",
              "Jardin des Tuileries"
            ]
          },
          {
            "name": "Le Marais (4th Arr.)",
            "postalCode": "75004",
            "aliases": [
              "Notre-Dame de Paris",
              "Place des Vosges",
              "Île Saint-Louis"
            ]
          },
          {
            "name": "Latin Quarter (5th Arr.)",
            "postalCode": "75005",
            "aliases": [
              "Panthéon",
              "Sorbonne",
              "Boulevard Saint-Michel"
            ]
          },
          {
            "name": "Saint-Germain-des-Prés (6th Arr.)",
            "postalCode": "75006",
            "aliases": [
              "Café de Flore",
              "Jardin du Luxembourg"
            ]
          },
          {
            "name": "Eiffel Tower & Champ de Mars (7th Arr.)",
            "postalCode": "75007",
            "aliases": [
              "Tour Eiffel",
              "Musée d Orsay",
              "Invalides"
            ]
          },
          {
            "name": "Champs-Élysées (8th Arr.)",
            "postalCode": "75008",
            "aliases": [
              "Arc de Triomphe",
              "Place de la Concorde"
            ]
          },
          {
            "name": "Montmartre (18th Arr.)",
            "postalCode": "75018",
            "aliases": [
              "Sacré-Cœur",
              "Place du Tertre",
              "Moulin Rouge"
            ]
          }
        ]
      },
      {
        "name": "Nice",
        "aliases": [
          "French Riviera",
          "Cote d Azur"
        ],
        "places": [
          {
            "name": "Promenade des Anglais & Old Town (Vieux Nice)",
            "postalCode": "06300",
            "aliases": [
              "Castle Hill",
              "Cours Saleya Flower Market",
              "Nice Port"
            ]
          }
        ]
      },
      {
        "name": "Cannes",
        "aliases": [
          "Riviera"
        ],
        "places": [
          {
            "name": "La Croisette & Palais des Festivals",
            "postalCode": "06400",
            "aliases": [
              "Le Suquet Old Town",
              "Cannes Beach"
            ]
          }
        ]
      },
      {
        "name": "Lyon",
        "aliases": [
          "Gastronomy Capital"
        ],
        "places": [
          {
            "name": "Vieux Lyon & Presqu’île",
            "postalCode": "69002",
            "aliases": [
              "Fourvière Basilica",
              "Place Bellecour",
              "Traboules"
            ]
          }
        ]
      },
      {
        "name": "Marseille",
        "aliases": [
          "Provence"
        ],
        "places": [
          {
            "name": "Vieux Port & Le Panier",
            "postalCode": "13002",
            "aliases": [
              "Old Port",
              "Notre-Dame de la Garde",
              "MuCEM"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "French Polynesia",
    "code": "PF",
    "cities": [
      {
        "name": "Papeete",
        "places": [
          {
            "name": "Bora Bora Matira Beach",
            "postalCode": "98714",
            "aliases": [
              "Bora Bora Matira Beach",
              "Papeete Bora Bora Matira Beach"
            ]
          },
          {
            "name": "Moorea Lagoon",
            "postalCode": "98714",
            "aliases": [
              "Moorea Lagoon",
              "Papeete Moorea Lagoon"
            ]
          },
          {
            "name": "Papeete Market",
            "postalCode": "98714",
            "aliases": [
              "Papeete Market",
              "Papeete Papeete Market"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Gabon",
    "code": "GA",
    "cities": [
      {
        "name": "Libreville",
        "places": [
          {
            "name": "Boulevard Triomphal",
            "postalCode": "00000",
            "aliases": [
              "Boulevard Triomphal",
              "Libreville Boulevard Triomphal"
            ]
          },
          {
            "name": "Pongara National Park",
            "postalCode": "00000",
            "aliases": [
              "Pongara National Park",
              "Libreville Pongara National Park"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Gambia",
    "code": "GM",
    "cities": [
      {
        "name": "Banjul",
        "places": [
          {
            "name": "Senegambia Strip",
            "postalCode": "00000",
            "aliases": [
              "Senegambia Strip",
              "Banjul Senegambia Strip"
            ]
          },
          {
            "name": "Kotu Beach",
            "postalCode": "00000",
            "aliases": [
              "Kotu Beach",
              "Banjul Kotu Beach"
            ]
          },
          {
            "name": "Arch 22",
            "postalCode": "00000",
            "aliases": [
              "Arch 22",
              "Banjul Arch 22"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Georgia",
    "code": "GE",
    "cities": [
      {
        "name": "Tbilisi",
        "places": [
          {
            "name": "Old Tbilisi Sulphur Baths",
            "postalCode": "0105",
            "aliases": [
              "Old Tbilisi Sulphur Baths",
              "Tbilisi Old Tbilisi Sulphur Baths"
            ]
          },
          {
            "name": "Narikala Fortress",
            "postalCode": "0105",
            "aliases": [
              "Narikala Fortress",
              "Tbilisi Narikala Fortress"
            ]
          },
          {
            "name": "Kazbegi Mountain Church",
            "postalCode": "0105",
            "aliases": [
              "Kazbegi Mountain Church",
              "Tbilisi Kazbegi Mountain Church"
            ]
          },
          {
            "name": "Batumi Boulevard",
            "postalCode": "0105",
            "aliases": [
              "Batumi Boulevard",
              "Tbilisi Batumi Boulevard"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Germany",
    "code": "DE",
    "cities": [
      {
        "name": "Berlin",
        "aliases": [
          "Capital of Germany"
        ],
        "places": [
          {
            "name": "Mitte & Brandenburg Gate",
            "postalCode": "10117",
            "aliases": [
              "Reichstag",
              "Museum Island",
              "Unter den Linden",
              "Alexanderplatz"
            ]
          },
          {
            "name": "Friedrichshain & Kreuzberg",
            "postalCode": "10243",
            "aliases": [
              "East Side Gallery",
              "Berlin Wall",
              "Wrangelkiez"
            ]
          }
        ]
      },
      {
        "name": "Munich",
        "aliases": [
          "München",
          "Bavaria"
        ],
        "places": [
          {
            "name": "Marienplatz & Altstadt",
            "postalCode": "80331",
            "aliases": [
              "Neues Rathaus",
              "Frauenkirche",
              "Viktualienmarkt"
            ]
          },
          {
            "name": "English Garden (Englischer Garten)",
            "postalCode": "80538",
            "aliases": [
              "Eisbach Wave",
              "Beer Gardens"
            ]
          }
        ]
      },
      {
        "name": "Frankfurt",
        "aliases": [
          "Frankfurt am Main"
        ],
        "places": [
          {
            "name": "Römerberg & Altstadt",
            "postalCode": "60311",
            "aliases": [
              "Main Tower",
              "Museum Embankment"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Ghana",
    "code": "GH",
    "cities": [
      {
        "name": "Accra",
        "places": [
          {
            "name": "Osu Oxford Street",
            "postalCode": "00233",
            "aliases": [
              "Osu Oxford Street",
              "Accra Osu Oxford Street"
            ]
          },
          {
            "name": "Labadi Beach",
            "postalCode": "00233",
            "aliases": [
              "Labadi Beach",
              "Accra Labadi Beach"
            ]
          },
          {
            "name": "Cape Coast Castle",
            "postalCode": "00233",
            "aliases": [
              "Cape Coast Castle",
              "Accra Cape Coast Castle"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Greece",
    "code": "GR",
    "cities": [
      {
        "name": "Athens",
        "aliases": [
          "Attica"
        ],
        "places": [
          {
            "name": "Acropolis & Plaka",
            "postalCode": "105 58",
            "aliases": [
              "Parthenon",
              "Acropolis Museum",
              "Monastiraki Flea Market"
            ]
          },
          {
            "name": "Syntagma & Kolonaki",
            "postalCode": "106 71",
            "aliases": [
              "Hellenic Parliament",
              "Mount Lycabettus"
            ]
          }
        ]
      },
      {
        "name": "Santorini",
        "aliases": [
          "Thira",
          "Cyclades"
        ],
        "places": [
          {
            "name": "Oia Village",
            "postalCode": "847 02",
            "aliases": [
              "Blue Domed Churches",
              "Sunset Castle Viewpoint",
              "Amoudi Bay"
            ]
          },
          {
            "name": "Fira & Imerovigli",
            "postalCode": "847 00",
            "aliases": [
              "Caldera Walkway",
              "Fira Central Square"
            ]
          }
        ]
      },
      {
        "name": "Mykonos",
        "aliases": [
          "Cyclades"
        ],
        "places": [
          {
            "name": "Mykonos Town (Chora)",
            "postalCode": "846 00",
            "aliases": [
              "Little Venice",
              "Windmills of Kato Mili",
              "Matoyianni Street"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Greenland",
    "code": "GL",
    "cities": [
      {
        "name": "Nuuk",
        "places": [
          {
            "name": "Ilulissat Icefjord",
            "postalCode": "3900",
            "aliases": [
              "Ilulissat Icefjord",
              "Nuuk Ilulissat Icefjord"
            ]
          },
          {
            "name": "Old Nuuk Harbor",
            "postalCode": "3900",
            "aliases": [
              "Old Nuuk Harbor",
              "Nuuk Old Nuuk Harbor"
            ]
          },
          {
            "name": "National Museum",
            "postalCode": "3900",
            "aliases": [
              "National Museum",
              "Nuuk National Museum"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Grenada",
    "code": "GD",
    "cities": [
      {
        "name": "St. George's",
        "places": [
          {
            "name": "Grand Anse Beach",
            "postalCode": "00000",
            "aliases": [
              "Grand Anse Beach",
              "St. George's Grand Anse Beach"
            ]
          },
          {
            "name": "Carenage Waterfront",
            "postalCode": "00000",
            "aliases": [
              "Carenage Waterfront",
              "St. George's Carenage Waterfront"
            ]
          },
          {
            "name": "Underwater Sculpture Park",
            "postalCode": "00000",
            "aliases": [
              "Underwater Sculpture Park",
              "St. George's Underwater Sculpture Park"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Guatemala",
    "code": "GT",
    "cities": [
      {
        "name": "Guatemala City",
        "places": [
          {
            "name": "Antigua Guatemala Cobblestones",
            "postalCode": "01001",
            "aliases": [
              "Antigua Guatemala Cobblestones",
              "Guatemala City Antigua Guatemala Cobblestones"
            ]
          },
          {
            "name": "Lake Atitlan",
            "postalCode": "01001",
            "aliases": [
              "Lake Atitlan",
              "Guatemala City Lake Atitlan"
            ]
          },
          {
            "name": "Tikal Maya Ruins",
            "postalCode": "01001",
            "aliases": [
              "Tikal Maya Ruins",
              "Guatemala City Tikal Maya Ruins"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Guinea",
    "code": "GN",
    "cities": [
      {
        "name": "Conakry",
        "places": [
          {
            "name": "Grand Mosque of Conakry",
            "postalCode": "00000",
            "aliases": [
              "Grand Mosque of Conakry",
              "Conakry Grand Mosque of Conakry"
            ]
          },
          {
            "name": "Îles de Los",
            "postalCode": "00000",
            "aliases": [
              "Îles de Los",
              "Conakry Îles de Los"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Guinea-Bissau",
    "code": "GW",
    "cities": [
      {
        "name": "Bissau",
        "places": [
          {
            "name": "Bissau Velho",
            "postalCode": "1000",
            "aliases": [
              "Bissau Velho",
              "Bissau Bissau Velho"
            ]
          },
          {
            "name": "Bijagós Archipelago",
            "postalCode": "1000",
            "aliases": [
              "Bijagós Archipelago",
              "Bissau Bijagós Archipelago"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Guyana",
    "code": "GY",
    "cities": [
      {
        "name": "Georgetown",
        "places": [
          {
            "name": "St. George Cathedral",
            "postalCode": "00000",
            "aliases": [
              "St. George Cathedral",
              "Georgetown St. George Cathedral"
            ]
          },
          {
            "name": "Kaieteur Falls",
            "postalCode": "00000",
            "aliases": [
              "Kaieteur Falls",
              "Georgetown Kaieteur Falls"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Haiti",
    "code": "HT",
    "cities": [
      {
        "name": "Port-au-Prince",
        "places": [
          {
            "name": "Citadelle Laferrière",
            "postalCode": "HT6110",
            "aliases": [
              "Citadelle Laferrière",
              "Port-au-Prince Citadelle Laferrière"
            ]
          },
          {
            "name": "Jacmel Beach",
            "postalCode": "HT6110",
            "aliases": [
              "Jacmel Beach",
              "Port-au-Prince Jacmel Beach"
            ]
          },
          {
            "name": "Pétion-Ville",
            "postalCode": "HT6110",
            "aliases": [
              "Pétion-Ville",
              "Port-au-Prince Pétion-Ville"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Honduras",
    "code": "HN",
    "cities": [
      {
        "name": "Tegucigalpa",
        "places": [
          {
            "name": "Roatan West Bay Beach",
            "postalCode": "11101",
            "aliases": [
              "Roatan West Bay Beach",
              "Tegucigalpa Roatan West Bay Beach"
            ]
          },
          {
            "name": "Copan Maya Ruins",
            "postalCode": "11101",
            "aliases": [
              "Copan Maya Ruins",
              "Tegucigalpa Copan Maya Ruins"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Hong Kong",
    "code": "HK",
    "cities": [
      {
        "name": "Hong Kong",
        "places": [
          {
            "name": "Victoria Peak",
            "postalCode": "999077",
            "aliases": [
              "Victoria Peak",
              "Hong Kong Victoria Peak"
            ]
          },
          {
            "name": "Tsim Sha Tsui Promenade",
            "postalCode": "999077",
            "aliases": [
              "Tsim Sha Tsui Promenade",
              "Hong Kong Tsim Sha Tsui Promenade"
            ]
          },
          {
            "name": "Central",
            "postalCode": "999077",
            "aliases": [
              "Central",
              "Hong Kong Central"
            ]
          },
          {
            "name": "Mong Kok",
            "postalCode": "999077",
            "aliases": [
              "Mong Kok",
              "Hong Kong Mong Kok"
            ]
          },
          {
            "name": "Lantau Big Buddha",
            "postalCode": "999077",
            "aliases": [
              "Lantau Big Buddha",
              "Hong Kong Lantau Big Buddha"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Hungary",
    "code": "HU",
    "cities": [
      {
        "name": "Budapest",
        "places": [
          {
            "name": "Buda Castle",
            "postalCode": "1014",
            "aliases": [
              "Buda Castle",
              "Budapest Buda Castle"
            ]
          },
          {
            "name": "Fisherman’s Bastion",
            "postalCode": "1014",
            "aliases": [
              "Fisherman’s Bastion",
              "Budapest Fisherman’s Bastion"
            ]
          },
          {
            "name": "Parliament Building",
            "postalCode": "1014",
            "aliases": [
              "Parliament Building",
              "Budapest Parliament Building"
            ]
          },
          {
            "name": "Széchenyi Thermal Bath",
            "postalCode": "1014",
            "aliases": [
              "Széchenyi Thermal Bath",
              "Budapest Széchenyi Thermal Bath"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Iceland",
    "code": "IS",
    "cities": [
      {
        "name": "Reykjavik",
        "places": [
          {
            "name": "Hallgrimskirkja",
            "postalCode": "101",
            "aliases": [
              "Hallgrimskirkja",
              "Reykjavik Hallgrimskirkja"
            ]
          },
          {
            "name": "Blue Lagoon",
            "postalCode": "101",
            "aliases": [
              "Blue Lagoon",
              "Reykjavik Blue Lagoon"
            ]
          },
          {
            "name": "Golden Circle",
            "postalCode": "101",
            "aliases": [
              "Golden Circle",
              "Reykjavik Golden Circle"
            ]
          },
          {
            "name": "Vik Black Sand Beach",
            "postalCode": "101",
            "aliases": [
              "Vik Black Sand Beach",
              "Reykjavik Vik Black Sand Beach"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "India",
    "code": "IN",
    "cities": [
      {
        "name": "Kochi",
        "aliases": [
          "Cochin",
          "Ernakulam"
        ],
        "places": [
          {
            "name": "Fort Kochi",
            "postalCode": "682001",
            "aliases": [
              "Fort Cochin",
              "Vasco Square",
              "Princess Street",
              "Parade Ground"
            ]
          },
          {
            "name": "Mattancherry",
            "postalCode": "682002",
            "aliases": [
              "Jew Town",
              "Synagogue Lane",
              "Dutch Palace"
            ]
          },
          {
            "name": "Willingdon Island",
            "postalCode": "682003",
            "aliases": [
              "Port Trust",
              "Embarkation Jetty"
            ]
          },
          {
            "name": "Ernakulam South",
            "postalCode": "682004",
            "aliases": [
              "Gandhi Nagar",
              "South Railway Station"
            ]
          },
          {
            "name": "Thoppumpady",
            "postalCode": "682005",
            "aliases": [
              "Aroor Link",
              "Kochangadi"
            ]
          },
          {
            "name": "Kumbalangi",
            "postalCode": "682007",
            "aliases": [
              "Kumbalangi Tourism Village",
              "Backwaters"
            ]
          },
          {
            "name": "Thevara",
            "postalCode": "682013",
            "aliases": [
              "SH College",
              "Waterfront"
            ]
          },
          {
            "name": "Ernakulam North",
            "postalCode": "682017",
            "aliases": [
              "Kaloor",
              "JLN Stadium",
              "Banerji Road"
            ]
          },
          {
            "name": "Kadavanthra",
            "postalCode": "682020",
            "aliases": [
              "Kadavanthra Junction",
              "Elamkulam"
            ]
          },
          {
            "name": "Edappally",
            "postalCode": "682024",
            "aliases": [
              "Lulu Mall",
              "Edappally Toll",
              "Amrita"
            ]
          },
          {
            "name": "Palarivattom",
            "postalCode": "682025",
            "aliases": [
              "Palarivattom Bypass",
              "Pipeline Junction"
            ]
          },
          {
            "name": "Kakkanad",
            "postalCode": "682030",
            "aliases": [
              "InfoPark",
              "SmartCity",
              "Collectorate"
            ]
          },
          {
            "name": "Marine Drive",
            "postalCode": "682031",
            "aliases": [
              "Broadway",
              "Shanmugham Road",
              "Menaka",
              "Rainbow Bridge"
            ]
          },
          {
            "name": "Panampilly Nagar",
            "postalCode": "682036",
            "aliases": [
              "Boutique Street",
              "Central Avenue"
            ]
          },
          {
            "name": "Cherai Beach",
            "postalCode": "683514",
            "aliases": [
              "Cherai",
              "Vypin Island",
              "Munambam",
              "Pallippuram"
            ]
          },
          {
            "name": "Aluva",
            "postalCode": "683101",
            "aliases": [
              "Aluva Palace",
              "Periyar Riverfront"
            ]
          },
          {
            "name": "Maradu",
            "postalCode": "682304",
            "aliases": [
              "Kundannoor",
              "Lakeside Resorts"
            ]
          },
          {
            "name": "Tripunithura",
            "postalCode": "682301",
            "aliases": [
              "Hill Palace",
              "Statue Junction"
            ]
          }
        ]
      },
      {
        "name": "Munnar",
        "aliases": [
          "Idukki"
        ],
        "places": [
          {
            "name": "Old Munnar",
            "postalCode": "685612",
            "aliases": [
              "Munnar Town",
              "Tea Museum",
              "Headworks Dam"
            ]
          },
          {
            "name": "Devikulam",
            "postalCode": "685613",
            "aliases": [
              "Sita Devi Lake",
              "Tea Hills"
            ]
          },
          {
            "name": "Top Station",
            "postalCode": "685615",
            "aliases": [
              "Echo Point",
              "Kundala Lake"
            ]
          },
          {
            "name": "Mattupetty",
            "postalCode": "685616",
            "aliases": [
              "Mattupetty Dam",
              "Boating Hub"
            ]
          },
          {
            "name": "Marayoor",
            "postalCode": "685620",
            "aliases": [
              "Sandalwood Forest",
              "Chinnar Sanctuary",
              "Dolmens"
            ]
          },
          {
            "name": "Chithirapuram",
            "postalCode": "685565",
            "aliases": [
              "Pallivasal",
              "Old Powerhouse"
            ]
          }
        ]
      },
      {
        "name": "Wayanad",
        "aliases": [
          "Kalpetta"
        ],
        "places": [
          {
            "name": "Kalpetta",
            "postalCode": "673121",
            "aliases": [
              "Kalpetta Bypass",
              "District HQ"
            ]
          },
          {
            "name": "Vythiri",
            "postalCode": "673576",
            "aliases": [
              "Lakkidi Viewpoint",
              "Pookode Lake",
              "Chain Tree"
            ]
          },
          {
            "name": "Meppadi",
            "postalCode": "673577",
            "aliases": [
              "Chembra Peak",
              "Heart Lake",
              "Soochipara Waterfalls"
            ]
          },
          {
            "name": "Sulthan Bathery",
            "postalCode": "673592",
            "aliases": [
              "Jain Temple",
              "Heritage Town"
            ]
          },
          {
            "name": "Mananthavady",
            "postalCode": "673645",
            "aliases": [
              "Thirunelly Temple",
              "Kuruvadweep Island",
              "Pazhassi Tomb"
            ]
          }
        ]
      },
      {
        "name": "Alappuzha",
        "aliases": [
          "Alleppey"
        ],
        "places": [
          {
            "name": "Alleppey Beach",
            "postalCode": "688012",
            "aliases": [
              "Old Pier",
              "Lighthouse Area"
            ]
          },
          {
            "name": "Punnamada",
            "postalCode": "688006",
            "aliases": [
              "Nehru Trophy Finishing Point",
              "Houseboat Jetty"
            ]
          },
          {
            "name": "Mararikulam",
            "postalCode": "688523",
            "aliases": [
              "Marari Beach",
              "Fishing Village Resorts"
            ]
          },
          {
            "name": "Kuttanad",
            "postalCode": "688504",
            "aliases": [
              "Rice Bowl of Kerala",
              "Backwater Paddy Fields"
            ]
          },
          {
            "name": "Champakkulam",
            "postalCode": "688505",
            "aliases": [
              "St Mary Forane Church",
              "Snake Boat Hub"
            ]
          }
        ]
      },
      {
        "name": "Varkala",
        "aliases": [
          "Papanasam"
        ],
        "places": [
          {
            "name": "North Cliff",
            "postalCode": "695141",
            "aliases": [
              "Varkala Beach",
              "Papanasam Beach",
              "Cliff Walkway"
            ]
          },
          {
            "name": "South Cliff",
            "postalCode": "695141",
            "aliases": [
              "Janardhana Swami Temple",
              "South Beach"
            ]
          },
          {
            "name": "Edava",
            "postalCode": "695311",
            "aliases": [
              "Odayam Beach",
              "Edava Lake"
            ]
          },
          {
            "name": "Kappil",
            "postalCode": "695302",
            "aliases": [
              "Kappil Beach & Estuary"
            ]
          }
        ]
      },
      {
        "name": "Thiruvananthapuram",
        "aliases": [
          "Trivandrum"
        ],
        "places": [
          {
            "name": "Kovalam Beach",
            "postalCode": "695527",
            "aliases": [
              "Lighthouse Beach",
              "Hawa Beach",
              "Samudra Beach"
            ]
          },
          {
            "name": "East Fort",
            "postalCode": "695023",
            "aliases": [
              "Padmanabhaswamy Temple",
              "Chalai Market"
            ]
          },
          {
            "name": "Poovar Island",
            "postalCode": "695525",
            "aliases": [
              "Poovar Estuary",
              "Golden Sand Beach",
              "Backwater Resorts"
            ]
          },
          {
            "name": "Palayam",
            "postalCode": "695034",
            "aliases": [
              "Museum",
              "Zoo",
              "University Area"
            ]
          },
          {
            "name": "Technopark",
            "postalCode": "695581",
            "aliases": [
              "Kazhakkoottam",
              "IT Corridor"
            ]
          }
        ]
      },
      {
        "name": "Goa",
        "aliases": [
          "Goa Beaches",
          "North Goa",
          "South Goa"
        ],
        "places": [
          {
            "name": "Panaji",
            "postalCode": "403001",
            "aliases": [
              "Fontainhas Latin Quarter",
              "Miramar Beach",
              "Mandovi Riverfront"
            ]
          },
          {
            "name": "Old Goa",
            "postalCode": "403402",
            "aliases": [
              "Basilica of Bom Jesus",
              "Se Cathedral"
            ]
          },
          {
            "name": "Querim (Keri) Beach",
            "postalCode": "403524",
            "aliases": [
              "Querim (Keri) Beach",
              "Querim (Keri)",
              "North Goa Querim (Keri) Beach",
              "Querim (Keri) Beach Goa"
            ]
          },
          {
            "name": "Arambol Beach",
            "postalCode": "403519",
            "aliases": [
              "Arambol Beach",
              "Arambol",
              "North Goa Arambol Beach",
              "Arambol Beach Goa"
            ]
          },
          {
            "name": "Mandrem Beach",
            "postalCode": "403527",
            "aliases": [
              "Mandrem Beach",
              "Mandrem",
              "North Goa Mandrem Beach",
              "Mandrem Beach Goa"
            ]
          },
          {
            "name": "Ashwem Beach",
            "postalCode": "403527",
            "aliases": [
              "Ashwem Beach",
              "Ashwem",
              "North Goa Ashwem Beach",
              "Ashwem Beach Goa"
            ]
          },
          {
            "name": "Morjim Beach",
            "postalCode": "403512",
            "aliases": [
              "Morjim Beach",
              "Morjim",
              "North Goa Morjim Beach",
              "Morjim Beach Goa"
            ]
          },
          {
            "name": "Vagator Beach",
            "postalCode": "403509",
            "aliases": [
              "Vagator Beach",
              "Vagator",
              "North Goa Vagator Beach",
              "Vagator Beach Goa"
            ]
          },
          {
            "name": "Anjuna Beach",
            "postalCode": "403509",
            "aliases": [
              "Anjuna Beach",
              "Anjuna",
              "North Goa Anjuna Beach",
              "Anjuna Beach Goa"
            ]
          },
          {
            "name": "Baga Beach",
            "postalCode": "403516",
            "aliases": [
              "Baga Beach",
              "Baga",
              "North Goa Baga Beach",
              "Baga Beach Goa"
            ]
          },
          {
            "name": "Calangute Beach",
            "postalCode": "403516",
            "aliases": [
              "Calangute Beach",
              "Calangute",
              "North Goa Calangute Beach",
              "Calangute Beach Goa"
            ]
          },
          {
            "name": "Candolim Beach",
            "postalCode": "403515",
            "aliases": [
              "Candolim Beach",
              "Candolim",
              "North Goa Candolim Beach",
              "Candolim Beach Goa"
            ]
          },
          {
            "name": "Sinquerim Beach",
            "postalCode": "403515",
            "aliases": [
              "Sinquerim Beach",
              "Sinquerim",
              "North Goa Sinquerim Beach",
              "Sinquerim Beach Goa"
            ]
          },
          {
            "name": "Miramar Beach",
            "postalCode": "403001",
            "aliases": [
              "Miramar Beach",
              "Miramar",
              "North Goa Miramar Beach",
              "Miramar Beach Goa"
            ]
          },
          {
            "name": "Dona Paula",
            "postalCode": "403004",
            "aliases": [
              "Dona Paula",
              "Dona Paula",
              "North Goa Dona Paula",
              "Dona Paula Goa"
            ]
          },
          {
            "name": "Bogmalo Beach",
            "postalCode": "403806",
            "aliases": [
              "Bogmalo Beach",
              "Bogmalo",
              "South Goa Bogmalo Beach",
              "Bogmalo Beach Goa"
            ]
          },
          {
            "name": "Arossim Beach",
            "postalCode": "403712",
            "aliases": [
              "Arossim Beach",
              "Arossim",
              "South Goa Arossim Beach",
              "Arossim Beach Goa"
            ]
          },
          {
            "name": "Majorda Beach",
            "postalCode": "403713",
            "aliases": [
              "Majorda Beach",
              "Majorda",
              "South Goa Majorda Beach",
              "Majorda Beach Goa"
            ]
          },
          {
            "name": "Betalbatim Beach",
            "postalCode": "403713",
            "aliases": [
              "Betalbatim Beach",
              "Betalbatim",
              "South Goa Betalbatim Beach",
              "Betalbatim Beach Goa"
            ]
          },
          {
            "name": "Colva Beach",
            "postalCode": "403708",
            "aliases": [
              "Colva Beach",
              "Colva",
              "South Goa Colva Beach",
              "Colva Beach Goa"
            ]
          },
          {
            "name": "Benaulim Beach",
            "postalCode": "403716",
            "aliases": [
              "Benaulim Beach",
              "Benaulim",
              "South Goa Benaulim Beach",
              "Benaulim Beach Goa"
            ]
          },
          {
            "name": "Varca Beach",
            "postalCode": "403721",
            "aliases": [
              "Varca Beach",
              "Varca",
              "South Goa Varca Beach",
              "Varca Beach Goa"
            ]
          },
          {
            "name": "Cavelossim Beach",
            "postalCode": "403731",
            "aliases": [
              "Cavelossim Beach",
              "Cavelossim",
              "South Goa Cavelossim Beach",
              "Cavelossim Beach Goa"
            ]
          },
          {
            "name": "Mobor Beach",
            "postalCode": "403731",
            "aliases": [
              "Mobor Beach",
              "Mobor",
              "South Goa Mobor Beach",
              "Mobor Beach Goa"
            ]
          },
          {
            "name": "Cabo de Rama Beach",
            "postalCode": "403703",
            "aliases": [
              "Cabo de Rama Beach",
              "Cabo de Rama",
              "South Goa Cabo de Rama Beach",
              "Cabo de Rama Beach Goa"
            ]
          },
          {
            "name": "Cola Beach",
            "postalCode": "403702",
            "aliases": [
              "Cola Beach",
              "Cola",
              "South Goa Cola Beach",
              "Cola Beach Goa"
            ]
          },
          {
            "name": "Agonda Beach",
            "postalCode": "403702",
            "aliases": [
              "Agonda Beach",
              "Agonda",
              "South Goa Agonda Beach",
              "Agonda Beach Goa"
            ]
          },
          {
            "name": "Butterfly Beach",
            "postalCode": "403702",
            "aliases": [
              "Butterfly Beach",
              "Butterfly",
              "South Goa Butterfly Beach",
              "Butterfly Beach Goa"
            ]
          },
          {
            "name": "Palolem Beach",
            "postalCode": "403702",
            "aliases": [
              "Palolem Beach",
              "Palolem",
              "South Goa Palolem Beach",
              "Palolem Beach Goa"
            ]
          },
          {
            "name": "Patnem Beach",
            "postalCode": "403702",
            "aliases": [
              "Patnem Beach",
              "Patnem",
              "South Goa Patnem Beach",
              "Patnem Beach Goa"
            ]
          },
          {
            "name": "Galgibaga Beach",
            "postalCode": "403728",
            "aliases": [
              "Galgibaga Beach",
              "Galgibaga",
              "South Goa Galgibaga Beach",
              "Galgibaga Beach Goa"
            ]
          },
          {
            "name": "Basilica of Bom Jesus",
            "postalCode": "403402",
            "aliases": [
              "Bom Jesus",
              "Old Goa",
              "St. Francis Xavier",
              "Basilica"
            ]
          },
          {
            "name": "Sé Catedral de Santa Catarina",
            "postalCode": "403402",
            "aliases": [
              "Se Cathedral",
              "Old Goa",
              "Golden Bell"
            ]
          },
          {
            "name": "Church of Our Lady of the Immaculate Conception",
            "postalCode": "403001",
            "aliases": [
              "Immaculate Conception",
              "Panaji Church",
              "Panjim Church"
            ]
          },
          {
            "name": "Church of St. Francis of Assisi",
            "postalCode": "403402",
            "aliases": [
              "St Francis of Assisi",
              "Old Goa Church"
            ]
          },
          {
            "name": "Church of St. Cajetan",
            "postalCode": "403402",
            "aliases": [
              "St Cajetan",
              "Old Goa St Cajetan"
            ]
          },
          {
            "name": "Mae De Deus Church",
            "postalCode": "403511",
            "aliases": [
              "Mae De Deus",
              "Saligao Church"
            ]
          },
          {
            "name": "Church of Our Lady of the Mount",
            "postalCode": "403402",
            "aliases": [
              "Our Lady of the Mount",
              "Old Goa Mount Chapel"
            ]
          },
          {
            "name": "Church of the Holy Spirit",
            "postalCode": "403601",
            "aliases": [
              "Holy Spirit Margao",
              "Margao Church"
            ]
          },
          {
            "name": "Three Kings Chapel",
            "postalCode": "403712",
            "aliases": [
              "Three Kings",
              "Cansaulim Chapel",
              "Cuelim Hill"
            ]
          },
          {
            "name": "St. Alex Church",
            "postalCode": "403516",
            "aliases": [
              "St Alex",
              "Calangute Church"
            ]
          },
          {
            "name": "Shri Manguesh Temple",
            "postalCode": "403404",
            "aliases": [
              "Manguesh Temple",
              "Mangeshi Temple",
              "Priol Ponda"
            ]
          },
          {
            "name": "Shri Shantadurga Temple",
            "postalCode": "403401",
            "aliases": [
              "Shantadurga Temple",
              "Kavlem Ponda"
            ]
          },
          {
            "name": "Mahadeva Temple",
            "postalCode": "403406",
            "aliases": [
              "Tambdi Surla",
              "Mahadev Temple Tambdi Surla"
            ]
          },
          {
            "name": "Mahalasa Narayani Temple",
            "postalCode": "403404",
            "aliases": [
              "Mahalasa Temple",
              "Mardol Ponda"
            ]
          },
          {
            "name": "Mahalaxmi Temple",
            "postalCode": "403401",
            "aliases": [
              "Mahalaxmi Bandivade",
              "Ponda Mahalaxmi"
            ]
          },
          {
            "name": "Shri Saptakoteshwar Temple",
            "postalCode": "403714",
            "aliases": [
              "Saptakoteshwar",
              "Narve Bicholim"
            ]
          },
          {
            "name": "Shri Ramnath Temple",
            "postalCode": "403401",
            "aliases": [
              "Ramnath Temple",
              "Ramnathi Ponda"
            ]
          },
          {
            "name": "Shri Naguesh Maharudra Temple",
            "postalCode": "403401",
            "aliases": [
              "Naguesh Temple",
              "Bandora Ponda"
            ]
          },
          {
            "name": "Brahma Temple",
            "postalCode": "403506",
            "aliases": [
              "Brahma Temple Goa",
              "Brahma Karmali Sattari"
            ]
          },
          {
            "name": "Shri Damodar Temple",
            "postalCode": "403705",
            "aliases": [
              "Damodar Temple",
              "Zambaulim Sanguem"
            ]
          }
        ]
      },
      {
        "name": "Mumbai",
        "aliases": [
          "Bombay"
        ],
        "places": [
          {
            "name": "Colaba",
            "postalCode": "400005",
            "aliases": [
              "Gateway of India",
              "Taj Mahal Palace",
              "Colaba Causeway"
            ]
          },
          {
            "name": "Marine Lines & Marine Drive",
            "postalCode": "400020",
            "aliases": [
              "Queen Necklace",
              "Nariman Point",
              "Chowpatty"
            ]
          },
          {
            "name": "Bandra West",
            "postalCode": "400050",
            "aliases": [
              "Bandstand",
              "Carter Road",
              "Pali Hill",
              "Mount Mary"
            ]
          },
          {
            "name": "Juhu",
            "postalCode": "400049",
            "aliases": [
              "Juhu Beach",
              "Prithvi Theatre"
            ]
          },
          {
            "name": "Andheri West",
            "postalCode": "400053",
            "aliases": [
              "Lokhandwala Complex",
              "Versova Beach"
            ]
          }
        ]
      },
      {
        "name": "Bengaluru",
        "aliases": [
          "Bangalore"
        ],
        "places": [
          {
            "name": "MG Road & Brigade Road",
            "postalCode": "560001",
            "aliases": [
              "Church Street",
              "Cubbon Park"
            ]
          },
          {
            "name": "Indiranagar",
            "postalCode": "560038",
            "aliases": [
              "100ft Road",
              "12th Main",
              "Cafes"
            ]
          },
          {
            "name": "Koramangala",
            "postalCode": "560034",
            "aliases": [
              "5th Block",
              "Forum Mall",
              "Startups"
            ]
          },
          {
            "name": "Whitefield",
            "postalCode": "560066",
            "aliases": [
              "ITPB",
              "EPIP Zone",
              "VR Mall"
            ]
          }
        ]
      },
      {
        "name": "Delhi",
        "aliases": [
          "New Delhi"
        ],
        "places": [
          {
            "name": "Connaught Place",
            "postalCode": "110001",
            "aliases": [
              "CP Inner Circle",
              "Janpath Market"
            ]
          },
          {
            "name": "Old Delhi / Chandni Chowk",
            "postalCode": "110006",
            "aliases": [
              "Red Fort",
              "Jama Masjid",
              "Paranthe Wali Gali"
            ]
          },
          {
            "name": "Hauz Khas Village",
            "postalCode": "110016",
            "aliases": [
              "HKV Fort",
              "Deer Park",
              "Cafes"
            ]
          },
          {
            "name": "India Gate & South Extension",
            "postalCode": "110049",
            "aliases": [
              "National War Memorial",
              "Kartavya Path"
            ]
          }
        ]
      },
      {
        "name": "Jaipur",
        "aliases": [
          "Pink City"
        ],
        "places": [
          {
            "name": "Pink City Walled Area",
            "postalCode": "302002",
            "aliases": [
              "Hawa Mahal",
              "City Palace",
              "Jantar Mantar",
              "Bapu Bazaar"
            ]
          },
          {
            "name": "Amer",
            "postalCode": "302028",
            "aliases": [
              "Amber Fort",
              "Elephant Village",
              "Jaigarh Fort"
            ]
          },
          {
            "name": "C-Scheme & MI Road",
            "postalCode": "302001",
            "aliases": [
              "Raja Park",
              "Statue Circle"
            ]
          }
        ]
      },
      {
        "name": "Udaipur",
        "aliases": [
          "City of Lakes"
        ],
        "places": [
          {
            "name": "Lake Pichola",
            "postalCode": "313001",
            "aliases": [
              "City Palace Lakefront",
              "Ambrai Ghat",
              "Jag Mandir"
            ]
          },
          {
            "name": "Fateh Sagar",
            "postalCode": "313004",
            "aliases": [
              "Fateh Sagar Lake Promenade",
              "Saheliyon Ki Bari"
            ]
          }
        ]
      },
      {
        "name": "Agra",
        "aliases": [
          "Taj City"
        ],
        "places": [
          {
            "name": "Tajganj",
            "postalCode": "282001",
            "aliases": [
              "Taj Mahal East Gate",
              "Taj Nature Walk"
            ]
          },
          {
            "name": "Agra Fort Area",
            "postalCode": "282003",
            "aliases": [
              "Agra Fort",
              "Kinari Bazaar"
            ]
          }
        ]
      },
      {
        "name": "Varanasi",
        "aliases": [
          "Banaras",
          "Kashi"
        ],
        "places": [
          {
            "name": "Dashashwamedh Ghat",
            "postalCode": "221001",
            "aliases": [
              "Ganga Aarti Ghat",
              "Kashi Vishwanath Corridor"
            ]
          },
          {
            "name": "Assi Ghat",
            "postalCode": "221005",
            "aliases": [
              "Subah-e-Banaras",
              "Tulsi Ghat"
            ]
          }
        ]
      },
      {
        "name": "Manali",
        "aliases": [
          "Kullu Manali"
        ],
        "places": [
          {
            "name": "Old Manali",
            "postalCode": "175131",
            "aliases": [
              "Hadimba Temple",
              "Manu Temple",
              "Old Manali Cafes"
            ]
          },
          {
            "name": "Solang Valley",
            "postalCode": "175103",
            "aliases": [
              "Atal Tunnel Approach",
              "Snow Point"
            ]
          }
        ]
      },
      {
        "name": "Shimla",
        "aliases": [
          "Queen of Hills"
        ],
        "places": [
          {
            "name": "The Mall & Ridge",
            "postalCode": "171001",
            "aliases": [
              "Christ Church",
              "Scandal Point",
              "Lakkar Bazaar"
            ]
          },
          {
            "name": "Kufri",
            "postalCode": "171012",
            "aliases": [
              "Mahasu Peak",
              "Himalayan Nature Park"
            ]
          }
        ]
      },
      {
        "name": "Rishikesh",
        "aliases": [
          "Yoga Capital"
        ],
        "places": [
          {
            "name": "Tapovan",
            "postalCode": "249192",
            "aliases": [
              "Laxman Jhula",
              "Yoga Ashrams",
              "Ganga View"
            ]
          },
          {
            "name": "Ram Jhula & Swarg Ashram",
            "postalCode": "249304",
            "aliases": [
              "Parmarth Niketan",
              "Beatles Ashram"
            ]
          }
        ]
      },
      {
        "name": "Ooty",
        "aliases": [
          "Udhagamandalam",
          "Nilgiris"
        ],
        "places": [
          {
            "name": "Botanical Gardens Area",
            "postalCode": "643001",
            "aliases": [
              "Ooty Lake",
              "Charring Cross"
            ]
          },
          {
            "name": "Doddabetta",
            "postalCode": "643002",
            "aliases": [
              "Doddabetta Peak",
              "Tea Factory"
            ]
          }
        ]
      },
      {
        "name": "Kodaikanal",
        "aliases": [
          "Princess of Hill Stations"
        ],
        "places": [
          {
            "name": "Kodai Lake & Coaker Walk",
            "postalCode": "624101",
            "aliases": [
              "Bryant Park",
              "Pillar Rocks",
              "Dolphin Nose"
            ]
          }
        ]
      },
      {
        "name": "Pondicherry",
        "aliases": [
          "Puducherry"
        ],
        "places": [
          {
            "name": "White Town / French Quarter",
            "postalCode": "605001",
            "aliases": [
              "Promenade Beach",
              "Aurobindo Ashram",
              "Rock Beach"
            ]
          },
          {
            "name": "Auroville",
            "postalCode": "605101",
            "aliases": [
              "Matrimandir",
              "Peace Area"
            ]
          }
        ]
      },
      {
        "name": "Hyderabad",
        "aliases": [
          "City of Pearls"
        ],
        "places": [
          {
            "name": "Charminar & Old City",
            "postalCode": "500002",
            "aliases": [
              "Laad Bazaar",
              "Chowmahalla Palace"
            ]
          },
          {
            "name": "Hitec City / Madhapur",
            "postalCode": "500081",
            "aliases": [
              "Cyber Towers",
              "Inorbit Mall",
              "Jubilee Hills"
            ]
          }
        ]
      },
      {
        "name": "Chennai",
        "aliases": [
          "Madras"
        ],
        "places": [
          {
            "name": "Mylapore",
            "postalCode": "600004",
            "aliases": [
              "Kapaleeshwarar Temple",
              "San Thome Basilica"
            ]
          },
          {
            "name": "Marina Beach & Triplicane",
            "postalCode": "600005",
            "aliases": [
              "Marina Promenade",
              "Lighthouse"
            ]
          }
        ]
      },
      {
        "name": "Kolkata",
        "aliases": [
          "Calcutta"
        ],
        "places": [
          {
            "name": "Park Street",
            "postalCode": "700016",
            "aliases": [
              "Victoria Memorial",
              "St Paul Cathedral"
            ]
          },
          {
            "name": "Howrah",
            "postalCode": "711101",
            "aliases": [
              "Howrah Bridge",
              "Howrah Station"
            ]
          }
        ]
      },
      {
        "name": "Leh Ladakh",
        "aliases": [
          "Ladakh"
        ],
        "places": [
          {
            "name": "Leh Main Bazaar",
            "postalCode": "194101",
            "aliases": [
              "Leh Palace",
              "Shanti Stupa"
            ]
          },
          {
            "name": "Nubra Valley",
            "postalCode": "194120",
            "aliases": [
              "Hunder Sand Dunes",
              "Diskit Monastery"
            ]
          },
          {
            "name": "Pangong Lake",
            "postalCode": "194201",
            "aliases": [
              "Spangmik",
              "Pangong Tso"
            ]
          }
        ]
      },
      {
        "name": "Port Blair",
        "aliases": [
          "Andaman and Nicobar"
        ],
        "places": [
          {
            "name": "Aberdeen Bazaar",
            "postalCode": "744101",
            "aliases": [
              "Cellular Jail",
              "Corbyn Cove"
            ]
          },
          {
            "name": "Havelock Island (Swaraj Dweep)",
            "postalCode": "744211",
            "aliases": [
              "Radhanagar Beach",
              "Elephant Beach"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Indonesia",
    "code": "ID",
    "cities": [
      {
        "name": "Bali",
        "aliases": [
          "Island of the Gods"
        ],
        "places": [
          {
            "name": "Ubud",
            "postalCode": "80571",
            "aliases": [
              "Sacred Monkey Forest",
              "Tegallalang Rice Terrace",
              "Ubud Art Market",
              "Campuhan Ridge Walk"
            ]
          },
          {
            "name": "Seminyak",
            "postalCode": "80361",
            "aliases": [
              "Petitenget Beach",
              "Potato Head Beach Club",
              "Oberoi"
            ]
          },
          {
            "name": "Canggu",
            "postalCode": "80351",
            "aliases": [
              "Echo Beach",
              "Batu Bolong",
              "Finns Beach Club"
            ]
          },
          {
            "name": "Kuta & Legian",
            "postalCode": "80361",
            "aliases": [
              "Kuta Beach",
              "Waterbom Bali",
              "Beachwalk Mall"
            ]
          },
          {
            "name": "Uluwatu & Jimbaran",
            "postalCode": "80364",
            "aliases": [
              "Uluwatu Cliff Temple",
              "Kecak Dance",
              "Jimbaran Seafood"
            ]
          },
          {
            "name": "Nusa Dua",
            "postalCode": "80363",
            "aliases": [
              "Luxury Resorts",
              "Geger Beach",
              "Water Blow"
            ]
          },
          {
            "name": "Sanur",
            "postalCode": "80228",
            "aliases": [
              "Sanur Beach Promenade",
              "Nusa Penida Ferry Harbour"
            ]
          }
        ]
      },
      {
        "name": "Jakarta",
        "aliases": [
          "DKI Jakarta"
        ],
        "places": [
          {
            "name": "Central Jakarta & Monas",
            "postalCode": "10110",
            "aliases": [
              "National Monument",
              "Merdeka Square"
            ]
          },
          {
            "name": "Kuningan & Mega Kuningan",
            "postalCode": "12950",
            "aliases": [
              "Golden Triangle",
              "SCBD"
            ]
          },
          {
            "name": "Kota Tua (Old Batavia)",
            "postalCode": "11110",
            "aliases": [
              "Fatahillah Square",
              "History Museum"
            ]
          }
        ]
      },
      {
        "name": "Yogyakarta",
        "aliases": [
          "Jogja"
        ],
        "places": [
          {
            "name": "Malioboro & Kraton",
            "postalCode": "55271",
            "aliases": [
              "Sultan Palace",
              "Taman Sari Water Castle"
            ]
          },
          {
            "name": "Borobudur & Prambanan Area",
            "postalCode": "55572",
            "aliases": [
              "World Heritage Temples"
            ]
          }
        ]
      },
      {
        "name": "Lombok",
        "aliases": [
          "West Nusa Tenggara"
        ],
        "places": [
          {
            "name": "Kuta Lombok & Mandalika",
            "postalCode": "83573",
            "aliases": [
              "MotoGP Circuit",
              "Tanjung Aan Beach"
            ]
          },
          {
            "name": "Gili Islands (Gili Trawangan)",
            "postalCode": "83352",
            "aliases": [
              "Gili T",
              "Turtle Point"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Iran",
    "code": "IR",
    "cities": [
      {
        "name": "Tehran",
        "places": [
          {
            "name": "Grand Bazaar",
            "postalCode": "11369",
            "aliases": [
              "Grand Bazaar",
              "Tehran Grand Bazaar"
            ]
          },
          {
            "name": "Golestan Palace",
            "postalCode": "11369",
            "aliases": [
              "Golestan Palace",
              "Tehran Golestan Palace"
            ]
          },
          {
            "name": "Isfahan Naqsh-e Jahan",
            "postalCode": "11369",
            "aliases": [
              "Isfahan Naqsh-e Jahan",
              "Tehran Isfahan Naqsh-e Jahan"
            ]
          },
          {
            "name": "Persepolis Shiraz",
            "postalCode": "11369",
            "aliases": [
              "Persepolis Shiraz",
              "Tehran Persepolis Shiraz"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Iraq",
    "code": "IQ",
    "cities": [
      {
        "name": "Baghdad",
        "places": [
          {
            "name": "Al-Mutanabbi Street",
            "postalCode": "10001",
            "aliases": [
              "Al-Mutanabbi Street",
              "Baghdad Al-Mutanabbi Street"
            ]
          },
          {
            "name": "Erbil Citadel",
            "postalCode": "10001",
            "aliases": [
              "Erbil Citadel",
              "Baghdad Erbil Citadel"
            ]
          },
          {
            "name": "Ziggurat of Ur",
            "postalCode": "10001",
            "aliases": [
              "Ziggurat of Ur",
              "Baghdad Ziggurat of Ur"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Ireland",
    "code": "IE",
    "cities": [
      {
        "name": "Dublin",
        "places": [
          {
            "name": "Temple Bar",
            "postalCode": "D02",
            "aliases": [
              "Temple Bar",
              "Dublin Temple Bar"
            ]
          },
          {
            "name": "Trinity College Book of Kells",
            "postalCode": "D02",
            "aliases": [
              "Trinity College Book of Kells",
              "Dublin Trinity College Book of Kells"
            ]
          },
          {
            "name": "Cliffs of Moher",
            "postalCode": "D02",
            "aliases": [
              "Cliffs of Moher",
              "Dublin Cliffs of Moher"
            ]
          },
          {
            "name": "Killarney National Park",
            "postalCode": "D02",
            "aliases": [
              "Killarney National Park",
              "Dublin Killarney National Park"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Israel",
    "code": "IL",
    "cities": [
      {
        "name": "Jerusalem",
        "places": [
          {
            "name": "Old City Western Wall",
            "postalCode": "91000",
            "aliases": [
              "Old City Western Wall",
              "Jerusalem Old City Western Wall"
            ]
          },
          {
            "name": "Church of the Holy Sepulchre",
            "postalCode": "91000",
            "aliases": [
              "Church of the Holy Sepulchre",
              "Jerusalem Church of the Holy Sepulchre"
            ]
          },
          {
            "name": "Tel Aviv Promenade",
            "postalCode": "91000",
            "aliases": [
              "Tel Aviv Promenade",
              "Jerusalem Tel Aviv Promenade"
            ]
          },
          {
            "name": "Dead Sea",
            "postalCode": "91000",
            "aliases": [
              "Dead Sea",
              "Jerusalem Dead Sea"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Italy",
    "code": "IT",
    "cities": [
      {
        "name": "Rome",
        "aliases": [
          "Roma",
          "Eternal City"
        ],
        "places": [
          {
            "name": "Colosseum & Roman Forum",
            "postalCode": "00184",
            "aliases": [
              "Palatine Hill",
              "Monti District"
            ]
          },
          {
            "name": "Historic Centre & Trevi",
            "postalCode": "00186",
            "aliases": [
              "Trevi Fountain",
              "Pantheon",
              "Piazza Navona",
              "Campo de Fiori"
            ]
          },
          {
            "name": "Spanish Steps & Tridente",
            "postalCode": "00187",
            "aliases": [
              "Piazza di Spagna",
              "Villa Borghese",
              "Via Condotti"
            ]
          },
          {
            "name": "Trastevere",
            "postalCode": "00153",
            "aliases": [
              "Piazza Santa Maria",
              "Janiculum Hill"
            ]
          },
          {
            "name": "Vatican Area / Prati",
            "postalCode": "00192",
            "aliases": [
              "St Peter Basilica",
              "Vatican Museums",
              "Castel Sant Angelo"
            ]
          }
        ]
      },
      {
        "name": "Florence",
        "aliases": [
          "Firenze",
          "Tuscany"
        ],
        "places": [
          {
            "name": "Duomo & Historic Centre",
            "postalCode": "50122",
            "aliases": [
              "Piazza del Duomo",
              "Uffizi Gallery",
              "Ponte Vecchio",
              "Piazza della Signoria"
            ]
          },
          {
            "name": "Oltrarno & Piazzale Michelangelo",
            "postalCode": "50125",
            "aliases": [
              "Pitti Palace",
              "Boboli Gardens",
              "Sunset Viewpoint"
            ]
          }
        ]
      },
      {
        "name": "Venice",
        "aliases": [
          "Venezia"
        ],
        "places": [
          {
            "name": "San Marco",
            "postalCode": "30124",
            "aliases": [
              "St Mark Square",
              "Doge Palace",
              "Bridge of Sighs"
            ]
          },
          {
            "name": "Rialto & San Polo",
            "postalCode": "30125",
            "aliases": [
              "Rialto Bridge",
              "Grand Canal Gondolas",
              "Market"
            ]
          }
        ]
      },
      {
        "name": "Milan",
        "aliases": [
          "Milano",
          "Fashion Capital"
        ],
        "places": [
          {
            "name": "Duomo di Milano & Galleria",
            "postalCode": "20121",
            "aliases": [
              "Galleria Vittorio Emanuele",
              "La Scala Opera",
              "Brera"
            ]
          },
          {
            "name": "Navigli & Darsena",
            "postalCode": "20144",
            "aliases": [
              "Canal District",
              "Porta Ticinese"
            ]
          }
        ]
      },
      {
        "name": "Amalfi Coast",
        "aliases": [
          "Positano",
          "Amalfi"
        ],
        "places": [
          {
            "name": "Positano Cliffside",
            "postalCode": "84017",
            "aliases": [
              "Spiaggia Grande",
              "Path of the Gods"
            ]
          },
          {
            "name": "Amalfi Town & Duomo",
            "postalCode": "84011",
            "aliases": [
              "Amalfi Cathedral",
              "Piazza Duomo"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Ivory Coast",
    "code": "CI",
    "cities": [
      {
        "name": "Yamoussoukro",
        "places": [
          {
            "name": "Abidjan Plateau",
            "postalCode": "00000",
            "aliases": [
              "Abidjan Plateau",
              "Yamoussoukro Abidjan Plateau"
            ]
          },
          {
            "name": "Basilica of Our Lady of Peace",
            "postalCode": "00000",
            "aliases": [
              "Basilica of Our Lady of Peace",
              "Yamoussoukro Basilica of Our Lady of Peace"
            ]
          },
          {
            "name": "Grand-Bassam",
            "postalCode": "00000",
            "aliases": [
              "Grand-Bassam",
              "Yamoussoukro Grand-Bassam"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Jamaica",
    "code": "JM",
    "cities": [
      {
        "name": "Kingston",
        "places": [
          {
            "name": "Montego Bay Hip Strip",
            "postalCode": "00000",
            "aliases": [
              "Montego Bay Hip Strip",
              "Kingston Montego Bay Hip Strip"
            ]
          },
          {
            "name": "Negril Seven Mile Beach",
            "postalCode": "00000",
            "aliases": [
              "Negril Seven Mile Beach",
              "Kingston Negril Seven Mile Beach"
            ]
          },
          {
            "name": "Ocho Rios Dunn’s River Falls",
            "postalCode": "00000",
            "aliases": [
              "Ocho Rios Dunn’s River Falls",
              "Kingston Ocho Rios Dunn’s River Falls"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Japan",
    "code": "JP",
    "cities": [
      {
        "name": "Tokyo",
        "aliases": [
          "Greater Tokyo"
        ],
        "places": [
          {
            "name": "Shibuya",
            "postalCode": "150-0002",
            "aliases": [
              "Shibuya Crossing",
              "Hachiko Statue",
              "Shibuya Sky"
            ]
          },
          {
            "name": "Shinjuku",
            "postalCode": "160-0022",
            "aliases": [
              "Kabukicho",
              "Tokyo Metropolitan Gov Building",
              "Omoide Yokocho"
            ]
          },
          {
            "name": "Asakusa & Ueno",
            "postalCode": "111-0032",
            "aliases": [
              "Senso-ji Temple",
              "Nakamise Shopping Street",
              "Ueno Park"
            ]
          },
          {
            "name": "Ginza & Chiyoda",
            "postalCode": "104-0061",
            "aliases": [
              "Imperial Palace",
              "Luxury Boutiques",
              "Tokyo Station"
            ]
          },
          {
            "name": "Akihabara",
            "postalCode": "101-0021",
            "aliases": [
              "Electric Town",
              "Anime & Tech District"
            ]
          }
        ]
      },
      {
        "name": "Kyoto",
        "aliases": [
          "Ancient Capital"
        ],
        "places": [
          {
            "name": "Gion & Higashiyama",
            "postalCode": "605-0073",
            "aliases": [
              "Kiyomizu-dera",
              "Yasaka Shrine",
              "Geisha Quarter"
            ]
          },
          {
            "name": "Arashiyama",
            "postalCode": "616-8385",
            "aliases": [
              "Bamboo Grove",
              "Togetsukyo Bridge",
              "Tenryu-ji"
            ]
          },
          {
            "name": "Fushimi Inari Area",
            "postalCode": "612-0882",
            "aliases": [
              "10000 Torii Gates Shrine"
            ]
          }
        ]
      },
      {
        "name": "Osaka",
        "aliases": [
          "Kansai Kitchen"
        ],
        "places": [
          {
            "name": "Dotonbori & Namba",
            "postalCode": "542-0076",
            "aliases": [
              "Glico Running Man",
              "Street Food (Takoyaki)",
              "Shinsaibashi"
            ]
          },
          {
            "name": "Osaka Castle Area",
            "postalCode": "540-0002",
            "aliases": [
              "Osakajo Park",
              "Castle Museum"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Jordan",
    "code": "JO",
    "cities": [
      {
        "name": "Amman",
        "places": [
          {
            "name": "Petra Treasury",
            "postalCode": "11118",
            "aliases": [
              "Petra Treasury",
              "Amman Petra Treasury"
            ]
          },
          {
            "name": "Wadi Rum Desert",
            "postalCode": "11118",
            "aliases": [
              "Wadi Rum Desert",
              "Amman Wadi Rum Desert"
            ]
          },
          {
            "name": "Amman Citadel",
            "postalCode": "11118",
            "aliases": [
              "Amman Citadel",
              "Amman Amman Citadel"
            ]
          },
          {
            "name": "Dead Sea Resorts",
            "postalCode": "11118",
            "aliases": [
              "Dead Sea Resorts",
              "Amman Dead Sea Resorts"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Kazakhstan",
    "code": "KZ",
    "cities": [
      {
        "name": "Astana",
        "places": [
          {
            "name": "Baiterek Tower",
            "postalCode": "010000",
            "aliases": [
              "Baiterek Tower",
              "Astana Baiterek Tower"
            ]
          },
          {
            "name": "Almaty Medeu & Shymbulak",
            "postalCode": "010000",
            "aliases": [
              "Almaty Medeu & Shymbulak",
              "Astana Almaty Medeu & Shymbulak"
            ]
          },
          {
            "name": "Panfilov Park",
            "postalCode": "010000",
            "aliases": [
              "Panfilov Park",
              "Astana Panfilov Park"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Kenya",
    "code": "KE",
    "cities": [
      {
        "name": "Nairobi",
        "places": [
          {
            "name": "Maasai Mara Game Reserve",
            "postalCode": "00100",
            "aliases": [
              "Maasai Mara Game Reserve",
              "Nairobi Maasai Mara Game Reserve"
            ]
          },
          {
            "name": "Nairobi National Park",
            "postalCode": "00100",
            "aliases": [
              "Nairobi National Park",
              "Nairobi Nairobi National Park"
            ]
          },
          {
            "name": "Diani Beach (Mombasa)",
            "postalCode": "00100",
            "aliases": [
              "Diani Beach (Mombasa)",
              "Nairobi Diani Beach (Mombasa)"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Kiribati",
    "code": "KI",
    "cities": [
      {
        "name": "Tarawa",
        "places": [
          {
            "name": "Betio Island",
            "postalCode": "00000",
            "aliases": [
              "Betio Island",
              "Tarawa Betio Island"
            ]
          },
          {
            "name": "Christmas Island (Kiritimati)",
            "postalCode": "00000",
            "aliases": [
              "Christmas Island (Kiritimati)",
              "Tarawa Christmas Island (Kiritimati)"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Kuwait",
    "code": "KW",
    "cities": [
      {
        "name": "Kuwait City",
        "places": [
          {
            "name": "Kuwait Towers",
            "postalCode": "13001",
            "aliases": [
              "Kuwait Towers",
              "Kuwait City Kuwait Towers"
            ]
          },
          {
            "name": "Souk Al-Mubarakiya",
            "postalCode": "13001",
            "aliases": [
              "Souk Al-Mubarakiya",
              "Kuwait City Souk Al-Mubarakiya"
            ]
          },
          {
            "name": "The Avenues Mall",
            "postalCode": "13001",
            "aliases": [
              "The Avenues Mall",
              "Kuwait City The Avenues Mall"
            ]
          },
          {
            "name": "Salmiya Marina",
            "postalCode": "13001",
            "aliases": [
              "Salmiya Marina",
              "Kuwait City Salmiya Marina"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Kyrgyzstan",
    "code": "KG",
    "cities": [
      {
        "name": "Bishkek",
        "places": [
          {
            "name": "Ala-Too Square",
            "postalCode": "720000",
            "aliases": [
              "Ala-Too Square",
              "Bishkek Ala-Too Square"
            ]
          },
          {
            "name": "Issyk-Kul Lake",
            "postalCode": "720000",
            "aliases": [
              "Issyk-Kul Lake",
              "Bishkek Issyk-Kul Lake"
            ]
          },
          {
            "name": "Osh Bazaar",
            "postalCode": "720000",
            "aliases": [
              "Osh Bazaar",
              "Bishkek Osh Bazaar"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Laos",
    "code": "LA",
    "cities": [
      {
        "name": "Vientiane",
        "places": [
          {
            "name": "Luang Prabang UNESCO Town",
            "postalCode": "01000",
            "aliases": [
              "Luang Prabang UNESCO Town",
              "Vientiane Luang Prabang UNESCO Town"
            ]
          },
          {
            "name": "Patuxai Victory Gate",
            "postalCode": "01000",
            "aliases": [
              "Patuxai Victory Gate",
              "Vientiane Patuxai Victory Gate"
            ]
          },
          {
            "name": "Kuang Si Falls",
            "postalCode": "01000",
            "aliases": [
              "Kuang Si Falls",
              "Vientiane Kuang Si Falls"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Latvia",
    "code": "LV",
    "cities": [
      {
        "name": "Riga",
        "places": [
          {
            "name": "Old Riga (Vecrīga)",
            "postalCode": "LV-1050",
            "aliases": [
              "Old Riga (Vecrīga)",
              "Riga Old Riga (Vecrīga)"
            ]
          },
          {
            "name": "Art Nouveau District",
            "postalCode": "LV-1050",
            "aliases": [
              "Art Nouveau District",
              "Riga Art Nouveau District"
            ]
          },
          {
            "name": "Jūrmala Beach Resort",
            "postalCode": "LV-1050",
            "aliases": [
              "Jūrmala Beach Resort",
              "Riga Jūrmala Beach Resort"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Lebanon",
    "code": "LB",
    "cities": [
      {
        "name": "Beirut",
        "places": [
          {
            "name": "Zaitunay Bay",
            "postalCode": "1107",
            "aliases": [
              "Zaitunay Bay",
              "Beirut Zaitunay Bay"
            ]
          },
          {
            "name": "Corniche Raouche Pigeon Rocks",
            "postalCode": "1107",
            "aliases": [
              "Corniche Raouche Pigeon Rocks",
              "Beirut Corniche Raouche Pigeon Rocks"
            ]
          },
          {
            "name": "Byblos Old Port",
            "postalCode": "1107",
            "aliases": [
              "Byblos Old Port",
              "Beirut Byblos Old Port"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Lesotho",
    "code": "LS",
    "cities": [
      {
        "name": "Maseru",
        "places": [
          {
            "name": "Maletsunyane Falls",
            "postalCode": "100",
            "aliases": [
              "Maletsunyane Falls",
              "Maseru Maletsunyane Falls"
            ]
          },
          {
            "name": "Sani Pass",
            "postalCode": "100",
            "aliases": [
              "Sani Pass",
              "Maseru Sani Pass"
            ]
          },
          {
            "name": "Thaba Bosiu",
            "postalCode": "100",
            "aliases": [
              "Thaba Bosiu",
              "Maseru Thaba Bosiu"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Liberia",
    "code": "LR",
    "cities": [
      {
        "name": "Monrovia",
        "places": [
          {
            "name": "Broad Street",
            "postalCode": "1000",
            "aliases": [
              "Broad Street",
              "Monrovia Broad Street"
            ]
          },
          {
            "name": "Silver Beach",
            "postalCode": "1000",
            "aliases": [
              "Silver Beach",
              "Monrovia Silver Beach"
            ]
          },
          {
            "name": "Providence Island",
            "postalCode": "1000",
            "aliases": [
              "Providence Island",
              "Monrovia Providence Island"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Libya",
    "code": "LY",
    "cities": [
      {
        "name": "Tripoli",
        "places": [
          {
            "name": "Martyrs’ Square",
            "postalCode": "10000",
            "aliases": [
              "Martyrs’ Square",
              "Tripoli Martyrs’ Square"
            ]
          },
          {
            "name": "Red Castle Museum",
            "postalCode": "10000",
            "aliases": [
              "Red Castle Museum",
              "Tripoli Red Castle Museum"
            ]
          },
          {
            "name": "Leptis Magna Ruins",
            "postalCode": "10000",
            "aliases": [
              "Leptis Magna Ruins",
              "Tripoli Leptis Magna Ruins"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Liechtenstein",
    "code": "LI",
    "cities": [
      {
        "name": "Vaduz",
        "places": [
          {
            "name": "Vaduz Castle View",
            "postalCode": "9490",
            "aliases": [
              "Vaduz Castle View",
              "Vaduz Vaduz Castle View"
            ]
          },
          {
            "name": "Städtle Walking Street",
            "postalCode": "9490",
            "aliases": [
              "Städtle Walking Street",
              "Vaduz Städtle Walking Street"
            ]
          },
          {
            "name": "Malbun Ski Area",
            "postalCode": "9490",
            "aliases": [
              "Malbun Ski Area",
              "Vaduz Malbun Ski Area"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Lithuania",
    "code": "LT",
    "cities": [
      {
        "name": "Vilnius",
        "places": [
          {
            "name": "Vilnius Old Town",
            "postalCode": "LT-01100",
            "aliases": [
              "Vilnius Old Town",
              "Vilnius Vilnius Old Town"
            ]
          },
          {
            "name": "Gediminas Castle",
            "postalCode": "LT-01100",
            "aliases": [
              "Gediminas Castle",
              "Vilnius Gediminas Castle"
            ]
          },
          {
            "name": "Trakai Island Castle",
            "postalCode": "LT-01100",
            "aliases": [
              "Trakai Island Castle",
              "Vilnius Trakai Island Castle"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Luxembourg",
    "code": "LU",
    "cities": [
      {
        "name": "Luxembourg City",
        "places": [
          {
            "name": "Bock Casemates",
            "postalCode": "1110",
            "aliases": [
              "Bock Casemates",
              "Luxembourg City Bock Casemates"
            ]
          },
          {
            "name": "Place Guillaume II",
            "postalCode": "1110",
            "aliases": [
              "Place Guillaume II",
              "Luxembourg City Place Guillaume II"
            ]
          },
          {
            "name": "Vianden Castle",
            "postalCode": "1110",
            "aliases": [
              "Vianden Castle",
              "Luxembourg City Vianden Castle"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Macau",
    "code": "MO",
    "cities": [
      {
        "name": "Macau",
        "places": [
          {
            "name": "Ruins of St. Paul’s",
            "postalCode": "999078",
            "aliases": [
              "Ruins of St. Paul’s",
              "Macau Ruins of St. Paul’s"
            ]
          },
          {
            "name": "Senado Square",
            "postalCode": "999078",
            "aliases": [
              "Senado Square",
              "Macau Senado Square"
            ]
          },
          {
            "name": "Cotai Strip",
            "postalCode": "999078",
            "aliases": [
              "Cotai Strip",
              "Macau Cotai Strip"
            ]
          },
          {
            "name": "Taipa Village",
            "postalCode": "999078",
            "aliases": [
              "Taipa Village",
              "Macau Taipa Village"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Madagascar",
    "code": "MG",
    "cities": [
      {
        "name": "Antananarivo",
        "places": [
          {
            "name": "Avenue of the Baobabs",
            "postalCode": "101",
            "aliases": [
              "Avenue of the Baobabs",
              "Antananarivo Avenue of the Baobabs"
            ]
          },
          {
            "name": "Nosy Be Beach",
            "postalCode": "101",
            "aliases": [
              "Nosy Be Beach",
              "Antananarivo Nosy Be Beach"
            ]
          },
          {
            "name": "Rova of Antananarivo",
            "postalCode": "101",
            "aliases": [
              "Rova of Antananarivo",
              "Antananarivo Rova of Antananarivo"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Malawi",
    "code": "MW",
    "cities": [
      {
        "name": "Lilongwe",
        "places": [
          {
            "name": "Lake Malawi National Park",
            "postalCode": "00000",
            "aliases": [
              "Lake Malawi National Park",
              "Lilongwe Lake Malawi National Park"
            ]
          },
          {
            "name": "Cape Maclear",
            "postalCode": "00000",
            "aliases": [
              "Cape Maclear",
              "Lilongwe Cape Maclear"
            ]
          },
          {
            "name": "Old Town",
            "postalCode": "00000",
            "aliases": [
              "Old Town",
              "Lilongwe Old Town"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Malaysia",
    "code": "MY",
    "cities": [
      {
        "name": "Kuala Lumpur",
        "aliases": [
          "KL"
        ],
        "places": [
          {
            "name": "KLCC (Kuala Lumpur City Centre)",
            "postalCode": "50088",
            "aliases": [
              "Petronas Twin Towers",
              "Suria KLCC",
              "KLCC Park"
            ]
          },
          {
            "name": "Bukit Bintang",
            "postalCode": "55100",
            "aliases": [
              "Pavilion KL",
              "Jalan Alor Night Food Street"
            ]
          },
          {
            "name": "Chinatown & Petaling Street",
            "postalCode": "50000",
            "aliases": [
              "Central Market",
              "Kwan Ti Temple"
            ]
          },
          {
            "name": "Batu Caves Area",
            "postalCode": "68100",
            "aliases": [
              "Lord Murugan Statue",
              "Limestone Caves"
            ]
          }
        ]
      },
      {
        "name": "Penang",
        "aliases": [
          "George Town"
        ],
        "places": [
          {
            "name": "George Town Heritage Zone",
            "postalCode": "10200",
            "aliases": [
              "Armenian Street Murals",
              "Cheong Fatt Tze Mansion",
              "Clan Jetties"
            ]
          },
          {
            "name": "Batu Ferringhi",
            "postalCode": "11100",
            "aliases": [
              "Night Market",
              "Water Sports Beach"
            ]
          }
        ]
      },
      {
        "name": "Langkawi",
        "aliases": [
          "Jewel of Kedah"
        ],
        "places": [
          {
            "name": "Pantai Cenang",
            "postalCode": "07000",
            "aliases": [
              "Cenang Beach",
              "Underwater World"
            ]
          },
          {
            "name": "Oriental Village & SkyBridge",
            "postalCode": "07000",
            "aliases": [
              "Cable Car",
              "Langkawi Sky Bridge"
            ]
          }
        ]
      },
      {
        "name": "Melaka",
        "aliases": [
          "Malacca"
        ],
        "places": [
          {
            "name": "Jonker Street & Dutch Square",
            "postalCode": "75200",
            "aliases": [
              "Christ Church Melaka",
              "A Famosa Fort"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Maldives",
    "code": "MV",
    "cities": [
      {
        "name": "Male",
        "aliases": [
          "Malé City"
        ],
        "places": [
          {
            "name": "Male City Centre",
            "postalCode": "20002",
            "aliases": [
              "Grand Friday Mosque",
              "Republic Square",
              "Fish Market"
            ]
          },
          {
            "name": "Hulhumale",
            "postalCode": "23000",
            "aliases": [
              "Hulhumale Beach",
              "Central Park"
            ]
          }
        ]
      },
      {
        "name": "Maafushi",
        "aliases": [
          "Kaafu Atoll"
        ],
        "places": [
          {
            "name": "Bikini Beach & Island Hub",
            "postalCode": "08090",
            "aliases": [
              "Water Sports Beach",
              "Sandbank Excursions"
            ]
          }
        ]
      },
      {
        "name": "Baa Atoll",
        "aliases": [
          "UNESCO Biosphere Reserve"
        ],
        "places": [
          {
            "name": "Hanifaru Bay Area",
            "postalCode": "06010",
            "aliases": [
              "Manta Ray Sanctuary",
              "Luxury Atoll Resorts"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Mali",
    "code": "ML",
    "cities": [
      {
        "name": "Bamako",
        "places": [
          {
            "name": "Great Mosque of Djenné",
            "postalCode": "00000",
            "aliases": [
              "Great Mosque of Djenné",
              "Bamako Great Mosque of Djenné"
            ]
          },
          {
            "name": "National Museum of Mali",
            "postalCode": "00000",
            "aliases": [
              "National Museum of Mali",
              "Bamako National Museum of Mali"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Malta",
    "code": "MT",
    "cities": [
      {
        "name": "Valletta",
        "places": [
          {
            "name": "St. John’s Co-Cathedral",
            "postalCode": "VLT 1115",
            "aliases": [
              "St. John’s Co-Cathedral",
              "Valletta St. John’s Co-Cathedral"
            ]
          },
          {
            "name": "Upper Barrakka Gardens",
            "postalCode": "VLT 1115",
            "aliases": [
              "Upper Barrakka Gardens",
              "Valletta Upper Barrakka Gardens"
            ]
          },
          {
            "name": "Sliema Promenade",
            "postalCode": "VLT 1115",
            "aliases": [
              "Sliema Promenade",
              "Valletta Sliema Promenade"
            ]
          },
          {
            "name": "Mdina Silent City",
            "postalCode": "VLT 1115",
            "aliases": [
              "Mdina Silent City",
              "Valletta Mdina Silent City"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Marshall Islands",
    "code": "MH",
    "cities": [
      {
        "name": "Majuro",
        "places": [
          {
            "name": "Majuro Peace Park",
            "postalCode": "96960",
            "aliases": [
              "Majuro Peace Park",
              "Majuro Majuro Peace Park"
            ]
          },
          {
            "name": "Laura Beach",
            "postalCode": "96960",
            "aliases": [
              "Laura Beach",
              "Majuro Laura Beach"
            ]
          },
          {
            "name": "Arno Atoll",
            "postalCode": "96960",
            "aliases": [
              "Arno Atoll",
              "Majuro Arno Atoll"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Mauritania",
    "code": "MR",
    "cities": [
      {
        "name": "Nouakchott",
        "places": [
          {
            "name": "Port de Pêche",
            "postalCode": "00000",
            "aliases": [
              "Port de Pêche",
              "Nouakchott Port de Pêche"
            ]
          },
          {
            "name": "Chinguetti Ancient Library",
            "postalCode": "00000",
            "aliases": [
              "Chinguetti Ancient Library",
              "Nouakchott Chinguetti Ancient Library"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Mauritius",
    "code": "MU",
    "cities": [
      {
        "name": "Port Louis",
        "places": [
          {
            "name": "Le Caudan Waterfront",
            "postalCode": "11328",
            "aliases": [
              "Le Caudan Waterfront",
              "Port Louis Le Caudan Waterfront"
            ]
          },
          {
            "name": "Grand Baie Beach",
            "postalCode": "11328",
            "aliases": [
              "Grand Baie Beach",
              "Port Louis Grand Baie Beach"
            ]
          },
          {
            "name": "Flic en Flac",
            "postalCode": "11328",
            "aliases": [
              "Flic en Flac",
              "Port Louis Flic en Flac"
            ]
          },
          {
            "name": "Chamarel Seven Coloured Earth",
            "postalCode": "11328",
            "aliases": [
              "Chamarel Seven Coloured Earth",
              "Port Louis Chamarel Seven Coloured Earth"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Mexico",
    "code": "MX",
    "cities": [
      {
        "name": "Cancun",
        "aliases": [
          "Quintana Roo"
        ],
        "places": [
          {
            "name": "Hotel Zone (Zona Hotelera)",
            "postalCode": "77500",
            "aliases": [
              "Playa Delfines",
              "La Isla Shopping Village",
              "Chichen Itza Tour Hub"
            ]
          }
        ]
      },
      {
        "name": "Mexico City",
        "aliases": [
          "CDMX"
        ],
        "places": [
          {
            "name": "Centro Histórico & Zócalo",
            "postalCode": "06000",
            "aliases": [
              "Metropolitan Cathedral",
              "Templo Mayor",
              "Palacio de Bellas Artes"
            ]
          },
          {
            "name": "Roma & Condesa",
            "postalCode": "06700",
            "aliases": [
              "Parque Mexico",
              "Cafes & Art Scene"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Micronesia",
    "code": "FM",
    "cities": [
      {
        "name": "Palikir",
        "places": [
          {
            "name": "Nan Madol Ancient Ruins",
            "postalCode": "96941",
            "aliases": [
              "Nan Madol Ancient Ruins",
              "Palikir Nan Madol Ancient Ruins"
            ]
          },
          {
            "name": "Sokehs Rock",
            "postalCode": "96941",
            "aliases": [
              "Sokehs Rock",
              "Palikir Sokehs Rock"
            ]
          },
          {
            "name": "Pohnpei Harbor",
            "postalCode": "96941",
            "aliases": [
              "Pohnpei Harbor",
              "Palikir Pohnpei Harbor"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Moldova",
    "code": "MD",
    "cities": [
      {
        "name": "Chisinau",
        "places": [
          {
            "name": "Cricova Wine Cellars",
            "postalCode": "MD-2012",
            "aliases": [
              "Cricova Wine Cellars",
              "Chisinau Cricova Wine Cellars"
            ]
          },
          {
            "name": "Nativity Cathedral",
            "postalCode": "MD-2012",
            "aliases": [
              "Nativity Cathedral",
              "Chisinau Nativity Cathedral"
            ]
          },
          {
            "name": "Stefan cel Mare Park",
            "postalCode": "MD-2012",
            "aliases": [
              "Stefan cel Mare Park",
              "Chisinau Stefan cel Mare Park"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Monaco",
    "code": "MC",
    "cities": [
      {
        "name": "Monaco",
        "places": [
          {
            "name": "Monte Carlo Casino",
            "postalCode": "98000",
            "aliases": [
              "Monte Carlo Casino",
              "Monaco Monte Carlo Casino"
            ]
          },
          {
            "name": "Prince’s Palace",
            "postalCode": "98000",
            "aliases": [
              "Prince’s Palace",
              "Monaco Prince’s Palace"
            ]
          },
          {
            "name": "Port Hercule (Yachts)",
            "postalCode": "98000",
            "aliases": [
              "Port Hercule (Yachts)",
              "Monaco Port Hercule (Yachts)"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Mongolia",
    "code": "MN",
    "cities": [
      {
        "name": "Ulaanbaatar",
        "places": [
          {
            "name": "Sükhbaatar Square",
            "postalCode": "14200",
            "aliases": [
              "Sükhbaatar Square",
              "Ulaanbaatar Sükhbaatar Square"
            ]
          },
          {
            "name": "Gandantegchinlen Monastery",
            "postalCode": "14200",
            "aliases": [
              "Gandantegchinlen Monastery",
              "Ulaanbaatar Gandantegchinlen Monastery"
            ]
          },
          {
            "name": "Gobi Desert Dunes",
            "postalCode": "14200",
            "aliases": [
              "Gobi Desert Dunes",
              "Ulaanbaatar Gobi Desert Dunes"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Montenegro",
    "code": "ME",
    "cities": [
      {
        "name": "Podgorica",
        "places": [
          {
            "name": "Bay of Kotor Old Town",
            "postalCode": "81000",
            "aliases": [
              "Bay of Kotor Old Town",
              "Podgorica Bay of Kotor Old Town"
            ]
          },
          {
            "name": "Budva Citadel & Beach",
            "postalCode": "81000",
            "aliases": [
              "Budva Citadel & Beach",
              "Podgorica Budva Citadel & Beach"
            ]
          },
          {
            "name": "Sveti Stefan",
            "postalCode": "81000",
            "aliases": [
              "Sveti Stefan",
              "Podgorica Sveti Stefan"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Morocco",
    "code": "MA",
    "cities": [
      {
        "name": "Rabat",
        "places": [
          {
            "name": "Marrakech Jemaa el-Fnaa",
            "postalCode": "10000",
            "aliases": [
              "Marrakech Jemaa el-Fnaa",
              "Rabat Marrakech Jemaa el-Fnaa"
            ]
          },
          {
            "name": "Chefchaouen Blue City",
            "postalCode": "10000",
            "aliases": [
              "Chefchaouen Blue City",
              "Rabat Chefchaouen Blue City"
            ]
          },
          {
            "name": "Fes Medina",
            "postalCode": "10000",
            "aliases": [
              "Fes Medina",
              "Rabat Fes Medina"
            ]
          },
          {
            "name": "Casablanca Hassan II Mosque",
            "postalCode": "10000",
            "aliases": [
              "Casablanca Hassan II Mosque",
              "Rabat Casablanca Hassan II Mosque"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Mozambique",
    "code": "MZ",
    "cities": [
      {
        "name": "Maputo",
        "places": [
          {
            "name": "Maputo Waterfront",
            "postalCode": "1100",
            "aliases": [
              "Maputo Waterfront",
              "Maputo Maputo Waterfront"
            ]
          },
          {
            "name": "Tofo Beach",
            "postalCode": "1100",
            "aliases": [
              "Tofo Beach",
              "Maputo Tofo Beach"
            ]
          },
          {
            "name": "Bazaruto Archipelago",
            "postalCode": "1100",
            "aliases": [
              "Bazaruto Archipelago",
              "Maputo Bazaruto Archipelago"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Myanmar",
    "code": "MM",
    "cities": [
      {
        "name": "Naypyidaw",
        "places": [
          {
            "name": "Bagan Ancient Pagodas",
            "postalCode": "15011",
            "aliases": [
              "Bagan Ancient Pagodas",
              "Naypyidaw Bagan Ancient Pagodas"
            ]
          },
          {
            "name": "Shwedagon Pagoda (Yangon)",
            "postalCode": "15011",
            "aliases": [
              "Shwedagon Pagoda (Yangon)",
              "Naypyidaw Shwedagon Pagoda (Yangon)"
            ]
          },
          {
            "name": "Inle Lake Floating Gardens",
            "postalCode": "15011",
            "aliases": [
              "Inle Lake Floating Gardens",
              "Naypyidaw Inle Lake Floating Gardens"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Namibia",
    "code": "NA",
    "cities": [
      {
        "name": "Windhoek",
        "places": [
          {
            "name": "Sossusvlei Red Dunes",
            "postalCode": "9000",
            "aliases": [
              "Sossusvlei Red Dunes",
              "Windhoek Sossusvlei Red Dunes"
            ]
          },
          {
            "name": "Deadvlei",
            "postalCode": "9000",
            "aliases": [
              "Deadvlei",
              "Windhoek Deadvlei"
            ]
          },
          {
            "name": "Swakopmund Coastline",
            "postalCode": "9000",
            "aliases": [
              "Swakopmund Coastline",
              "Windhoek Swakopmund Coastline"
            ]
          },
          {
            "name": "Etosha National Park",
            "postalCode": "9000",
            "aliases": [
              "Etosha National Park",
              "Windhoek Etosha National Park"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Nauru",
    "code": "NR",
    "cities": [
      {
        "name": "Yaren",
        "places": [
          {
            "name": "Anibare Bay",
            "postalCode": "00000",
            "aliases": [
              "Anibare Bay",
              "Yaren Anibare Bay"
            ]
          },
          {
            "name": "Command Ridge",
            "postalCode": "00000",
            "aliases": [
              "Command Ridge",
              "Yaren Command Ridge"
            ]
          },
          {
            "name": "Buada Lagoon",
            "postalCode": "00000",
            "aliases": [
              "Buada Lagoon",
              "Yaren Buada Lagoon"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Nepal",
    "code": "NP",
    "cities": [
      {
        "name": "Kathmandu",
        "places": [
          {
            "name": "Thamel Tourist Hub",
            "postalCode": "44600",
            "aliases": [
              "Thamel Tourist Hub",
              "Kathmandu Thamel Tourist Hub"
            ]
          },
          {
            "name": "Kathmandu Durbar Square",
            "postalCode": "44600",
            "aliases": [
              "Kathmandu Durbar Square",
              "Kathmandu Kathmandu Durbar Square"
            ]
          },
          {
            "name": "Boudhanath Stupa",
            "postalCode": "44600",
            "aliases": [
              "Boudhanath Stupa",
              "Kathmandu Boudhanath Stupa"
            ]
          },
          {
            "name": "Pokhara Phewa Lake",
            "postalCode": "44600",
            "aliases": [
              "Pokhara Phewa Lake",
              "Kathmandu Pokhara Phewa Lake"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Netherlands",
    "code": "NL",
    "cities": [
      {
        "name": "Amsterdam",
        "aliases": [
          "Mokum"
        ],
        "places": [
          {
            "name": "Centrum & Canal Ring (Grachtengordel)",
            "postalCode": "1012 JS",
            "aliases": [
              "Dam Square",
              "Anne Frank House",
              "Red Light District"
            ]
          },
          {
            "name": "Museumkwartier",
            "postalCode": "1071 CJ",
            "aliases": [
              "Rijksmuseum",
              "Van Gogh Museum",
              "Vondelpark"
            ]
          },
          {
            "name": "Jordaan",
            "postalCode": "1015 RG",
            "aliases": [
              "Noordermarkt",
              "Westerkerk",
              "Art Cafes"
            ]
          }
        ]
      },
      {
        "name": "Rotterdam",
        "aliases": [
          "South Holland"
        ],
        "places": [
          {
            "name": "Markthal & Cube Houses",
            "postalCode": "3011 PA",
            "aliases": [
              "Erasmus Bridge",
              "Old Harbour"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "New Zealand",
    "code": "NZ",
    "cities": [
      {
        "name": "Auckland",
        "aliases": [
          "City of Sails"
        ],
        "places": [
          {
            "name": "Auckland CBD & Viaduct Harbour",
            "postalCode": "1010",
            "aliases": [
              "Sky Tower",
              "Wynyard Quarter",
              "Ferry Building"
            ]
          }
        ]
      },
      {
        "name": "Queenstown",
        "aliases": [
          "Adventure Capital",
          "Otago"
        ],
        "places": [
          {
            "name": "Queenstown Town Centre & Lake Wakatipu",
            "postalCode": "9300",
            "aliases": [
              "Skyline Gondola",
              "Lake Wakatipu Steamer",
              "Shotover River"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Nicaragua",
    "code": "NI",
    "cities": [
      {
        "name": "Managua",
        "places": [
          {
            "name": "Granada Colonial Square",
            "postalCode": "11001",
            "aliases": [
              "Granada Colonial Square",
              "Managua Granada Colonial Square"
            ]
          },
          {
            "name": "San Juan del Sur Beach",
            "postalCode": "11001",
            "aliases": [
              "San Juan del Sur Beach",
              "Managua San Juan del Sur Beach"
            ]
          },
          {
            "name": "Ometepe Island",
            "postalCode": "11001",
            "aliases": [
              "Ometepe Island",
              "Managua Ometepe Island"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Niger",
    "code": "NE",
    "cities": [
      {
        "name": "Niamey",
        "places": [
          {
            "name": "Grand Mosque of Niamey",
            "postalCode": "00000",
            "aliases": [
              "Grand Mosque of Niamey",
              "Niamey Grand Mosque of Niamey"
            ]
          },
          {
            "name": "Niger River Banks",
            "postalCode": "00000",
            "aliases": [
              "Niger River Banks",
              "Niamey Niger River Banks"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Nigeria",
    "code": "NG",
    "cities": [
      {
        "name": "Abuja",
        "places": [
          {
            "name": "Victoria Island Lagos",
            "postalCode": "900001",
            "aliases": [
              "Victoria Island Lagos",
              "Abuja Victoria Island Lagos"
            ]
          },
          {
            "name": "Lekki Conservation Centre",
            "postalCode": "900001",
            "aliases": [
              "Lekki Conservation Centre",
              "Abuja Lekki Conservation Centre"
            ]
          },
          {
            "name": "Aso Rock Abuja",
            "postalCode": "900001",
            "aliases": [
              "Aso Rock Abuja",
              "Abuja Aso Rock Abuja"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "North Korea",
    "code": "KP",
    "cities": [
      {
        "name": "Pyongyang",
        "places": [
          {
            "name": "Kim Il Sung Square",
            "postalCode": "00000",
            "aliases": [
              "Kim Il Sung Square",
              "Pyongyang Kim Il Sung Square"
            ]
          },
          {
            "name": "Juche Tower",
            "postalCode": "00000",
            "aliases": [
              "Juche Tower",
              "Pyongyang Juche Tower"
            ]
          },
          {
            "name": "Arch of Triumph",
            "postalCode": "00000",
            "aliases": [
              "Arch of Triumph",
              "Pyongyang Arch of Triumph"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "North Macedonia",
    "code": "MK",
    "cities": [
      {
        "name": "Skopje",
        "places": [
          {
            "name": "Macedonia Square & Stone Bridge",
            "postalCode": "1000",
            "aliases": [
              "Macedonia Square & Stone Bridge",
              "Skopje Macedonia Square & Stone Bridge"
            ]
          },
          {
            "name": "Old Bazaar",
            "postalCode": "1000",
            "aliases": [
              "Old Bazaar",
              "Skopje Old Bazaar"
            ]
          },
          {
            "name": "Lake Ohrid UNESCO",
            "postalCode": "1000",
            "aliases": [
              "Lake Ohrid UNESCO",
              "Skopje Lake Ohrid UNESCO"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Norway",
    "code": "NO",
    "cities": [
      {
        "name": "Oslo",
        "places": [
          {
            "name": "Aker Brygge Waterfront",
            "postalCode": "0150",
            "aliases": [
              "Aker Brygge Waterfront",
              "Oslo Aker Brygge Waterfront"
            ]
          },
          {
            "name": "Vigeland Sculpture Park",
            "postalCode": "0150",
            "aliases": [
              "Vigeland Sculpture Park",
              "Oslo Vigeland Sculpture Park"
            ]
          },
          {
            "name": "Bergen Bryggen Fjord",
            "postalCode": "0150",
            "aliases": [
              "Bergen Bryggen Fjord",
              "Oslo Bergen Bryggen Fjord"
            ]
          },
          {
            "name": "Tromsø Northern Lights",
            "postalCode": "0150",
            "aliases": [
              "Tromsø Northern Lights",
              "Oslo Tromsø Northern Lights"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Oman",
    "code": "OM",
    "cities": [
      {
        "name": "Muscat",
        "aliases": [
          "Capital of Oman"
        ],
        "places": [
          {
            "name": "Muttrah Corniche & Souq",
            "postalCode": "114",
            "aliases": [
              "Muttrah Souq",
              "Incense Burner Monument"
            ]
          },
          {
            "name": "Sultan Qaboos Grand Mosque Area",
            "postalCode": "130",
            "aliases": [
              "Grand Mosque",
              "Royal Opera House"
            ]
          }
        ]
      },
      {
        "name": "Salalah",
        "aliases": [
          "Dhofar"
        ],
        "places": [
          {
            "name": "Al Haffa Beach & Souq",
            "postalCode": "211",
            "aliases": [
              "Frankincense Land",
              "Wadi Darbat"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Pakistan",
    "code": "PK",
    "cities": [
      {
        "name": "Islamabad",
        "places": [
          {
            "name": "Faisal Mosque",
            "postalCode": "44000",
            "aliases": [
              "Faisal Mosque",
              "Islamabad Faisal Mosque"
            ]
          },
          {
            "name": "Lahore Fort & Badshahi Mosque",
            "postalCode": "44000",
            "aliases": [
              "Lahore Fort & Badshahi Mosque",
              "Islamabad Lahore Fort & Badshahi Mosque"
            ]
          },
          {
            "name": "Hunza Valley Karimabad",
            "postalCode": "44000",
            "aliases": [
              "Hunza Valley Karimabad",
              "Islamabad Hunza Valley Karimabad"
            ]
          },
          {
            "name": "Skardu",
            "postalCode": "44000",
            "aliases": [
              "Skardu",
              "Islamabad Skardu"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Palau",
    "code": "PW",
    "cities": [
      {
        "name": "Ngerulmud",
        "places": [
          {
            "name": "Rock Islands Southern Lagoon",
            "postalCode": "96940",
            "aliases": [
              "Rock Islands Southern Lagoon",
              "Ngerulmud Rock Islands Southern Lagoon"
            ]
          },
          {
            "name": "Jellyfish Lake",
            "postalCode": "96940",
            "aliases": [
              "Jellyfish Lake",
              "Ngerulmud Jellyfish Lake"
            ]
          },
          {
            "name": "Koror Town",
            "postalCode": "96940",
            "aliases": [
              "Koror Town",
              "Ngerulmud Koror Town"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Palestine",
    "code": "PS",
    "cities": [
      {
        "name": "Jerusalem / Ramallah",
        "places": [
          {
            "name": "Church of the Nativity (Bethlehem)",
            "postalCode": "00970",
            "aliases": [
              "Church of the Nativity (Bethlehem)",
              "Jerusalem / Ramallah Church of the Nativity (Bethlehem)"
            ]
          },
          {
            "name": "Ramallah Al-Manara",
            "postalCode": "00970",
            "aliases": [
              "Ramallah Al-Manara",
              "Jerusalem / Ramallah Ramallah Al-Manara"
            ]
          },
          {
            "name": "Hebron Old City",
            "postalCode": "00970",
            "aliases": [
              "Hebron Old City",
              "Jerusalem / Ramallah Hebron Old City"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Panama",
    "code": "PA",
    "cities": [
      {
        "name": "Panama City",
        "places": [
          {
            "name": "Panama Canal Miraflores Locks",
            "postalCode": "0801",
            "aliases": [
              "Panama Canal Miraflores Locks",
              "Panama City Panama Canal Miraflores Locks"
            ]
          },
          {
            "name": "Casco Viejo Old Town",
            "postalCode": "0801",
            "aliases": [
              "Casco Viejo Old Town",
              "Panama City Casco Viejo Old Town"
            ]
          },
          {
            "name": "Bocas del Toro",
            "postalCode": "0801",
            "aliases": [
              "Bocas del Toro",
              "Panama City Bocas del Toro"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Papua New Guinea",
    "code": "PG",
    "cities": [
      {
        "name": "Port Moresby",
        "places": [
          {
            "name": "Ela Beach",
            "postalCode": "121",
            "aliases": [
              "Ela Beach",
              "Port Moresby Ela Beach"
            ]
          },
          {
            "name": "Kokoda Trail Entry",
            "postalCode": "121",
            "aliases": [
              "Kokoda Trail Entry",
              "Port Moresby Kokoda Trail Entry"
            ]
          },
          {
            "name": "National Orchid Garden",
            "postalCode": "121",
            "aliases": [
              "National Orchid Garden",
              "Port Moresby National Orchid Garden"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Paraguay",
    "code": "PY",
    "cities": [
      {
        "name": "Asuncion",
        "places": [
          {
            "name": "Costanera de Asunción",
            "postalCode": "1001",
            "aliases": [
              "Costanera de Asunción",
              "Asuncion Costanera de Asunción"
            ]
          },
          {
            "name": "Palacio de los López",
            "postalCode": "1001",
            "aliases": [
              "Palacio de los López",
              "Asuncion Palacio de los López"
            ]
          },
          {
            "name": "Jesuit Missions",
            "postalCode": "1001",
            "aliases": [
              "Jesuit Missions",
              "Asuncion Jesuit Missions"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Peru",
    "code": "PE",
    "cities": [
      {
        "name": "Lima",
        "places": [
          {
            "name": "Machu Picchu Sanctuary",
            "postalCode": "15074",
            "aliases": [
              "Machu Picchu Sanctuary",
              "Lima Machu Picchu Sanctuary"
            ]
          },
          {
            "name": "Cusco Plaza de Armas",
            "postalCode": "15074",
            "aliases": [
              "Cusco Plaza de Armas",
              "Lima Cusco Plaza de Armas"
            ]
          },
          {
            "name": "Miraflores Malecon (Lima)",
            "postalCode": "15074",
            "aliases": [
              "Miraflores Malecon (Lima)",
              "Lima Miraflores Malecon (Lima)"
            ]
          },
          {
            "name": "Sacred Valley",
            "postalCode": "15074",
            "aliases": [
              "Sacred Valley",
              "Lima Sacred Valley"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Philippines",
    "code": "PH",
    "cities": [
      {
        "name": "Manila",
        "places": [
          {
            "name": "Boracay White Beach",
            "postalCode": "1000",
            "aliases": [
              "Boracay White Beach",
              "Manila Boracay White Beach"
            ]
          },
          {
            "name": "El Nido Bacuit Bay (Palawan)",
            "postalCode": "1000",
            "aliases": [
              "El Nido Bacuit Bay (Palawan)",
              "Manila El Nido Bacuit Bay (Palawan)"
            ]
          },
          {
            "name": "BGC Taguig",
            "postalCode": "1000",
            "aliases": [
              "BGC Taguig",
              "Manila BGC Taguig"
            ]
          },
          {
            "name": "Cebu Mactan",
            "postalCode": "1000",
            "aliases": [
              "Cebu Mactan",
              "Manila Cebu Mactan"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Poland",
    "code": "PL",
    "cities": [
      {
        "name": "Warsaw",
        "places": [
          {
            "name": "Krakow Main Market Square",
            "postalCode": "00-001",
            "aliases": [
              "Krakow Main Market Square",
              "Warsaw Krakow Main Market Square"
            ]
          },
          {
            "name": "Wawel Castle",
            "postalCode": "00-001",
            "aliases": [
              "Wawel Castle",
              "Warsaw Wawel Castle"
            ]
          },
          {
            "name": "Warsaw Old Town",
            "postalCode": "00-001",
            "aliases": [
              "Warsaw Old Town",
              "Warsaw Warsaw Old Town"
            ]
          },
          {
            "name": "Zakopane Tatra Mountains",
            "postalCode": "00-001",
            "aliases": [
              "Zakopane Tatra Mountains",
              "Warsaw Zakopane Tatra Mountains"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Portugal",
    "code": "PT",
    "cities": [
      {
        "name": "Lisbon",
        "aliases": [
          "Lisboa"
        ],
        "places": [
          {
            "name": "Baixa & Chiado",
            "postalCode": "1100-058",
            "aliases": [
              "Praça do Comércio",
              "Santa Justa Lift",
              "Rossio"
            ]
          },
          {
            "name": "Alfama & Castelo",
            "postalCode": "1100-022",
            "aliases": [
              "São Jorge Castle",
              "Fado Houses",
              "Miradouro de Santa Luzia"
            ]
          },
          {
            "name": "Belém",
            "postalCode": "1400-038",
            "aliases": [
              "Belém Tower",
              "Jerónimos Monastery",
              "Pastéis de Belém"
            ]
          }
        ]
      },
      {
        "name": "Porto",
        "aliases": [
          "Oporto"
        ],
        "places": [
          {
            "name": "Ribeira & Dom Luís Bridge",
            "postalCode": "4050-513",
            "aliases": [
              "Douro Riverfront",
              "Livraria Lello",
              "Clérigos Tower"
            ]
          }
        ]
      },
      {
        "name": "Faro & Algarve",
        "aliases": [
          "Algarve Coast"
        ],
        "places": [
          {
            "name": "Faro Old Town & Marina",
            "postalCode": "8000-168",
            "aliases": [
              "Ria Formosa Lagoon",
              "Benagil Cave Boat Tours"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Puerto Rico",
    "code": "PR",
    "cities": [
      {
        "name": "San Juan",
        "places": [
          {
            "name": "Old San Juan (El Morro)",
            "postalCode": "00901",
            "aliases": [
              "Old San Juan (El Morro)",
              "San Juan Old San Juan (El Morro)"
            ]
          },
          {
            "name": "Condado Beach",
            "postalCode": "00901",
            "aliases": [
              "Condado Beach",
              "San Juan Condado Beach"
            ]
          },
          {
            "name": "Isla Verde",
            "postalCode": "00901",
            "aliases": [
              "Isla Verde",
              "San Juan Isla Verde"
            ]
          },
          {
            "name": "El Yunque Rainforest",
            "postalCode": "00901",
            "aliases": [
              "El Yunque Rainforest",
              "San Juan El Yunque Rainforest"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Qatar",
    "code": "QA",
    "cities": [
      {
        "name": "Doha",
        "aliases": [
          "Capital of Qatar"
        ],
        "places": [
          {
            "name": "Souq Waqif & Msheireb",
            "postalCode": "00000",
            "aliases": [
              "Souq Waqif",
              "Museum of Islamic Art",
              "Msheireb Downtown"
            ]
          },
          {
            "name": "The Pearl-Qatar",
            "postalCode": "00000",
            "aliases": [
              "Porto Arabia",
              "Qanat Quartier"
            ]
          },
          {
            "name": "Katara Cultural Village",
            "postalCode": "00000",
            "aliases": [
              "Katara Amphitheatre",
              "Katara Beach"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Republic of the Congo",
    "code": "CG",
    "cities": [
      {
        "name": "Brazzaville",
        "places": [
          {
            "name": "Congo River Rapids",
            "postalCode": "00000",
            "aliases": [
              "Congo River Rapids",
              "Brazzaville Congo River Rapids"
            ]
          },
          {
            "name": "Basilique Sainte-Anne",
            "postalCode": "00000",
            "aliases": [
              "Basilique Sainte-Anne",
              "Brazzaville Basilique Sainte-Anne"
            ]
          },
          {
            "name": "Odzala National Park",
            "postalCode": "00000",
            "aliases": [
              "Odzala National Park",
              "Brazzaville Odzala National Park"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Romania",
    "code": "RO",
    "cities": [
      {
        "name": "Bucharest",
        "places": [
          {
            "name": "Palace of the Parliament",
            "postalCode": "010011",
            "aliases": [
              "Palace of the Parliament",
              "Bucharest Palace of the Parliament"
            ]
          },
          {
            "name": "Old Town Lipscani",
            "postalCode": "010011",
            "aliases": [
              "Old Town Lipscani",
              "Bucharest Old Town Lipscani"
            ]
          },
          {
            "name": "Bran Castle (Dracula)",
            "postalCode": "010011",
            "aliases": [
              "Bran Castle (Dracula)",
              "Bucharest Bran Castle (Dracula)"
            ]
          },
          {
            "name": "Brasov Council Square",
            "postalCode": "010011",
            "aliases": [
              "Brasov Council Square",
              "Bucharest Brasov Council Square"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Russia",
    "code": "RU",
    "cities": [
      {
        "name": "Moscow",
        "places": [
          {
            "name": "Red Square & Kremlin",
            "postalCode": "101000",
            "aliases": [
              "Red Square & Kremlin",
              "Moscow Red Square & Kremlin"
            ]
          },
          {
            "name": "St. Basil Cathedral",
            "postalCode": "101000",
            "aliases": [
              "St. Basil Cathedral",
              "Moscow St. Basil Cathedral"
            ]
          },
          {
            "name": "Hermitage Museum (St. Petersburg)",
            "postalCode": "101000",
            "aliases": [
              "Hermitage Museum (St. Petersburg)",
              "Moscow Hermitage Museum (St. Petersburg)"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Rwanda",
    "code": "RW",
    "cities": [
      {
        "name": "Kigali",
        "places": [
          {
            "name": "Kigali Genocide Memorial",
            "postalCode": "00000",
            "aliases": [
              "Kigali Genocide Memorial",
              "Kigali Kigali Genocide Memorial"
            ]
          },
          {
            "name": "Volcanoes National Park (Gorillas)",
            "postalCode": "00000",
            "aliases": [
              "Volcanoes National Park (Gorillas)",
              "Kigali Volcanoes National Park (Gorillas)"
            ]
          },
          {
            "name": "Kimironko Market",
            "postalCode": "00000",
            "aliases": [
              "Kimironko Market",
              "Kigali Kimironko Market"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Saint Kitts and Nevis",
    "code": "KN",
    "cities": [
      {
        "name": "Basseterre",
        "places": [
          {
            "name": "Brimstone Hill Fortress",
            "postalCode": "00000",
            "aliases": [
              "Brimstone Hill Fortress",
              "Basseterre Brimstone Hill Fortress"
            ]
          },
          {
            "name": "Frigate Bay Beach",
            "postalCode": "00000",
            "aliases": [
              "Frigate Bay Beach",
              "Basseterre Frigate Bay Beach"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Saint Lucia",
    "code": "LC",
    "cities": [
      {
        "name": "Castries",
        "places": [
          {
            "name": "The Pitons Mountains",
            "postalCode": "LC04 101",
            "aliases": [
              "The Pitons Mountains",
              "Castries The Pitons Mountains"
            ]
          },
          {
            "name": "Anse Chastanet Beach",
            "postalCode": "LC04 101",
            "aliases": [
              "Anse Chastanet Beach",
              "Castries Anse Chastanet Beach"
            ]
          },
          {
            "name": "Rodney Bay Marina",
            "postalCode": "LC04 101",
            "aliases": [
              "Rodney Bay Marina",
              "Castries Rodney Bay Marina"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Saint Vincent and the Grenadines",
    "code": "VC",
    "cities": [
      {
        "name": "Kingstown",
        "places": [
          {
            "name": "Bequia Island",
            "postalCode": "VC0100",
            "aliases": [
              "Bequia Island",
              "Kingstown Bequia Island"
            ]
          },
          {
            "name": "Tobago Cays Marine Park",
            "postalCode": "VC0100",
            "aliases": [
              "Tobago Cays Marine Park",
              "Kingstown Tobago Cays Marine Park"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Samoa",
    "code": "WS",
    "cities": [
      {
        "name": "Apia",
        "places": [
          {
            "name": "To Sua Ocean Trench",
            "postalCode": "00000",
            "aliases": [
              "To Sua Ocean Trench",
              "Apia To Sua Ocean Trench"
            ]
          },
          {
            "name": "Lalomanu Beach",
            "postalCode": "00000",
            "aliases": [
              "Lalomanu Beach",
              "Apia Lalomanu Beach"
            ]
          },
          {
            "name": "Robert Louis Stevenson Museum",
            "postalCode": "00000",
            "aliases": [
              "Robert Louis Stevenson Museum",
              "Apia Robert Louis Stevenson Museum"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "San Marino",
    "code": "SM",
    "cities": [
      {
        "name": "San Marino",
        "places": [
          {
            "name": "Guaita Tower",
            "postalCode": "47890",
            "aliases": [
              "Guaita Tower",
              "San Marino Guaita Tower"
            ]
          },
          {
            "name": "Piazza della Libertà",
            "postalCode": "47890",
            "aliases": [
              "Piazza della Libertà",
              "San Marino Piazza della Libertà"
            ]
          },
          {
            "name": "Mount Titano",
            "postalCode": "47890",
            "aliases": [
              "Mount Titano",
              "San Marino Mount Titano"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Sao Tome and Principe",
    "code": "ST",
    "cities": [
      {
        "name": "Sao Tome",
        "places": [
          {
            "name": "Pico Cão Grande",
            "postalCode": "0000",
            "aliases": [
              "Pico Cão Grande",
              "Sao Tome Pico Cão Grande"
            ]
          },
          {
            "name": "Praia Inhame",
            "postalCode": "0000",
            "aliases": [
              "Praia Inhame",
              "Sao Tome Praia Inhame"
            ]
          },
          {
            "name": "Obo National Park",
            "postalCode": "0000",
            "aliases": [
              "Obo National Park",
              "Sao Tome Obo National Park"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Saudi Arabia",
    "code": "SA",
    "cities": [
      {
        "name": "Riyadh",
        "aliases": [
          "Capital of KSA"
        ],
        "places": [
          {
            "name": "Olaya & Kingdom Centre",
            "postalCode": "12214",
            "aliases": [
              "Kingdom Tower Sky Bridge",
              "Boulevard City"
            ]
          },
          {
            "name": "Historic Diriyah & At-Turaif",
            "postalCode": "13711",
            "aliases": [
              "UNESCO Heritage Site",
              "Bujairi Terrace"
            ]
          }
        ]
      },
      {
        "name": "Jeddah",
        "aliases": [
          "Bride of the Red Sea"
        ],
        "places": [
          {
            "name": "Al-Balad Historic District",
            "postalCode": "22233",
            "aliases": [
              "Coral Architecture",
              "Nassif House"
            ]
          },
          {
            "name": "Jeddah Corniche",
            "postalCode": "23412",
            "aliases": [
              "King Fahd Fountain",
              "Jeddah Waterfront"
            ]
          }
        ]
      },
      {
        "name": "AlUla",
        "aliases": [
          "Madinah Province"
        ],
        "places": [
          {
            "name": "Hegra (Mada in Salih)",
            "postalCode": "43511",
            "aliases": [
              "Elephant Rock",
              "Old Town AlUla",
              "Maraya Concert Hall"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Senegal",
    "code": "SN",
    "cities": [
      {
        "name": "Dakar",
        "places": [
          {
            "name": "Gorée Island",
            "postalCode": "10000",
            "aliases": [
              "Gorée Island",
              "Dakar Gorée Island"
            ]
          },
          {
            "name": "African Renaissance Monument",
            "postalCode": "10000",
            "aliases": [
              "African Renaissance Monument",
              "Dakar African Renaissance Monument"
            ]
          },
          {
            "name": "Pink Lake (Lake Retba)",
            "postalCode": "10000",
            "aliases": [
              "Pink Lake (Lake Retba)",
              "Dakar Pink Lake (Lake Retba)"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Serbia",
    "code": "RS",
    "cities": [
      {
        "name": "Belgrade",
        "places": [
          {
            "name": "Kalemegdan Fortress",
            "postalCode": "11000",
            "aliases": [
              "Kalemegdan Fortress",
              "Belgrade Kalemegdan Fortress"
            ]
          },
          {
            "name": "Knez Mihailova Street",
            "postalCode": "11000",
            "aliases": [
              "Knez Mihailova Street",
              "Belgrade Knez Mihailova Street"
            ]
          },
          {
            "name": "Skadarlija Bohemian Quarter",
            "postalCode": "11000",
            "aliases": [
              "Skadarlija Bohemian Quarter",
              "Belgrade Skadarlija Bohemian Quarter"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Seychelles",
    "code": "SC",
    "cities": [
      {
        "name": "Victoria",
        "places": [
          {
            "name": "Anse Source d’Argent (La Digue)",
            "postalCode": "00000",
            "aliases": [
              "Anse Source d’Argent (La Digue)",
              "Victoria Anse Source d’Argent (La Digue)"
            ]
          },
          {
            "name": "Beau Vallon Beach (Mahe)",
            "postalCode": "00000",
            "aliases": [
              "Beau Vallon Beach (Mahe)",
              "Victoria Beau Vallon Beach (Mahe)"
            ]
          },
          {
            "name": "Vallée de Mai (Praslin)",
            "postalCode": "00000",
            "aliases": [
              "Vallée de Mai (Praslin)",
              "Victoria Vallée de Mai (Praslin)"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Sierra Leone",
    "code": "SL",
    "cities": [
      {
        "name": "Freetown",
        "places": [
          {
            "name": "Lumley Beach",
            "postalCode": "00000",
            "aliases": [
              "Lumley Beach",
              "Freetown Lumley Beach"
            ]
          },
          {
            "name": "Cotton Tree",
            "postalCode": "00000",
            "aliases": [
              "Cotton Tree",
              "Freetown Cotton Tree"
            ]
          },
          {
            "name": "Banana Islands",
            "postalCode": "00000",
            "aliases": [
              "Banana Islands",
              "Freetown Banana Islands"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Singapore",
    "code": "SG",
    "cities": [
      {
        "name": "Singapore",
        "aliases": [
          "SG",
          "Lion City"
        ],
        "places": [
          {
            "name": "Marina Bay",
            "postalCode": "018956",
            "aliases": [
              "Marina Bay Sands",
              "Gardens by the Bay",
              "Supertrees",
              "Helix Bridge"
            ]
          },
          {
            "name": "Downtown Core & Raffles Place",
            "postalCode": "048616",
            "aliases": [
              "Merlion Park",
              "Fullerton",
              "River Cruises"
            ]
          },
          {
            "name": "Orchard Road",
            "postalCode": "238897",
            "aliases": [
              "ION Orchard",
              "Takashimaya",
              "Shopping Belt"
            ]
          },
          {
            "name": "Chinatown",
            "postalCode": "059424",
            "aliases": [
              "Buddha Tooth Relic Temple",
              "Chinatown Food Street"
            ]
          },
          {
            "name": "Little India",
            "postalCode": "218228",
            "aliases": [
              "Mustafa Centre",
              "Serangoon Road",
              "Sri Veeramakaliamman"
            ]
          },
          {
            "name": "Sentosa Island",
            "postalCode": "098269",
            "aliases": [
              "Universal Studios Singapore",
              "Siloso Beach",
              "S.E.A. Aquarium"
            ]
          },
          {
            "name": "Bugis & Kampong Glam",
            "postalCode": "188979",
            "aliases": [
              "Sultan Mosque",
              "Haji Lane",
              "Arab Street"
            ]
          },
          {
            "name": "Changi Area",
            "postalCode": "819666",
            "aliases": [
              "Jewel Changi",
              "Rain Vortex"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Slovakia",
    "code": "SK",
    "cities": [
      {
        "name": "Bratislava",
        "places": [
          {
            "name": "Bratislava Castle",
            "postalCode": "811 01",
            "aliases": [
              "Bratislava Castle",
              "Bratislava Bratislava Castle"
            ]
          },
          {
            "name": "Old Town & Michael’s Gate",
            "postalCode": "811 01",
            "aliases": [
              "Old Town & Michael’s Gate",
              "Bratislava Old Town & Michael’s Gate"
            ]
          },
          {
            "name": "High Tatras Mountain Resorts",
            "postalCode": "811 01",
            "aliases": [
              "High Tatras Mountain Resorts",
              "Bratislava High Tatras Mountain Resorts"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Slovenia",
    "code": "SI",
    "cities": [
      {
        "name": "Ljubljana",
        "places": [
          {
            "name": "Lake Bled Island & Castle",
            "postalCode": "1000",
            "aliases": [
              "Lake Bled Island & Castle",
              "Ljubljana Lake Bled Island & Castle"
            ]
          },
          {
            "name": "Ljubljana Triple Bridge & Castle",
            "postalCode": "1000",
            "aliases": [
              "Ljubljana Triple Bridge & Castle",
              "Ljubljana Ljubljana Triple Bridge & Castle"
            ]
          },
          {
            "name": "Postojna Cave",
            "postalCode": "1000",
            "aliases": [
              "Postojna Cave",
              "Ljubljana Postojna Cave"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Solomon Islands",
    "code": "SB",
    "cities": [
      {
        "name": "Honiara",
        "places": [
          {
            "name": "Iron Bottom Sound",
            "postalCode": "00000",
            "aliases": [
              "Iron Bottom Sound",
              "Honiara Iron Bottom Sound"
            ]
          },
          {
            "name": "Point Cruz",
            "postalCode": "00000",
            "aliases": [
              "Point Cruz",
              "Honiara Point Cruz"
            ]
          },
          {
            "name": "Mataniko Falls",
            "postalCode": "00000",
            "aliases": [
              "Mataniko Falls",
              "Honiara Mataniko Falls"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Somalia",
    "code": "SO",
    "cities": [
      {
        "name": "Mogadishu",
        "places": [
          {
            "name": "Lido Beach",
            "postalCode": "00000",
            "aliases": [
              "Lido Beach",
              "Mogadishu Lido Beach"
            ]
          },
          {
            "name": "Bakara Market",
            "postalCode": "00000",
            "aliases": [
              "Bakara Market",
              "Mogadishu Bakara Market"
            ]
          },
          {
            "name": "Mogadishu Lighthouse",
            "postalCode": "00000",
            "aliases": [
              "Mogadishu Lighthouse",
              "Mogadishu Mogadishu Lighthouse"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "South Africa",
    "code": "ZA",
    "cities": [
      {
        "name": "Cape Town",
        "aliases": [
          "Mother City",
          "Western Cape"
        ],
        "places": [
          {
            "name": "V&A Waterfront",
            "postalCode": "8001",
            "aliases": [
              "Two Oceans Aquarium",
              "Robben Island Gateway"
            ]
          },
          {
            "name": "Table Mountain & Camps Bay",
            "postalCode": "8005",
            "aliases": [
              "Table Mountain Aerial Cableway",
              "Camps Bay Beach",
              "Kirstenbosch Botanical Gardens"
            ]
          }
        ]
      },
      {
        "name": "Johannesburg",
        "aliases": [
          "Joburg",
          "Gauteng"
        ],
        "places": [
          {
            "name": "Sandton & Rosebank",
            "postalCode": "2196",
            "aliases": [
              "Nelson Mandela Square",
              "Sandton City"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "South Korea",
    "code": "KR",
    "cities": [
      {
        "name": "Seoul",
        "places": [
          {
            "name": "Myeongdong Shopping",
            "postalCode": "04524",
            "aliases": [
              "Myeongdong Shopping",
              "Seoul Myeongdong Shopping"
            ]
          },
          {
            "name": "Gyeongbokgung Palace",
            "postalCode": "04524",
            "aliases": [
              "Gyeongbokgung Palace",
              "Seoul Gyeongbokgung Palace"
            ]
          },
          {
            "name": "Hongdae",
            "postalCode": "04524",
            "aliases": [
              "Hongdae",
              "Seoul Hongdae"
            ]
          },
          {
            "name": "Gangnam COEX",
            "postalCode": "04524",
            "aliases": [
              "Gangnam COEX",
              "Seoul Gangnam COEX"
            ]
          },
          {
            "name": "Busan Haeundae Beach",
            "postalCode": "04524",
            "aliases": [
              "Busan Haeundae Beach",
              "Seoul Busan Haeundae Beach"
            ]
          },
          {
            "name": "Jeju Island",
            "postalCode": "04524",
            "aliases": [
              "Jeju Island",
              "Seoul Jeju Island"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "South Sudan",
    "code": "SS",
    "cities": [
      {
        "name": "Juba",
        "places": [
          {
            "name": "White Nile River Bridge",
            "postalCode": "00000",
            "aliases": [
              "White Nile River Bridge",
              "Juba White Nile River Bridge"
            ]
          },
          {
            "name": "Konyo Konyo Market",
            "postalCode": "00000",
            "aliases": [
              "Konyo Konyo Market",
              "Juba Konyo Konyo Market"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Spain",
    "code": "ES",
    "cities": [
      {
        "name": "Barcelona",
        "aliases": [
          "Catalonia"
        ],
        "places": [
          {
            "name": "Eixample & Sagrada Familia",
            "postalCode": "08013",
            "aliases": [
              "Sagrada Familia",
              "Casa Batllo",
              "Passeig de Gracia"
            ]
          },
          {
            "name": "Gothic Quarter (Barri Gotic)",
            "postalCode": "08002",
            "aliases": [
              "Barcelona Cathedral",
              "La Rambla",
              "Placa Reial"
            ]
          },
          {
            "name": "El Born & Ciutadella",
            "postalCode": "08003",
            "aliases": [
              "Picasso Museum",
              "Parc de la Ciutadella"
            ]
          },
          {
            "name": "Barceloneta & Beachfront",
            "postalCode": "08039",
            "aliases": [
              "Barceloneta Beach",
              "W Hotel Area",
              "Seafood Prom"
            ]
          },
          {
            "name": "Gracia & Park Guell",
            "postalCode": "08024",
            "aliases": [
              "Gaudi Park Guell",
              "Placa del Sol"
            ]
          }
        ]
      },
      {
        "name": "Madrid",
        "aliases": [
          "Spanish Capital"
        ],
        "places": [
          {
            "name": "Centro & Puerta del Sol",
            "postalCode": "28013",
            "aliases": [
              "Plaza Mayor",
              "Royal Palace of Madrid",
              "Gran Via"
            ]
          },
          {
            "name": "Retiro & Paseo del Prado",
            "postalCode": "28014",
            "aliases": [
              "Prado Museum",
              "El Retiro Park",
              "Reina Sofia"
            ]
          },
          {
            "name": "Malasaña & Chueca",
            "postalCode": "28004",
            "aliases": [
              "Plaza del Dos de Mayo",
              "Gran Via North"
            ]
          }
        ]
      },
      {
        "name": "Seville",
        "aliases": [
          "Sevilla",
          "Andalusia"
        ],
        "places": [
          {
            "name": "Santa Cruz & Cathedral Area",
            "postalCode": "41004",
            "aliases": [
              "Seville Cathedral",
              "Giralda",
              "Real Alcazar",
              "Plaza de Espana"
            ]
          }
        ]
      },
      {
        "name": "Mallorca",
        "aliases": [
          "Majorca",
          "Balearic Islands"
        ],
        "places": [
          {
            "name": "Palma Old Town & Cathedral",
            "postalCode": "07001",
            "aliases": [
              "La Seu Cathedral",
              "Passeig des Born"
            ]
          }
        ]
      },
      {
        "name": "Ibiza",
        "aliases": [
          "Balearic"
        ],
        "places": [
          {
            "name": "Ibiza Town (Dalt Vila)",
            "postalCode": "07800",
            "aliases": [
              "Historic Fortress",
              "Platja d en Bossa",
              "Marina Botafoch"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Sri Lanka",
    "code": "LK",
    "cities": [
      {
        "name": "Colombo",
        "aliases": [
          "Commercial Capital"
        ],
        "places": [
          {
            "name": "Galle Face Green & Fort",
            "postalCode": "00100",
            "aliases": [
              "Galle Face Promenade",
              "Old Dutch Hospital",
              "Lotus Tower"
            ]
          }
        ]
      },
      {
        "name": "Galle",
        "aliases": [
          "Southern Province"
        ],
        "places": [
          {
            "name": "Galle Fort Heritage Area",
            "postalCode": "80000",
            "aliases": [
              "Lighthouse",
              "Ramparts",
              "Dutch Reformed Church"
            ]
          }
        ]
      },
      {
        "name": "Kandy",
        "aliases": [
          "Central Province"
        ],
        "places": [
          {
            "name": "Temple of the Tooth & Lake",
            "postalCode": "20000",
            "aliases": [
              "Sri Dalada Maligawa",
              "Kandy Lake"
            ]
          }
        ]
      },
      {
        "name": "Ella",
        "aliases": [
          "Hill Country"
        ],
        "places": [
          {
            "name": "Ella Town & Nine Arches Bridge",
            "postalCode": "90090",
            "aliases": [
              "Demodara Bridge",
              "Little Adam Peak"
            ]
          }
        ]
      },
      {
        "name": "Sigiriya",
        "aliases": [
          "Cultural Triangle"
        ],
        "places": [
          {
            "name": "Lion Rock Fortress",
            "postalCode": "21120",
            "aliases": [
              "Sigiriya Rock",
              "Pidurangala Rock"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Sudan",
    "code": "SD",
    "cities": [
      {
        "name": "Khartoum",
        "places": [
          {
            "name": "Nile Confluence",
            "postalCode": "11111",
            "aliases": [
              "Nile Confluence",
              "Khartoum Nile Confluence"
            ]
          },
          {
            "name": "Meroë Pyramids",
            "postalCode": "11111",
            "aliases": [
              "Meroë Pyramids",
              "Khartoum Meroë Pyramids"
            ]
          },
          {
            "name": "National Museum",
            "postalCode": "11111",
            "aliases": [
              "National Museum",
              "Khartoum National Museum"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Suriname",
    "code": "SR",
    "cities": [
      {
        "name": "Paramaribo",
        "places": [
          {
            "name": "Historic Inner City Wooden Architecture",
            "postalCode": "00000",
            "aliases": [
              "Historic Inner City Wooden Architecture",
              "Paramaribo Historic Inner City Wooden Architecture"
            ]
          },
          {
            "name": "Waterkant",
            "postalCode": "00000",
            "aliases": [
              "Waterkant",
              "Paramaribo Waterkant"
            ]
          },
          {
            "name": "Fort Zeelandia",
            "postalCode": "00000",
            "aliases": [
              "Fort Zeelandia",
              "Paramaribo Fort Zeelandia"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Sweden",
    "code": "SE",
    "cities": [
      {
        "name": "Stockholm",
        "places": [
          {
            "name": "Gamla Stan (Old Town)",
            "postalCode": "111 22",
            "aliases": [
              "Gamla Stan (Old Town)",
              "Stockholm Gamla Stan (Old Town)"
            ]
          },
          {
            "name": "Vasa Museum",
            "postalCode": "111 22",
            "aliases": [
              "Vasa Museum",
              "Stockholm Vasa Museum"
            ]
          },
          {
            "name": "Djurgården Island",
            "postalCode": "111 22",
            "aliases": [
              "Djurgården Island",
              "Stockholm Djurgården Island"
            ]
          },
          {
            "name": "Gothenburg Archipelago",
            "postalCode": "111 22",
            "aliases": [
              "Gothenburg Archipelago",
              "Stockholm Gothenburg Archipelago"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Switzerland",
    "code": "CH",
    "cities": [
      {
        "name": "Zurich",
        "aliases": [
          "Zürich"
        ],
        "places": [
          {
            "name": "Altstadt (Old Town) & Bahnhofstrasse",
            "postalCode": "8001",
            "aliases": [
              "Grossmünster",
              "Fraumünster",
              "Lake Zurich Promenade"
            ]
          }
        ]
      },
      {
        "name": "Geneva",
        "aliases": [
          "Genève"
        ],
        "places": [
          {
            "name": "Lake Geneva & Jet d’Eau",
            "postalCode": "1204",
            "aliases": [
              "Jet d Eau",
              "Palais des Nations",
              "Old Town"
            ]
          }
        ]
      },
      {
        "name": "Lucerne",
        "aliases": [
          "Luzern"
        ],
        "places": [
          {
            "name": "Old Town & Chapel Bridge",
            "postalCode": "6003",
            "aliases": [
              "Kapellbrücke",
              "Lion Monument",
              "Lake Lucerne Pier"
            ]
          }
        ]
      },
      {
        "name": "Interlaken",
        "aliases": [
          "Jungfrau Region"
        ],
        "places": [
          {
            "name": "Interlaken Centre & Höhematte",
            "postalCode": "3800",
            "aliases": [
              "Harder Kulm",
              "Lake Thun",
              "Lake Brienz",
              "Jungfraujoch Gateway"
            ]
          }
        ]
      },
      {
        "name": "Zermatt",
        "aliases": [
          "Matterhorn"
        ],
        "places": [
          {
            "name": "Zermatt Village & Matterhorn View",
            "postalCode": "3920",
            "aliases": [
              "Gornergrat Railway",
              "Sunnegga"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Syria",
    "code": "SY",
    "cities": [
      {
        "name": "Damascus",
        "places": [
          {
            "name": "Umayyad Mosque",
            "postalCode": "00000",
            "aliases": [
              "Umayyad Mosque",
              "Damascus Umayyad Mosque"
            ]
          },
          {
            "name": "Al-Hamidiyah Souq",
            "postalCode": "00000",
            "aliases": [
              "Al-Hamidiyah Souq",
              "Damascus Al-Hamidiyah Souq"
            ]
          },
          {
            "name": "Krak des Chevaliers",
            "postalCode": "00000",
            "aliases": [
              "Krak des Chevaliers",
              "Damascus Krak des Chevaliers"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Taiwan",
    "code": "TW",
    "cities": [
      {
        "name": "Taipei",
        "places": [
          {
            "name": "Taipei 101",
            "postalCode": "100",
            "aliases": [
              "Taipei 101",
              "Taipei Taipei 101"
            ]
          },
          {
            "name": "Shilin Night Market",
            "postalCode": "100",
            "aliases": [
              "Shilin Night Market",
              "Taipei Shilin Night Market"
            ]
          },
          {
            "name": "Jiufen Old Street",
            "postalCode": "100",
            "aliases": [
              "Jiufen Old Street",
              "Taipei Jiufen Old Street"
            ]
          },
          {
            "name": "Taroko Gorge (Hualien)",
            "postalCode": "100",
            "aliases": [
              "Taroko Gorge (Hualien)",
              "Taipei Taroko Gorge (Hualien)"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Tajikistan",
    "code": "TJ",
    "cities": [
      {
        "name": "Dushanbe",
        "places": [
          {
            "name": "Rudaki Park",
            "postalCode": "734000",
            "aliases": [
              "Rudaki Park",
              "Dushanbe Rudaki Park"
            ]
          },
          {
            "name": "Pamir Highway View",
            "postalCode": "734000",
            "aliases": [
              "Pamir Highway View",
              "Dushanbe Pamir Highway View"
            ]
          },
          {
            "name": "National Museum",
            "postalCode": "734000",
            "aliases": [
              "National Museum",
              "Dushanbe National Museum"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Tanzania",
    "code": "TZ",
    "cities": [
      {
        "name": "Dodoma",
        "places": [
          {
            "name": "Zanzibar Stone Town & Nungwi Beach",
            "postalCode": "41101",
            "aliases": [
              "Zanzibar Stone Town & Nungwi Beach",
              "Dodoma Zanzibar Stone Town & Nungwi Beach"
            ]
          },
          {
            "name": "Serengeti Safari Plains",
            "postalCode": "41101",
            "aliases": [
              "Serengeti Safari Plains",
              "Dodoma Serengeti Safari Plains"
            ]
          },
          {
            "name": "Mount Kilimanjaro Base",
            "postalCode": "41101",
            "aliases": [
              "Mount Kilimanjaro Base",
              "Dodoma Mount Kilimanjaro Base"
            ]
          },
          {
            "name": "Dar es Salaam Waterfront",
            "postalCode": "41101",
            "aliases": [
              "Dar es Salaam Waterfront",
              "Dodoma Dar es Salaam Waterfront"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Thailand",
    "code": "TH",
    "cities": [
      {
        "name": "Bangkok",
        "aliases": [
          "BKK"
        ],
        "places": [
          {
            "name": "Rattanakosin & Old City",
            "postalCode": "10200",
            "aliases": [
              "Grand Palace",
              "Wat Phra Kaew",
              "Wat Pho",
              "Khao San Road"
            ]
          },
          {
            "name": "Sukhumvit",
            "postalCode": "10110",
            "aliases": [
              "Asok",
              "Phrom Phong",
              "Thong Lo",
              "Nana"
            ]
          },
          {
            "name": "Siam & Pratunam",
            "postalCode": "10330",
            "aliases": [
              "Siam Paragon",
              "CentralWorld",
              "MBK Center"
            ]
          },
          {
            "name": "Riverside & Chao Phraya",
            "postalCode": "10120",
            "aliases": [
              "Wat Arun",
              "ICONSIAM",
              "Asiatique"
            ]
          },
          {
            "name": "Silom & Sathorn",
            "postalCode": "10500",
            "aliases": [
              "Lumphini Park",
              "Mahanakhon SkyWalk",
              "Patpong"
            ]
          }
        ]
      },
      {
        "name": "Phuket",
        "aliases": [
          "Phuket Island"
        ],
        "places": [
          {
            "name": "Patong Beach",
            "postalCode": "83150",
            "aliases": [
              "Bangla Road",
              "Patong Promenade"
            ]
          },
          {
            "name": "Kata & Karon Beaches",
            "postalCode": "83100",
            "aliases": [
              "Kata Noi",
              "Big Buddha Viewpoint"
            ]
          },
          {
            "name": "Phuket Old Town",
            "postalCode": "83000",
            "aliases": [
              "Thalang Road",
              "Sino-Portuguese Mansions"
            ]
          },
          {
            "name": "Bang Tao & Laguna",
            "postalCode": "83110",
            "aliases": [
              "Catch Beach Club",
              "Luxury Villas"
            ]
          }
        ]
      },
      {
        "name": "Chiang Mai",
        "aliases": [
          "Rose of the North"
        ],
        "places": [
          {
            "name": "Old City & Tha Phae Gate",
            "postalCode": "50200",
            "aliases": [
              "Wat Chedi Luang",
              "Sunday Walking Street"
            ]
          },
          {
            "name": "Nimmanhaemin",
            "postalCode": "50200",
            "aliases": [
              "Nimman Road",
              "Maya Mall",
              "Cafes"
            ]
          },
          {
            "name": "Doi Suthep",
            "postalCode": "50200",
            "aliases": [
              "Wat Phra That Doi Suthep",
              "Mountain View"
            ]
          }
        ]
      },
      {
        "name": "Krabi",
        "aliases": [
          "Ao Nang"
        ],
        "places": [
          {
            "name": "Ao Nang Beach",
            "postalCode": "81180",
            "aliases": [
              "Noppharat Thara",
              "Longtail Boat Pier"
            ]
          },
          {
            "name": "Railay Beach",
            "postalCode": "81000",
            "aliases": [
              "Railay West",
              "Phra Nang Cave Beach"
            ]
          }
        ]
      },
      {
        "name": "Koh Samui",
        "aliases": [
          "Samui"
        ],
        "places": [
          {
            "name": "Chaweng Beach",
            "postalCode": "84320",
            "aliases": [
              "Chaweng Nightlife",
              "Central Samui"
            ]
          },
          {
            "name": "Fisherman’s Village & Bophut",
            "postalCode": "84320",
            "aliases": [
              "Bophut Beach",
              "Night Market"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Timor-Leste",
    "code": "TL",
    "cities": [
      {
        "name": "Dili",
        "places": [
          {
            "name": "Cristo Rei of Dili",
            "postalCode": "0000",
            "aliases": [
              "Cristo Rei of Dili",
              "Dili Cristo Rei of Dili"
            ]
          },
          {
            "name": "Atauro Island",
            "postalCode": "0000",
            "aliases": [
              "Atauro Island",
              "Dili Atauro Island"
            ]
          },
          {
            "name": "Resistance Museum",
            "postalCode": "0000",
            "aliases": [
              "Resistance Museum",
              "Dili Resistance Museum"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Togo",
    "code": "TG",
    "cities": [
      {
        "name": "Lomé",
        "places": [
          {
            "name": "Grand Marché de Lomé",
            "postalCode": "00000",
            "aliases": [
              "Grand Marché de Lomé",
              "Lomé Grand Marché de Lomé"
            ]
          },
          {
            "name": "Lomé Beach Boulevard",
            "postalCode": "00000",
            "aliases": [
              "Lomé Beach Boulevard",
              "Lomé Lomé Beach Boulevard"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Tonga",
    "code": "TO",
    "cities": [
      {
        "name": "Nuku'alofa",
        "places": [
          {
            "name": "Royal Palace",
            "postalCode": "00000",
            "aliases": [
              "Royal Palace",
              "Nuku'alofa Royal Palace"
            ]
          },
          {
            "name": "Mapu a Vaea Blowholes",
            "postalCode": "00000",
            "aliases": [
              "Mapu a Vaea Blowholes",
              "Nuku'alofa Mapu a Vaea Blowholes"
            ]
          },
          {
            "name": "Ha amonga a Maui",
            "postalCode": "00000",
            "aliases": [
              "Ha amonga a Maui",
              "Nuku'alofa Ha amonga a Maui"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Trinidad and Tobago",
    "code": "TT",
    "cities": [
      {
        "name": "Port of Spain",
        "places": [
          {
            "name": "Maracas Beach",
            "postalCode": "00000",
            "aliases": [
              "Maracas Beach",
              "Port of Spain Maracas Beach"
            ]
          },
          {
            "name": "Pigeon Point (Tobago)",
            "postalCode": "00000",
            "aliases": [
              "Pigeon Point (Tobago)",
              "Port of Spain Pigeon Point (Tobago)"
            ]
          },
          {
            "name": "Queen's Park Savannah",
            "postalCode": "00000",
            "aliases": [
              "Queen's Park Savannah",
              "Port of Spain Queen's Park Savannah"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Tunisia",
    "code": "TN",
    "cities": [
      {
        "name": "Tunis",
        "places": [
          {
            "name": "Sidi Bou Said Blue Village",
            "postalCode": "1000",
            "aliases": [
              "Sidi Bou Said Blue Village",
              "Tunis Sidi Bou Said Blue Village"
            ]
          },
          {
            "name": "Carthage Ruins",
            "postalCode": "1000",
            "aliases": [
              "Carthage Ruins",
              "Tunis Carthage Ruins"
            ]
          },
          {
            "name": "Tunis Medina",
            "postalCode": "1000",
            "aliases": [
              "Tunis Medina",
              "Tunis Tunis Medina"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Turkey",
    "code": "TR",
    "cities": [
      {
        "name": "Istanbul",
        "aliases": [
          "Constantinople"
        ],
        "places": [
          {
            "name": "Sultanahmet & Old City",
            "postalCode": "34122",
            "aliases": [
              "Hagia Sophia",
              "Blue Mosque",
              "Topkapi Palace",
              "Grand Bazaar"
            ]
          },
          {
            "name": "Taksim & Beyoglu",
            "postalCode": "34435",
            "aliases": [
              "Istiklal Street",
              "Galata Tower",
              "Galataport"
            ]
          },
          {
            "name": "Kadikoy (Asian Side)",
            "postalCode": "34710",
            "aliases": [
              "Moda Promenade",
              "Kadikoy Market"
            ]
          }
        ]
      },
      {
        "name": "Cappadocia",
        "aliases": [
          "Goreme",
          "Nevsehir"
        ],
        "places": [
          {
            "name": "Goreme Valley & Hot Air Balloons",
            "postalCode": "50180",
            "aliases": [
              "Goreme Open Air Museum",
              "Love Valley",
              "Fairy Chimneys"
            ]
          }
        ]
      },
      {
        "name": "Antalya",
        "aliases": [
          "Turkish Riviera"
        ],
        "places": [
          {
            "name": "Kaleiçi Old Town",
            "postalCode": "07100",
            "aliases": [
              "Hadrian Gate",
              "Old Harbour",
              "Konyaalti Beach"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Turkmenistan",
    "code": "TM",
    "cities": [
      {
        "name": "Ashgabat",
        "places": [
          {
            "name": "Darvaza Gas Crater (Door to Hell)",
            "postalCode": "744000",
            "aliases": [
              "Darvaza Gas Crater (Door to Hell)",
              "Ashgabat Darvaza Gas Crater (Door to Hell)"
            ]
          },
          {
            "name": "White Marble Cityscape",
            "postalCode": "744000",
            "aliases": [
              "White Marble Cityscape",
              "Ashgabat White Marble Cityscape"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Tuvalu",
    "code": "TV",
    "cities": [
      {
        "name": "Funafuti",
        "places": [
          {
            "name": "Funafuti Lagoon Conservation Area",
            "postalCode": "00000",
            "aliases": [
              "Funafuti Lagoon Conservation Area",
              "Funafuti Funafuti Lagoon Conservation Area"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Uganda",
    "code": "UG",
    "cities": [
      {
        "name": "Kampala",
        "places": [
          {
            "name": "Bwindi Impenetrable National Park (Gorillas)",
            "postalCode": "00256",
            "aliases": [
              "Bwindi Impenetrable National Park (Gorillas)",
              "Kampala Bwindi Impenetrable National Park (Gorillas)"
            ]
          },
          {
            "name": "Lake Victoria Waterfront (Entebbe)",
            "postalCode": "00256",
            "aliases": [
              "Lake Victoria Waterfront (Entebbe)",
              "Kampala Lake Victoria Waterfront (Entebbe)"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Ukraine",
    "code": "UA",
    "cities": [
      {
        "name": "Kyiv",
        "places": [
          {
            "name": "Maidan Nezalezhnosti",
            "postalCode": "01001",
            "aliases": [
              "Maidan Nezalezhnosti",
              "Kyiv Maidan Nezalezhnosti"
            ]
          },
          {
            "name": "Saint Sophia Cathedral",
            "postalCode": "01001",
            "aliases": [
              "Saint Sophia Cathedral",
              "Kyiv Saint Sophia Cathedral"
            ]
          },
          {
            "name": "Kyiv Pechersk Lavra",
            "postalCode": "01001",
            "aliases": [
              "Kyiv Pechersk Lavra",
              "Kyiv Kyiv Pechersk Lavra"
            ]
          },
          {
            "name": "Lviv Old Town",
            "postalCode": "01001",
            "aliases": [
              "Lviv Old Town",
              "Kyiv Lviv Old Town"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "United Arab Emirates",
    "code": "AE",
    "cities": [
      {
        "name": "Dubai",
        "aliases": [
          "DXB"
        ],
        "places": [
          {
            "name": "Downtown Dubai",
            "postalCode": "00000",
            "aliases": [
              "Burj Khalifa",
              "Dubai Mall",
              "Dubai Fountain",
              "Opera District"
            ]
          },
          {
            "name": "Dubai Marina",
            "postalCode": "00000",
            "aliases": [
              "JBR",
              "Marina Walk",
              "Bluewaters Island",
              "Ain Dubai"
            ]
          },
          {
            "name": "Palm Jumeirah",
            "postalCode": "00000",
            "aliases": [
              "Atlantis The Palm",
              "The Pointe",
              "Nakheel Mall"
            ]
          },
          {
            "name": "Deira & Gold Souk",
            "postalCode": "00000",
            "aliases": [
              "Spice Souk",
              "Dubai Creek",
              "Al Ras"
            ]
          },
          {
            "name": "Al Fahidi Historic District",
            "postalCode": "00000",
            "aliases": [
              "Bastakiya",
              "Dubai Museum",
              "Meena Bazaar"
            ]
          },
          {
            "name": "Business Bay",
            "postalCode": "00000",
            "aliases": [
              "Dubai Water Canal",
              "Marasi Drive"
            ]
          },
          {
            "name": "Jumeirah",
            "postalCode": "00000",
            "aliases": [
              "Burj Al Arab",
              "Kite Beach",
              "Madinat Jumeirah"
            ]
          }
        ]
      },
      {
        "name": "Abu Dhabi",
        "aliases": [
          "AUH"
        ],
        "places": [
          {
            "name": "Corniche & Emirates Palace",
            "postalCode": "00000",
            "aliases": [
              "Abu Dhabi Corniche",
              "Qasr Al Watan"
            ]
          },
          {
            "name": "Saadiyat Island",
            "postalCode": "00000",
            "aliases": [
              "Louvre Abu Dhabi",
              "Guggenheim",
              "Saadiyat Beach"
            ]
          },
          {
            "name": "Yas Island",
            "postalCode": "00000",
            "aliases": [
              "Ferrari World",
              "Yas Marina Circuit",
              "Yas Mall"
            ]
          },
          {
            "name": "Sheikh Zayed Grand Mosque Area",
            "postalCode": "00000",
            "aliases": [
              "Grand Mosque",
              "Wahat Al Karama"
            ]
          }
        ]
      },
      {
        "name": "Sharjah",
        "aliases": [
          "SHJ"
        ],
        "places": [
          {
            "name": "Al Majaz Waterfront",
            "postalCode": "00000",
            "aliases": [
              "Khalid Lagoon",
              "Al Noor Mosque"
            ]
          },
          {
            "name": "Heart of Sharjah",
            "postalCode": "00000",
            "aliases": [
              "Heritage Area",
              "Souk Al Arsah"
            ]
          }
        ]
      },
      {
        "name": "Ras Al Khaimah",
        "aliases": [
          "RAK"
        ],
        "places": [
          {
            "name": "Jebel Jais",
            "postalCode": "00000",
            "aliases": [
              "Zipline Peak",
              "Viewing Deck Park"
            ]
          },
          {
            "name": "Al Marjan Island",
            "postalCode": "00000",
            "aliases": [
              "Resort Coastline",
              "Marjan Promenade"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "United Kingdom",
    "code": "GB",
    "cities": [
      {
        "name": "London",
        "aliases": [
          "Greater London"
        ],
        "places": [
          {
            "name": "Westminster",
            "postalCode": "SW1A 1AA",
            "aliases": [
              "Big Ben",
              "Buckingham Palace",
              "Houses of Parliament",
              "Westminster Abbey"
            ]
          },
          {
            "name": "Covent Garden & West End",
            "postalCode": "WC2E 8HD",
            "aliases": [
              "Theatreland",
              "Leicester Square",
              "Piccadilly Circus"
            ]
          },
          {
            "name": "City of London & Tower Bridge",
            "postalCode": "EC3N 4AB",
            "aliases": [
              "Tower of London",
              "St Paul Cathedral",
              "The Shard",
              "Sky Garden"
            ]
          },
          {
            "name": "South Bank",
            "postalCode": "SE1 7PB",
            "aliases": [
              "London Eye",
              "Tate Modern",
              "Borough Market"
            ]
          },
          {
            "name": "Kensington & Chelsea",
            "postalCode": "SW7 2AZ",
            "aliases": [
              "Natural History Museum",
              "V&A",
              "Hyde Park",
              "Harrods"
            ]
          },
          {
            "name": "Camden Town",
            "postalCode": "NW1 8QL",
            "aliases": [
              "Camden Lock Market",
              "Regent Canal"
            ]
          },
          {
            "name": "Soho & Mayfair",
            "postalCode": "W1D 3QU",
            "aliases": [
              "Oxford Street",
              "Regent Street",
              "Carnaby Street"
            ]
          }
        ]
      },
      {
        "name": "Edinburgh",
        "aliases": [
          "Scotland Capital"
        ],
        "places": [
          {
            "name": "Old Town & Royal Mile",
            "postalCode": "EH1 2PB",
            "aliases": [
              "Edinburgh Castle",
              "Holyrood Palace",
              "St Giles Cathedral"
            ]
          },
          {
            "name": "New Town & Princes Street",
            "postalCode": "EH2 2EQ",
            "aliases": [
              "Calton Hill",
              "Scott Monument"
            ]
          }
        ]
      },
      {
        "name": "Manchester",
        "aliases": [
          "Greater Manchester"
        ],
        "places": [
          {
            "name": "Northern Quarter & Piccadilly",
            "postalCode": "M1 1RG",
            "aliases": [
              "Afflecks",
              "Manchester Arndale"
            ]
          },
          {
            "name": "Old Trafford Area",
            "postalCode": "M16 0RA",
            "aliases": [
              "Manchester United Stadium",
              "Salford Quays"
            ]
          }
        ]
      },
      {
        "name": "Bath",
        "aliases": [
          "Somerset"
        ],
        "places": [
          {
            "name": "Roman Baths & Abbey",
            "postalCode": "BA1 1LZ",
            "aliases": [
              "The Royal Crescent",
              "Pulteney Bridge"
            ]
          }
        ]
      },
      {
        "name": "Oxford",
        "aliases": [
          "City of Dreaming Spires"
        ],
        "places": [
          {
            "name": "Oxford City Centre & Christ Church",
            "postalCode": "OX1 1DP",
            "aliases": [
              "Bodleian Library",
              "Radcliffe Camera"
            ]
          }
        ]
      },
      {
        "name": "Cambridge",
        "aliases": [
          "Cambridgeshire"
        ],
        "places": [
          {
            "name": "King’s College & River Cam",
            "postalCode": "CB2 1ST",
            "aliases": [
              "The Backs",
              "Punting River"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "United States",
    "code": "US",
    "cities": [
      {
        "name": "New York",
        "aliases": [
          "NYC",
          "New York City",
          "Manhattan"
        ],
        "places": [
          {
            "name": "Midtown Manhattan",
            "postalCode": "10001",
            "aliases": [
              "Times Square",
              "Empire State Building",
              "Broadway"
            ]
          },
          {
            "name": "Lower Manhattan & Financial District",
            "postalCode": "10004",
            "aliases": [
              "Wall Street",
              "Battery Park",
              "One World Observatory",
              "Statue of Liberty Ferry"
            ]
          },
          {
            "name": "Greenwich Village & SoHo",
            "postalCode": "10012",
            "aliases": [
              "Washington Square Park",
              "Cast Iron District"
            ]
          },
          {
            "name": "Upper East Side & Central Park",
            "postalCode": "10021",
            "aliases": [
              "Museum Mile",
              "The Met",
              "Central Park Zoo"
            ]
          },
          {
            "name": "DUMBO & Brooklyn Heights",
            "postalCode": "11201",
            "aliases": [
              "Brooklyn Bridge Park",
              "Jane Carousel"
            ]
          },
          {
            "name": "Williamsburg",
            "postalCode": "11211",
            "aliases": [
              "Bedford Ave",
              "Waterfront Parks"
            ]
          }
        ]
      },
      {
        "name": "Los Angeles",
        "aliases": [
          "LA",
          "City of Angels"
        ],
        "places": [
          {
            "name": "Hollywood",
            "postalCode": "90028",
            "aliases": [
              "Walk of Fame",
              "TCL Chinese Theatre",
              "Hollywood Sign"
            ]
          },
          {
            "name": "Santa Monica",
            "postalCode": "90401",
            "aliases": [
              "Santa Monica Pier",
              "3rd Street Promenade"
            ]
          },
          {
            "name": "Venice Beach",
            "postalCode": "90291",
            "aliases": [
              "Venice Boardwalk",
              "Abbot Kinney Blvd"
            ]
          },
          {
            "name": "Beverly Hills",
            "postalCode": "90210",
            "aliases": [
              "Rodeo Drive",
              "Golden Triangle"
            ]
          }
        ]
      },
      {
        "name": "San Francisco",
        "aliases": [
          "SF",
          "Bay Area"
        ],
        "places": [
          {
            "name": "Fisherman Wharf",
            "postalCode": "94133",
            "aliases": [
              "Pier 39",
              "Ghirardelli Square",
              "Alcatraz Ferry"
            ]
          },
          {
            "name": "Union Square",
            "postalCode": "94102",
            "aliases": [
              "Cable Car Turnaround",
              "Powell Street"
            ]
          },
          {
            "name": "The Presidio & Golden Gate Bridge",
            "postalCode": "94129",
            "aliases": [
              "Crissy Field",
              "Battery Spencer"
            ]
          }
        ]
      },
      {
        "name": "Miami",
        "aliases": [
          "South Florida"
        ],
        "places": [
          {
            "name": "South Beach & Ocean Drive",
            "postalCode": "33139",
            "aliases": [
              "Art Deco Historic District",
              "Lummus Park"
            ]
          },
          {
            "name": "Wynwood",
            "postalCode": "33127",
            "aliases": [
              "Wynwood Walls",
              "Art District"
            ]
          },
          {
            "name": "Brickell & Downtown Miami",
            "postalCode": "33131",
            "aliases": [
              "Brickell City Centre",
              "Bayside Marketplace"
            ]
          }
        ]
      },
      {
        "name": "Las Vegas",
        "aliases": [
          "Vegas",
          "Sin City"
        ],
        "places": [
          {
            "name": "Las Vegas Strip (Central)",
            "postalCode": "89109",
            "aliases": [
              "Bellagio Fountains",
              "Caesars Palace",
              "The Linq"
            ]
          },
          {
            "name": "Downtown & Fremont Street",
            "postalCode": "89101",
            "aliases": [
              "Fremont Street Experience",
              "Mob Museum"
            ]
          }
        ]
      },
      {
        "name": "Honolulu",
        "aliases": [
          "Hawaii",
          "Oahu"
        ],
        "places": [
          {
            "name": "Waikiki Beach",
            "postalCode": "96815",
            "aliases": [
              "Kalakaua Ave",
              "Diamond Head Crater"
            ]
          },
          {
            "name": "Pearl Harbor & Downtown",
            "postalCode": "96818",
            "aliases": [
              "USS Arizona Memorial",
              "Iolani Palace"
            ]
          }
        ]
      },
      {
        "name": "Chicago",
        "aliases": [
          "Windy City"
        ],
        "places": [
          {
            "name": "The Loop & Millennium Park",
            "postalCode": "60601",
            "aliases": [
              "The Bean (Cloud Gate)",
              "Art Institute of Chicago"
            ]
          },
          {
            "name": "Magnificent Mile & River North",
            "postalCode": "60611",
            "aliases": [
              "Michigan Ave",
              "Navy Pier",
              "Wrigley Building"
            ]
          }
        ]
      },
      {
        "name": "Orlando",
        "aliases": [
          "Theme Park Capital"
        ],
        "places": [
          {
            "name": "Bay Lake / Disney Area",
            "postalCode": "32830",
            "aliases": [
              "Magic Kingdom",
              "Epcot",
              "Disney Springs"
            ]
          },
          {
            "name": "Universal Studios Area",
            "postalCode": "32819",
            "aliases": [
              "International Drive",
              "Islands of Adventure"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Uruguay",
    "code": "UY",
    "cities": [
      {
        "name": "Montevideo",
        "places": [
          {
            "name": "Punta del Este Beach Resort",
            "postalCode": "11000",
            "aliases": [
              "Punta del Este Beach Resort",
              "Montevideo Punta del Este Beach Resort"
            ]
          },
          {
            "name": "Ciudad Vieja",
            "postalCode": "11000",
            "aliases": [
              "Ciudad Vieja",
              "Montevideo Ciudad Vieja"
            ]
          },
          {
            "name": "Colonia del Sacramento Cobblestones",
            "postalCode": "11000",
            "aliases": [
              "Colonia del Sacramento Cobblestones",
              "Montevideo Colonia del Sacramento Cobblestones"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Uzbekistan",
    "code": "UZ",
    "cities": [
      {
        "name": "Tashkent",
        "places": [
          {
            "name": "Samarkand Registan Square",
            "postalCode": "100000",
            "aliases": [
              "Samarkand Registan Square",
              "Tashkent Samarkand Registan Square"
            ]
          },
          {
            "name": "Bukhara Old Town",
            "postalCode": "100000",
            "aliases": [
              "Bukhara Old Town",
              "Tashkent Bukhara Old Town"
            ]
          },
          {
            "name": "Khiva Itchan Kala Fortress",
            "postalCode": "100000",
            "aliases": [
              "Khiva Itchan Kala Fortress",
              "Tashkent Khiva Itchan Kala Fortress"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Vanuatu",
    "code": "VU",
    "cities": [
      {
        "name": "Port Vila",
        "places": [
          {
            "name": "Yasur Volcano (Tanna)",
            "postalCode": "00000",
            "aliases": [
              "Yasur Volcano (Tanna)",
              "Port Vila Yasur Volcano (Tanna)"
            ]
          },
          {
            "name": "Mele Cascades",
            "postalCode": "00000",
            "aliases": [
              "Mele Cascades",
              "Port Vila Mele Cascades"
            ]
          },
          {
            "name": "Hideaway Island",
            "postalCode": "00000",
            "aliases": [
              "Hideaway Island",
              "Port Vila Hideaway Island"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Vatican City",
    "code": "VA",
    "cities": [
      {
        "name": "Vatican City",
        "places": [
          {
            "name": "St. Peter’s Basilica",
            "postalCode": "00120",
            "aliases": [
              "St. Peter’s Basilica",
              "Vatican City St. Peter’s Basilica"
            ]
          },
          {
            "name": "Sistine Chapel",
            "postalCode": "00120",
            "aliases": [
              "Sistine Chapel",
              "Vatican City Sistine Chapel"
            ]
          },
          {
            "name": "Vatican Gardens",
            "postalCode": "00120",
            "aliases": [
              "Vatican Gardens",
              "Vatican City Vatican Gardens"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Venezuela",
    "code": "VE",
    "cities": [
      {
        "name": "Caracas",
        "places": [
          {
            "name": "Angel Falls (Canaima)",
            "postalCode": "1010",
            "aliases": [
              "Angel Falls (Canaima)",
              "Caracas Angel Falls (Canaima)"
            ]
          },
          {
            "name": "Los Roques Archipelago",
            "postalCode": "1010",
            "aliases": [
              "Los Roques Archipelago",
              "Caracas Los Roques Archipelago"
            ]
          },
          {
            "name": "Avila Cable Car",
            "postalCode": "1010",
            "aliases": [
              "Avila Cable Car",
              "Caracas Avila Cable Car"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Vietnam",
    "code": "VN",
    "cities": [
      {
        "name": "Hanoi",
        "aliases": [
          "Capital of Vietnam"
        ],
        "places": [
          {
            "name": "Old Quarter & Hoan Kiem Lake",
            "postalCode": "100000",
            "aliases": [
              "Ngoc Son Temple",
              "Ta Hien Beer Street",
              "Water Puppet Theatre"
            ]
          }
        ]
      },
      {
        "name": "Ho Chi Minh City",
        "aliases": [
          "Saigon",
          "HCMC"
        ],
        "places": [
          {
            "name": "District 1 & Ben Thanh",
            "postalCode": "700000",
            "aliases": [
              "Ben Thanh Market",
              "Notre Dame Cathedral of Saigon",
              "War Remnants Museum"
            ]
          }
        ]
      },
      {
        "name": "Da Nang & Hoi An",
        "aliases": [
          "Central Vietnam"
        ],
        "places": [
          {
            "name": "Hoi An Ancient Town",
            "postalCode": "560000",
            "aliases": [
              "Japanese Covered Bridge",
              "Lantern Market",
              "An Bang Beach"
            ]
          },
          {
            "name": "Ba Na Hills & Golden Bridge",
            "postalCode": "550000",
            "aliases": [
              "Hand Bridge",
              "My Khe Beach"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Yemen",
    "code": "YE",
    "cities": [
      {
        "name": "Sana'a",
        "places": [
          {
            "name": "Old City of Sana'a",
            "postalCode": "00000",
            "aliases": [
              "Old City of Sana'a",
              "Sana'a Old City of Sana'a"
            ]
          },
          {
            "name": "Socotra Island Dragon Blood Trees",
            "postalCode": "00000",
            "aliases": [
              "Socotra Island Dragon Blood Trees",
              "Sana'a Socotra Island Dragon Blood Trees"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Zambia",
    "code": "ZM",
    "cities": [
      {
        "name": "Lusaka",
        "places": [
          {
            "name": "Victoria Falls (Livingstone)",
            "postalCode": "10101",
            "aliases": [
              "Victoria Falls (Livingstone)",
              "Lusaka Victoria Falls (Livingstone)"
            ]
          },
          {
            "name": "Devil’s Pool",
            "postalCode": "10101",
            "aliases": [
              "Devil’s Pool",
              "Lusaka Devil’s Pool"
            ]
          },
          {
            "name": "South Luangwa Safari",
            "postalCode": "10101",
            "aliases": [
              "South Luangwa Safari",
              "Lusaka South Luangwa Safari"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Zimbabwe",
    "code": "ZW",
    "cities": [
      {
        "name": "Harare",
        "places": [
          {
            "name": "Victoria Falls Rainforest View",
            "postalCode": "00263",
            "aliases": [
              "Victoria Falls Rainforest View",
              "Harare Victoria Falls Rainforest View"
            ]
          },
          {
            "name": "Hwange National Park",
            "postalCode": "00263",
            "aliases": [
              "Hwange National Park",
              "Harare Hwange National Park"
            ]
          },
          {
            "name": "Great Zimbabwe Ruins",
            "postalCode": "00263",
            "aliases": [
              "Great Zimbabwe Ruins",
              "Harare Great Zimbabwe Ruins"
            ]
          }
        ]
      }
    ]
  }
];

/**
 * Returns all country names in alphabetical order.
 */
export function getAllCountries(): string[] {
  return GEO_DATABASE.map(c => c.name);
}

/**
 * Returns the list of top popular travel destination countries.
 */
export function getPopularCountries(): string[] {
  return POPULAR_COUNTRIES;
}

/**
 * Returns all destination cities for a given country name.
 */
export function getCitiesByCountry(countryName: string): string[] {
  const country = GEO_DATABASE.find(c => c.name.toLowerCase() === countryName.toLowerCase());
  if (!country) return [];
  return country.cities.map(city => city.name);
}

/**
 * Returns all places / neighborhoods for a given city and country.
 */
export function getPlacesByCity(countryName: string, cityName: string): GeoPlace[] {
  const country = GEO_DATABASE.find(c => c.name.toLowerCase() === countryName.toLowerCase());
  if (!country) return [];
  const city = country.cities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
  return city ? city.places : [];
}

/**
 * Find location by exact or prefix/substring Postal Code.
 * E.g. "682001" -> Fort Kochi, Kochi, India
 * E.g. "10001" -> Midtown Manhattan, New York, United States
 * E.g. "75001" -> Louvre, Paris, France
 */
export function findLocationByPostalCode(code: string): LocationMatch | null {
  const cleanCode = code.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!cleanCode || cleanCode.length < 3) return null;

  // 1. Exact match first
  for (const country of GEO_DATABASE) {
    for (const city of country.cities) {
      for (const place of city.places) {
        const placeCodeClean = place.postalCode.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (placeCodeClean === cleanCode) {
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

  // 2. Substring match
  for (const country of GEO_DATABASE) {
    for (const city of country.cities) {
      for (const place of city.places) {
        const placeCodeClean = place.postalCode.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (placeCodeClean !== '00000' && (placeCodeClean.includes(cleanCode) || cleanCode.includes(placeCodeClean))) {
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

  // 1. Exact place name match
  for (const country of GEO_DATABASE) {
    for (const city of country.cities) {
      for (const place of city.places) {
        if (place.name.toLowerCase() === cleanQuery) {
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

  // 2. Exact alias match
  for (const country of GEO_DATABASE) {
    for (const city of country.cities) {
      for (const place of city.places) {
        if (place.aliases && place.aliases.some(a => a.toLowerCase() === cleanQuery)) {
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

  // 3. Substring match
  for (const country of GEO_DATABASE) {
    for (const city of country.cities) {
      for (const place of city.places) {
        if (
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
 * Can be a Postal Code / PIN, Place / Neighborhood, City, or Country.
 */
export function autoDetectLocation(input: string): LocationMatch | null {
  if (!input || !input.trim()) return null;
  const trimmed = input.trim();

  // 1. Try postal code lookup first if digits or code format
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
        (city.aliases && city.aliases.some(a => a.toLowerCase() === trimmed.toLowerCase())) ||
        city.name.toLowerCase().includes(trimmed.toLowerCase())
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

  // 4. Try country lookup
  for (const country of GEO_DATABASE) {
    if (country.name.toLowerCase() === trimmed.toLowerCase()) {
      const firstCity = country.cities[0];
      const firstPlace = firstCity ? firstCity.places[0] : null;
      return {
        country: country.name,
        city: firstCity ? firstCity.name : '',
        place: firstPlace ? firstPlace.name : '',
        postalCode: firstPlace ? firstPlace.postalCode : ''
      };
    }
  }

  return null;
}
