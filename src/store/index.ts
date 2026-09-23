import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AppTheme, Service, TripPlan, Destination, AdBanner, ShareLink } from '../types';
import { seedDestinations, seedServices, seedPlans, seedAds, seedShareLinks, seedUsers } from '../data/seed';

interface AppState {
  currentUser: User | null;
  theme: AppTheme;
  destinations: Destination[];
  services: Service[];
  plans: TripPlan[];
  adBanners: AdBanner[];
  shareLinks: ShareLink[];
  
  // Auth & Roles
  login: (user: User) => void;
  logout: () => void;
  
  // Theme & Branding
  setTheme: (themeUpdates: Partial<AppTheme>) => void;
  
  // Destinations
  addDestination: (dest: Destination) => void;
  deleteDestination: (id: string) => void;
  
  // Services, Places & Spots (Hotels, Shops, Bike Rentals, Beaches, Churches, Spots)
  addService: (service: Service) => void;
  updateServiceStatus: (id: string, status: 'approved' | 'rejected') => void;
  toggleFeaturedService: (id: string) => void;
  deleteService: (id: string) => void;
  
  // Plans
  addPlan: (plan: TripPlan) => void;
  updatePlan: (id: string, updates: Partial<TripPlan>) => void;
  toggleItemVisited: (planId: string, dayId: string, itemId: string) => void;
  deletePlan: (id: string) => void;
  
  // Ads & Promotions
  addAdBanner: (ad: AdBanner) => void;
  toggleAdBanner: (id: string) => void;
  deleteAdBanner: (id: string) => void;
  
  // Share Links
  addShareLink: (link: ShareLink) => void;
  incrementLinkClicks: (code: string) => void;
  deleteShareLink: (id: string) => void;
  
  // Reset
  resetAll: () => void;
}

