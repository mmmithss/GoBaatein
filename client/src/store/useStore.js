import {create} from "zustand";
import {persist} from "zustand/middleware";
export const useStoreForTheme = create(persist(set => ({
  theme: "dracula",
  setTheme: newtheme => set({theme: newtheme})
}), {name: "GoBaateintheme"}));
