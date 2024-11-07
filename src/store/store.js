import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      auth: {
        username: '',
        active: false,
      },
      apiData: null, // Données API générales ou spécifiques à l'utilisateur
      employeeData: null, // Données spécifiques aux employés
      setUsername: (name) =>
        set((state) => ({
          auth: {
            ...state.auth,
            username: name,
          },
        })),
      setActive: (status) =>
        set((state) => ({
          auth: {
            ...state.auth,
            active: status,
          },
        })),
        
      // Met à jour apiData
      setApiData: (data) => {
        set(() => ({ apiData: data }));
      },

      // Met à jour employeeData
      setEmployeeData: (data) => {
        set(() => ({ employeeData: data }));
      },
    }),
    {
      name: 'auth-storage', // Nom de l'élément dans le localStorage
      getStorage: () => localStorage, // Persiste dans le localStorage
    }
  )
);
  