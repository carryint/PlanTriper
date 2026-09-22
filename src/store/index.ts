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
  
  // Services & Providers
  addService: (service: Service) => void;
  updateServiceStatus: (id: string, status: 'approved' | 'rejected') => void;
  toggleFeaturedService: (id: string) => void;
  deleteService: (id: string) => void;
  
  // Plans & AI Generator
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
      currentUser: seedUsers[0], // default to admin user
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
      
      addService: (service) => set((state) => ({ 
        services: [service, ...(state.services || [])] 
      })),
      
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
                  const newVisited = !item.visited;
                  return { ...item, visited: newVisited };
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
        localStorage.removeItem('plantriper-storage-v2');
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
      name: 'plantriper-storage-v2',
      merge: (persistedState: any, currentState) => {
        return {
          ...currentState,
          ...(persistedState || {}),
          theme: {
            ...defaultTheme,
            ...(persistedState?.theme || {})
          },
          destinations: (persistedState?.destinations && persistedState.destinations.length > 0) 
            ? persistedState.destinations 
            : seedDestinations,
          services: (persistedState?.services && persistedState.services.length > 0) 
            ? persistedState.services 
            : seedServices,
          plans: (persistedState?.plans && persistedState.plans.length > 0) 
            ? persistedState.plans 
            : seedPlans,
          adBanners: persistedState?.adBanners || seedAds,
          shareLinks: persistedState?.shareLinks || seedShareLinks,
        };
      }
    }
  )
);
