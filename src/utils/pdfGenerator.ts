import type { TripPlan, Service } from '../types';

/**
 * Compact Plan Serializer for Ultra-Short, Universal Shareable Links
 */
export function compressPlanToUrlParam(plan: TripPlan): string {
  try {
    const compact = {
      i: plan.id,
      n: plan.name,
      d: plan.destination || plan.city || 'Custom',
      c: plan.city || plan.destination,
      s: plan.startDate,
      e: plan.endDate,
      m: plan.transportMode,
      tc: plan.travelersCount,
      x: plan.totalExpenses,
      img: plan.coverImage,
      notes: plan.notes,
      days: (plan.itinerary || []).map(day => ({
        num: day.dayNumber,
        title: day.title,
        routeMap: day.routeMapUrl,
        dist: day.totalDistanceKm,
        driveMin: day.totalDriveMinutes,
        startLoc: day.startLocationName,
        startTime: day.startTime,
        items: (day.items || []).map(it => ({
          sid: it.serviceId,
          loc: it.location,
          time: it.time,
          typ: it.type,
          cost: it.cost,
          img: it.imageUrl,
          map: it.googleMapUrl,
          tip: it.eventTip,
          badge: it.idealTimingBadge,
          desc: it.description ? it.description.slice(0, 160) : undefined,
          transit: it.transitFromPrevious ? {
            km: it.transitFromPrevious.distanceKm,
            min: it.transitFromPrevious.durationMinutes,
            from: it.transitFromPrevious.fromName
          } : undefined
        }))
      }))
    };

    const json = JSON.stringify(compact);
    // Standard URL-safe Base64
    const utf8Bytes = new TextEncoder().encode(json);
    let binary = '';
    for (let i = 0; i < utf8Bytes.length; i++) {
      binary += String.fromCharCode(utf8Bytes[i]);
    }
    const base64 = btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    return base64;
  } catch (err) {
    console.error('Error compressing plan:', err);
    return '';
  }
}

/**
 * Decompresses Plan from URL parameter
 */
export function decompressPlanFromUrlParam(paramStr: string, availableServices: Service[] = []): TripPlan | null {
  try {
    let cleanStr = paramStr.trim();
    try {
      cleanStr = decodeURIComponent(cleanStr);
    } catch {
      // Keep cleanStr as is
    }

    // Direct JSON fallback for backwards compatibility
    if (cleanStr.startsWith('{') && cleanStr.endsWith('}')) {
      try {
        const rawObj = JSON.parse(cleanStr);
        if (rawObj.itinerary) return rawObj as TripPlan;
      } catch {
        // continue with base64
      }
    }

    let base64 = cleanStr.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const json = new TextDecoder().decode(bytes);
    const compact = JSON.parse(json);

    // Service map for fast hydration
    const serviceMap = new Map<string, Service>();
    availableServices.forEach(s => serviceMap.set(s.id, s));

    const itinerary = (compact.days || []).map((d: any) => ({
      id: `day_${d.num || 1}_${Date.now()}`,
      dayNumber: d.num || 1,
      title: d.title || `Day ${d.num || 1}`,
      routeMapUrl: d.routeMap,
      totalDistanceKm: d.dist,
      totalDriveMinutes: d.driveMin,
      startLocationName: d.startLoc,
      startTime: d.startTime,
      isOptimizedRoute: !!d.routeMap,
      items: (d.items || []).map((it: any) => {
        const refService = it.sid ? serviceMap.get(it.sid) : undefined;
        const nameService = !refService && it.loc 
          ? availableServices.find(s => s.name && s.name.toLowerCase() === it.loc.toLowerCase()) 
          : undefined;
        const matched = refService || nameService;

        return {
          id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          time: it.time || '09:00 AM',
          location: it.loc || matched?.name || 'Sightseeing Spot',
          description: it.desc || matched?.description || '',
          type: it.typ || matched?.type || 'spot',
          visited: false,
          cost: it.cost !== undefined ? it.cost : (matched?.pricePerDay || 0),
          googleMapUrl: it.map || matched?.googleMapUrl,
          imageUrl: it.img || matched?.images?.[0] || 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80',
          serviceId: it.sid || matched?.id,
          eventTip: it.tip,
          idealTimingBadge: it.badge,
          transitFromPrevious: it.transit ? {
            distanceKm: it.transit.km,
            durationMinutes: it.transit.min,
            fromName: it.transit.from || 'Previous Stop',
            toName: it.loc
          } : undefined
        };
      })
    }));

    return {
      id: compact.i || `plan_${Date.now()}`,
      travelerId: 'traveler1',
      name: compact.n || 'Custom Trip Itinerary',
      destination: compact.d || 'Goa',
      city: compact.c || compact.d || 'Goa',
      startDate: compact.s || new Date().toISOString().split('T')[0],
      endDate: compact.e || new Date().toISOString().split('T')[0],
      transportMode: compact.m || 'rental',
      travelersCount: compact.tc || 2,
      status: 'planned',
      itinerary,
      totalExpenses: compact.x || 0,
      rewardPointsEarned: Math.round((compact.x || 0) / 100),
      coverImage: compact.img || itinerary[0]?.items?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
      notes: compact.notes || 'Shared travel itinerary with verified spots & driving route.'
    };
  } catch (err) {
    console.error('Error decompressing plan from URL param:', err);
    return null;
  }
}

