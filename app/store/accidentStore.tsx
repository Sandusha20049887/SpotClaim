import { create } from "zustand";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from "zustand/middleware";
import AccidentStoreState from "./accidentStoreState";

// Create the store with persistence
const useAccidentStore = create(
  persist<AccidentStoreState>(
    (set, get) => ({
      accidents: [], // Initial state

      // Action to add an item
      addAccident: (val: any) =>
        set((state) => ({
          accidents: [val, ...state.accidents],
        })),
    }),
    {
      name: 'accident-storage', // unique name for storage
      storage: createJSONStorage(() => AsyncStorage), // AsyncStorage implementation
      onRehydrateStorage: (state) => {
        // Optional: handle rehydration
        return (state, error) => {
          if (error) {
            console.log('an error happened during hydration', error);
          } else {
            console.log('hydration finished');
          }
        };
      },
    }
  )
);

export default useAccidentStore;