export const defaultTheme: AppTheme = {
  appName: 'PlanTriper',
  tagline: 'Plan Your Route & Discover Destinations Easily',
  primaryColor: '#2563eb',
  gradientStart: '#1d4ed8',
  gradientEnd: '#7c3aed',
  gradientDirection: 'to right',
  logoUrl: '',
  customAdsEnabled: true,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentUser: seedUsers[0],
      theme: defaultTheme,
      destinations: seedDestinations,
      services: seedServices,
      plans: seedPlans,
      adBanners: seedAds,
      shareLinks: seedShareLinks,
      
      login: (user) => set({ currentUser: user }),
      logout: () => set({ currentUser: null }),
      
      setTheme: (themeUpdates) => set((state) => ({ 
        theme: { ...(state.theme || defaultTheme), ...themeUpdates } 
      })),

      addDestination: (dest) => set((state) => ({
        destinations: [...(state.destinations || []).filter(d => d.name.toLowerCase() !== dest.name.toLowerCase()), dest]
      })),

      deleteDestination: (id) => set((state) => ({
        destinations: (state.destinations || []).filter((d) => d.id !== id)
      })),
      
      addService: (service) => set((state) => {
        // Auto-create destination for the city if not present
        const cityName = service.city?.trim() || service.destination?.trim() || 'New City';
        const existingDest = (state.destinations || []).find(d => d.name.toLowerCase() === cityName.toLowerCase());
        let updatedDestinations = state.destinations || [];
        
        if (!existingDest && cityName) {
          const newDest: Destination = {
            id: `dest_${Date.now()}`,
            name: cityName,
            country: service.country || 'Global',
            tagline: `Explore verified hotels, shops, rentals, and spots in ${cityName}`,
            image: service.images[0] || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
            category: service.type === 'beach' ? 'Beach' : service.type === 'church' ? 'Heritage' : 'City',
            popularSpotsCount: 1
          };
          updatedDestinations = [...updatedDestinations, newDest];
        } else if (existingDest) {
          updatedDestinations = updatedDestinations.map(d => 
            d.name.toLowerCase() === cityName.toLowerCase() 
              ? { ...d, popularSpotsCount: (d.popularSpotsCount || 0) + 1 } 
              : d
          );
        }

        return {
          services: [service, ...(state.services || [])],
          destinations: updatedDestinations
        };
      }),
      
      updateServiceStatus: (id, status) => set((state) => ({
        services: (state.services || []).map((s) => 
          s.id === id ? { ...s, status } : s
        )
      })),

      toggleFeaturedService: (id) => set((state) => ({
        services: (state.services || []).map((s) => 
          s.id === id ? { ...s, featured: !s.featured } : s
        )
      })),

      deleteService: (id) => set((state) => ({
        services: (state.services || []).filter((s) => s.id !== id)
      })),
      
      addPlan: (plan) => set((state) => ({
        plans: [plan, ...(state.plans || [])]
      })),
      
      updatePlan: (id, updates) => set((state) => ({
        plans: (state.plans || []).map((p) =>
          p.id === id ? { ...p, ...updates } : p
        )
      })),

      toggleItemVisited: (planId, dayId, itemId) => set((state) => ({
        plans: (state.plans || []).map((plan) => {
          if (plan.id !== planId) return plan;
          return {
            ...plan,
            itinerary: plan.itinerary.map((day) => {
              if (day.id !== dayId) return day;
              return {
                ...day,
                items: day.items.map((item) => {
                  if (item.id !== itemId) return item;
                  return { ...item, visited: !item.visited };
                })
              };
            })
          };
        })
      })),

      deletePlan: (id) => set((state) => ({
        plans: (state.plans || []).filter((p) => p.id !== id)
      })),

      addAdBanner: (ad) => set((state) => ({
        adBanners: [ad, ...(state.adBanners || [])]
      })),

      toggleAdBanner: (id) => set((state) => ({
        adBanners: (state.adBanners || []).map((a) =>
          a.id === id ? { ...a, active: !a.active } : a
        )
      })),

      deleteAdBanner: (id) => set((state) => ({
        adBanners: (state.adBanners || []).filter((a) => a.id !== id)
      })),

      addShareLink: (link) => set((state) => ({
        shareLinks: [link, ...(state.shareLinks || [])]
      })),

      incrementLinkClicks: (code) => set((state) => ({
        shareLinks: (state.shareLinks || []).map((l) =>
          l.code === code ? { ...l, clicks: l.clicks + 1 } : l
        )
      })),

      deleteShareLink: (id) => set((state) => ({
        shareLinks: (state.shareLinks || []).filter((l) => l.id !== id)
      })),

      resetAll: () => {
        localStorage.removeItem('plantriper-storage-v6');
        set({
          currentUser: seedUsers[0],
          theme: defaultTheme,
          destinations: seedDestinations,
          services: seedServices,
          plans: seedPlans,
          adBanners: seedAds,
          shareLinks: seedShareLinks,
        });
      }
    }),
    {
      name: 'plantriper-storage-v6',
            merge: (persistedState: any, currentState) => {
        const persistedServices: Service[] = persistedState?.services || [];
        const persistedIds = new Set(persistedServices.map(s => s.id));
        const mergedServices = [
          ...persistedServices,
          ...seedServices.filter(s => !persistedIds.has(s.id))
        ];

        const persistedDests: Destination[] = persistedState?.destinations || [];
        const persistedDestNames = new Set(persistedDests.map(d => d.name.toLowerCase()));
        const mergedDestinations = [
          ...persistedDests,
          ...seedDestinations.filter(d => !persistedDestNames.has(d.name.toLowerCase()))
        ];

        return {
          ...currentState,
          ...(persistedState || {}),
          theme: {
            ...defaultTheme,
            ...(persistedState?.theme || {})
          },
          destinations: mergedDestinations,
          services: mergedServices,
          plans: persistedState?.plans ?? seedPlans,
          adBanners: persistedState?.adBanners ?? seedAds,
          shareLinks: persistedState?.shareLinks ?? seedShareLinks,
        };
      }
    }
  )
);
