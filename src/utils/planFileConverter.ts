import type { TripPlan, ItineraryDay, ItineraryItem } from '../types';

export interface ConvertedPlanResult {
  plan: TripPlan;
  rawTextPreview: string;
  extractedLinksCount: number;
  extractedDaysCount: number;
  extractedCostTotal: number;
}

/**
 * Intelligent parser that converts raw text / documents (PDF, Word, TXT, ZIP notes)
 * into a structured PlanTriper TripPlan.
 */
export function convertTextToTripPlan(
  rawContent: string,
  fileName: string,
  fileType: 'pdf' | 'docx' | 'zip' | 'text' | 'manual',
  overrideDestination?: string,
  coverImageUrl?: string
): ConvertedPlanResult {
  const lines = rawContent.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  // Heuristic: Destination detection
  const destinationKeywords = [
    'Bali', 'Manali', 'Dubai', 'Kerala', 'Goa', 'Paris', 'Tokyo', 'Rome', 
    'London', 'New York', 'Maldives', 'Thailand', 'Shimla', 'Jaipur', 'Varanasi',
    'Kashmir', 'Ladakh', 'Ooty', 'Singapore', 'Amsterdam', 'Barcelona', 'Cairo'
  ];

  let detectedDestination = overrideDestination || 'Bali';
  if (!overrideDestination) {
    for (const kw of destinationKeywords) {
      if (rawContent.toLowerCase().includes(kw.toLowerCase())) {
        detectedDestination = kw;
        break;
      }
    }
  }

  // Heuristic: Extract Title
  let tripTitle = `${detectedDestination} Curated Exploration`;
  const firstNonEmptyLine = lines[0];
  if (firstNonEmptyLine && firstNonEmptyLine.length < 80 && !firstNonEmptyLine.toLowerCase().startsWith('day')) {
    tripTitle = firstNonEmptyLine.replace(/^[#*_\s]+/, '').replace(/[#*_\s]+$/, '');
  }

  // Extract external URLs
  const urlRegex = /(https?:\/\/[^\s"'<>)]+)/gi;
  const allUrls = rawContent.match(urlRegex) || [];

  // Parse Days & Items
  const days: ItineraryDay[] = [];
  let currentDay: ItineraryDay | null = null;
  let dayIndex = 1;
  let totalCost = 0;

  // Common time regex patterns
  const timeRegex = /(\b\d{1,2}(?::\d{2})?\s*(?:am|pm|AM|PM)\b|\bMorning\b|\bAfternoon\b|\bEvening\b|\bNight\b)/i;
  // Cost regex patterns (₹ or $ or INR or RS)
  const costRegex = /(?:₹|rs\.?|inr|\$)\s*([\d,]+)/i;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if line is a Day Header (e.g., "Day 1", "Day 2: North Goa", "Day 01 - Denpasar")
    const dayMatch = line.match(/^#*\s*Day\s*(\d+)[:\s-]*(.*)/i);
    if (dayMatch) {
      if (currentDay && currentDay.items.length > 0) {
        days.push(currentDay);
      }
      const dayNum = parseInt(dayMatch[1], 10) || dayIndex;
      const dayTitle = dayMatch[2]?.trim() || `Exploring ${detectedDestination} - Highlights`;
      
      currentDay = {
        id: `day_${dayNum}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        dayNumber: dayNum,
        title: dayTitle,
        items: []
      };
      dayIndex = dayNum + 1;
      continue;
    }

    // If no day started yet, start Day 1
    if (!currentDay) {
      currentDay = {
        id: `day_1_${Date.now()}`,
        dayNumber: 1,
        title: `Arrival & ${detectedDestination} Orientation`,
        items: []
      };
    }

    // Check for item lines (e.g. Bullet points, time stamps, activities)
    if (line.startsWith('-') || line.startsWith('*') || line.match(/^\d+[\.\)]/) || timeRegex.test(line)) {
      const cleanLine = line.replace(/^[-*•\d\.\)]+\s*/, '').trim();
      if (!cleanLine) continue;

      // Extract time if present
      const timeMatch = cleanLine.match(timeRegex);
      const timeStr = timeMatch ? timeMatch[0].toUpperCase() : `${9 + (currentDay.items.length * 3)}:00 AM`;

      // Extract cost if present
      const costMatch = cleanLine.match(costRegex);
      const costValue = costMatch ? parseInt(costMatch[1].replace(/,/g, ''), 10) : 500;
      totalCost += costValue;

      // Extract item url if present
      const itemUrlMatch = cleanLine.match(urlRegex);
      const bookingUrl = itemUrlMatch ? itemUrlMatch[0] : undefined;

      // Determine category type
      const lower = cleanLine.toLowerCase();
      let itemType: 'spot' | 'restaurant' | 'rental' | 'hotel' | 'transit' = 'spot';
      if (lower.includes('hotel') || lower.includes('resort') || lower.includes('stay') || lower.includes('check-in') || lower.includes('villa')) {
        itemType = 'hotel';
      } else if (lower.includes('restaurant') || lower.includes('lunch') || lower.includes('dinner') || lower.includes('breakfast') || lower.includes('food') || lower.includes('cafe')) {
        itemType = 'restaurant';
      } else if (lower.includes('rental') || lower.includes('bike') || lower.includes('car') || lower.includes('scooter') || lower.includes('taxi') || lower.includes('cab')) {
        itemType = 'rental';
      } else if (lower.includes('station') || lower.includes('airport') || lower.includes('flight') || lower.includes('arrival') || lower.includes('departure') || lower.includes('train')) {
        itemType = 'transit';
      }

      // Split location and description
      const parts = cleanLine.split(/[:–—]/);
      const location = parts[0]?.trim().slice(0, 45) || `${detectedDestination} Landmark`;
      const description = parts[1]?.trim() || cleanLine;

      const item: ItineraryItem = {
        id: `item_${currentDay.dayNumber}_${currentDay.items.length + 1}_${Date.now()}`,
        time: timeStr,
        location,
        description,
        type: itemType,
        visited: false,
        cost: costValue,
        bookingUrl
      };

      currentDay.items.push(item);
    }
  }

  // Push last day
  if (currentDay && currentDay.items.length > 0) {
    days.push(currentDay);
  }

  // Fallback if no days were structured
  if (days.length === 0) {
    days.push({
      id: `day_1_${Date.now()}`,
      dayNumber: 1,
      title: `Complete ${detectedDestination} Experience`,
      items: [
        {
          id: `item_fallback_1`,
          time: '09:00 AM',
          location: `${detectedDestination} Central Station / Arrival`,
          description: `Arrival in ${detectedDestination}. Check in to hotel, settle in and enjoy welcome tea.`,
          type: 'transit',
          visited: false,
          cost: 1500
        },
        {
          id: `item_fallback_2`,
          time: '01:00 PM',
          location: `${detectedDestination} Authentic Cuisine Bistro`,
          description: `Taste local food favorites and relax by the view.`,
          type: 'restaurant',
          visited: false,
          cost: 1200
        },
        {
          id: `item_fallback_3`,
          time: '04:30 PM',
          location: `${detectedDestination} Scenic Sunset Panorama`,
          description: `Explore popular spots and historic streets.`,
          type: 'spot',
          visited: false,
          cost: 400
        }
      ]
    });
    totalCost = 3100;
  }

  const today = new Date();
  const startDate = today.toISOString().split('T')[0];
  const endDateObj = new Date(today);
  endDateObj.setDate(today.getDate() + (days.length || 2));
  const endDate = endDateObj.toISOString().split('T')[0];

  const defaultCover = coverImageUrl || 
    (detectedDestination.toLowerCase().includes('bali') ? 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80'
    : detectedDestination.toLowerCase().includes('manali') ? 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80'
    : detectedDestination.toLowerCase().includes('dubai') ? 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80'
    : detectedDestination.toLowerCase().includes('kerala') ? 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80'
    : detectedDestination.toLowerCase().includes('goa') ? 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80'
    : 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80');

  const finalPlan: TripPlan = {
    id: `plan_upload_${Date.now()}`,
    travelerId: 'admin_curated',
    name: tripTitle,
    destination: detectedDestination,
    startDate,
    endDate,
    transportMode: 'flight',
    travelersCount: 2,
    status: 'planned',
    itinerary: days,
    totalExpenses: totalCost,
    rewardPointsEarned: Math.round(totalCost / 100),
    coverImage: defaultCover,
    sourceFile: fileName,
    sourceFileType: fileType,
    isCuratedByAdmin: true,
    notes: `Imported and structured from file "${fileName}" (${fileType.toUpperCase()}) with ${allUrls.length} links and ${days.length} days.`
  };

  return {
    plan: finalPlan,
    rawTextPreview: rawContent.slice(0, 500) + (rawContent.length > 500 ? '...' : ''),
    extractedLinksCount: allUrls.length,
    extractedDaysCount: days.length,
    extractedCostTotal: totalCost
  };
}
