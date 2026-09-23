import type { TripPlan } from '../types';

/**
 * Universal Cross-Device Plan URL Serializer
 * Encodes the plan object into a URL-safe base64 string
 */
export function encodePlanToDataString(plan: TripPlan): string {
  try {
    const json = JSON.stringify(plan);
    // Unicode-safe base64 encoding
    const utf8Bytes = new TextEncoder().encode(json);
    let binary = '';
    for (let i = 0; i < utf8Bytes.length; i++) {
      binary += String.fromCharCode(utf8Bytes[i]);
    }
    return encodeURIComponent(btoa(binary));
  } catch (err) {
    console.error('Error encoding plan:', err);
    return '';
  }
}

/**
 * Decodes plan object from URL-safe base64 string
 */
export function decodePlanFromDataString(dataStr: string): TripPlan | null {
  try {
    const binary = atob(decodeURIComponent(dataStr));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json) as TripPlan;
  } catch (err) {
    console.error('Error decoding plan:', err);
    return null;
  }
}

/**
 * Generates the full shareable URL for a plan
 */
export function generateShareablePlanUrl(plan: TripPlan): string {
  const origin = window.location.origin;
  const pathname = window.location.pathname.endsWith('/') 
    ? window.location.pathname 
    : window.location.pathname + '/';
  
  const basePath = `${origin}${pathname}#/plan/${encodeURIComponent(plan.id)}`;
  const data = encodePlanToDataString(plan);

  return data ? `${basePath}?data=${data}` : basePath;
}

/**
 * Copies the shareable plan URL to the user's clipboard
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
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    return url;
  } catch (err) {
    console.warn('Clipboard write failed, returning URL directly:', err);
    return url;
  }
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
          // Trigger print dialog automatically after styles render
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
