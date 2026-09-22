import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AppTheme, Service, TripPlan } from '../types';

interface AppState {
  currentUser: User | null;
  theme: AppTheme;
  services: Service[];
  plans: TripPlan[];
  
  // Actions
  login: (user: User) => void;
  logout: () => void;
  setTheme: (theme: Partial<AppTheme>) => void;
  addService: (service: Service) => void;
  updateServiceStatus: (id: string, status: 'approved' | 'rejected') => void;
  addPlan: (plan: TripPlan) => void;
  updatePlan: (id: string, updates: Partial<TripPlan>) => void;
}

const defaultTheme: AppTheme = {
  primaryColor: '#3b82f6',
  gradientStart: '#3b82f6',
  gradientEnd: '#8b5cf6',
  logoUrl: '',
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentUser: null,
      theme: defaultTheme,
      services: [],
      plans: [],
      
      login: (user) => set({ currentUser: user }),
      logout: () => set({ currentUser: null }),
      
      setTheme: (themeUpdates) => set((state) => ({ 
        theme: { ...state.theme, ...themeUpdates } 
      })),
      
      addService: (service) => set((state) => ({ 
        services: [...state.services, service] 
      })),
      
      updateServiceStatus: (id, status) => set((state) => ({
        services: state.services.map((s) => 
          s.id === id ? { ...s, status } : s
        )
      })),
      
      addPlan: (plan) => set((state) => ({
        plans: [...state.plans, plan]
      })),
      
      updatePlan: (id, updates) => set((state) => ({
        plans: state.plans.map((p) =>
          p.id === id ? { ...p, ...updates } : p
        )
      }))
    }),
    {
      name: 'plantriper-storage'
    }
  )
);