/**
 * Backwards compatibility helper for decoding plans
 */
export function decodePlanFromDataString(dataStr: string, availableServices: Service[] = []): TripPlan | null {
  return decompressPlanFromUrlParam(dataStr, availableServices);
}

/**
 * Generates the clean shareable URL for any plan
 */
export function generateShareablePlanUrl(plan: TripPlan): string {
  const origin = window.location.origin;
  const pathname = window.location.pathname.replace(/index\.html$/, '').replace(/\/$/, '');
  const compressed = compressPlanToUrlParam(plan);

  // Link format: https://carryint.github.io/PlanTriper/#/plan/plan_xxx?p=...
  if (compressed) {
    return `${origin}${pathname}/#/plan/${encodeURIComponent(plan.id)}?p=${compressed}`;
  }
  return `${origin}${pathname}/#/plan/${encodeURIComponent(plan.id)}`;
}

/**
 * Copies the shareable plan URL to the clipboard
 */
export async function copyPlanShareLink(plan: TripPlan): Promise<string> {
  const url = generateShareablePlanUrl(plan);
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(url);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  } catch (err) {
    console.warn('Clipboard write fallback error:', err);
  }
  return url;
}

/**
 * Generates a clean, professional, printable itinerary document and triggers browser Print-to-PDF
 */
