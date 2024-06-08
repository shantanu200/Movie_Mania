import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORMODES } from "@gluestack-style/react/lib/typescript/types";

type State = {
  theme: COLORMODES;
};

type Action = {
  updateTheme: (value: State["theme"]) => void;
};

const useLocalStore = create<State & Action>()(
  persist(
    (set) => ({
      theme: "dark",
      updateTheme: (value) => set(() => ({ theme: value })),
    }),
    {
      name: "movie-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useLocalStore;
