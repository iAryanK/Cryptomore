import { create } from "zustand";

interface IWallet {
  activeWallet: number;
  setWallet: (newWallet: number) => void;
}

export const useWallet = create<IWallet>()((set) => ({
  activeWallet: 0,
  setWallet: (newWallet: number) => set({ activeWallet: newWallet }),
}));