export function downloadPlanAsPdf(plan: TripPlan) {
  const printWindow = window.open('', '_blank', 'width=900,height=800');
  if (!printWindow) {
    alert('Please allow popups for PlanTriper to download/print your PDF itinerary.');
    return;
  }

  const daysHtml = (plan.itinerary || []).map((day) => {
    const itemsHtml = (day.items || []).map((item) => {
      const transitHtml = item.transitFromPrevious ? `
        <div style="padding: 6px 12px; margin: 6px 0 10px 0; background-color: #ecfdf5; border-left: 3px solid #10b981; font-size: 11px; color: #065f46; font-weight: 600;">
          🚗 <strong>${item.transitFromPrevious.distanceKm} km</strong> &bull; ~${item.transitFromPrevious.durationMinutes} mins drive from ${item.transitFromPrevious.fromName.split('(')[0].trim()}
        </div>
      ` : '';

      const tipHtml = item.eventTip ? `
        <div style="margin-top: 6px; padding: 6px 10px; background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 6px; font-size: 11px; color: #92400e;">
          💡 <strong>Tip &amp; Events:</strong> ${item.eventTip}
        </div>
      ` : '';

      const mapLinkHtml = item.googleMapUrl ? `
        <div style="margin-top: 6px;">
          <a href="${item.googleMapUrl}" target="_blank" style="color: #2563eb; text-decoration: none; font-size: 11px; font-weight: bold;">
            📍 Open in Google Maps &rarr;
          </a>
        </div>
      ` : '';

      return `
        <div style="margin-bottom: 16px; padding: 14px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; page-break-inside: avoid;">
          ${transitHtml}
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <span style="display: inline-block; background-color: #eff6ff; color: #1d4ed8; font-weight: bold; font-size: 11px; padding: 3px 8px; border-radius: 6px; margin-bottom: 4px;">
                ⏰ ${item.time}
              </span>
              <h4 style="margin: 4px 0 2px 0; font-size: 14px; font-weight: 700; color: #0f172a;">
                ${item.location}
              </h4>
              <span style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 600;">
                Category: ${item.type}
              </span>
            </div>
            <div style="text-align: right;">
              <span style="font-size: 13px; font-weight: 700; color: #0f172a;">
                ${item.cost ? `₹${item.cost.toLocaleString()}` : 'Free Entry'}
              </span>
            </div>
          </div>
          <p style="margin: 8px 0 4px 0; font-size: 12px; color: #334155; line-height: 1.5;">
            ${item.description || ''}
          </p>
          ${tipHtml}
          ${mapLinkHtml}
        </div>
      `;
    }).join('');

    const routeNavBanner = day.routeMapUrl ? `
      <div style="margin-bottom: 14px; padding: 10px 14px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; font-size: 12px; color: #166534; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong>🗺️ Day Route Navigation:</strong> ${day.totalDistanceKm ? `${day.totalDistanceKm} km` : ''} ${day.totalDriveMinutes ? `(~${day.totalDriveMinutes} mins drive)` : ''}
        </div>
        <a href="${day.routeMapUrl}" target="_blank" style="color: #15803d; font-weight: bold; text-decoration: underline;">
          Open Turn-by-Turn Route in Google Maps &rarr;
        </a>
      </div>
    ` : '';

    return `
      <div style="margin-bottom: 28px; page-break-inside: avoid;">
        <div style="padding-bottom: 8px; margin-bottom: 12px; border-bottom: 2px solid #2563eb; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0; font-size: 16px; font-weight: 800; color: #1e293b;">
            ${day.title || `Day ${day.dayNumber}`}
          </h3>
          <span style="font-size: 12px; font-weight: 600; color: #64748b;">
            ${day.items.length} Activities Planned
          </span>
        </div>
        ${routeNavBanner}
        ${itemsHtml}
      </div>
    `;
  }).join('');

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${plan.name} - PlanTriper Itinerary</title>
      <style>
        @page {
          size: A4;
          margin: 15mm 15mm 15mm 15mm;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          margin: 0;
          padding: 24px;
          color: #0f172a;
          background-color: #f8fafc;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .container {
          max-width: 820px;
          margin: 0 auto;
          background: #ffffff;
          padding: 32px;
          border-radius: 16px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        @media print {
          body {
            background-color: #ffffff;
            padding: 0;
          }
          .container {
            box-shadow: none;
            padding: 0;
          }
          .no-print {
            display: none !important;
          }
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 20px;
          border-bottom: 1px solid #e2e8f0;
          margin-bottom: 24px;
        }
        .brand {
          font-size: 22px;
          font-weight: 900;
          color: #2563eb;
          letter-spacing: -0.5px;
        }
        .brand span {
          color: #7c3aed;
        }
        .hero-banner {
          background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
          color: #ffffff;
          padding: 24px;
          border-radius: 12px;
          margin-bottom: 24px;
        }
        .meta-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          background: #f1f5f9;
          padding: 14px;
          border-radius: 10px;
          margin-bottom: 24px;
        }
        .meta-item span {
          display: block;
          font-size: 10px;
          text-transform: uppercase;
          font-weight: 700;
          color: #64748b;
        }
        .meta-item strong {
          display: block;
          font-size: 13px;
          color: #0f172a;
          margin-top: 2px;
        }
        .footer {
          margin-top: 36px;
          padding-top: 16px;
          border-top: 1px solid #e2e8f0;
          text-align: center;
          font-size: 11px;
          color: #94a3b8;
        }
        .print-btn {
          background: #2563eb;
          color: #ffffff;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          margin-bottom: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="no-print" style="text-align: right;">
          <button class="print-btn" onclick="window.print()">📥 Print / Save as PDF</button>
        </div>

        <div class="header">
          <div class="brand">Plan<span>Triper</span></div>
          <div style="font-size: 11px; color: #64748b; text-align: right;">
            Official Travel Itinerary &bull; Created ${new Date().toLocaleDateString()}
          </div>
        </div>

        <div class="hero-banner">
          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #93c5fd; font-weight: 700;">
            📍 ${plan.destination || plan.city || 'Custom Destination'}
          </span>
          <h1 style="margin: 6px 0 8px 0; font-size: 26px; font-weight: 900;">
            ${plan.name}
          </h1>
          <p style="margin: 0; font-size: 12px; color: #e0e7ff; line-height: 1.4;">
            ${plan.notes || `Tailored custom travel itinerary with verified spots & arranged route map.`}
          </p>
        </div>

        <div class="meta-grid">
          <div class="meta-item">
            <span>Duration</span>
            <strong>${plan.itinerary?.length || 1} Day(s)</strong>
          </div>
          <div class="meta-item">
            <span>Travelers</span>
            <strong>${plan.travelersCount || 2} Person(s)</strong>
          </div>
          <div class="meta-item">
            <span>Transport</span>
            <strong style="text-transform: capitalize;">${plan.transportMode || 'Rental'}</strong>
          </div>
          <div class="meta-item">
            <span>Total Budget</span>
            <strong style="color: #15803d;">₹${(plan.totalExpenses || 0).toLocaleString()}</strong>
          </div>
        </div>

        <!-- Schedule Days -->
        ${daysHtml}

        <div class="footer">
          Generated with PlanTriper &bull; Explore, Plan & Discover Destinations at <a href="https://carryint.github.io/PlanTriper/" target="_blank" style="color: #2563eb;">carryint.github.io/PlanTriper</a>
        </div>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 400);
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
