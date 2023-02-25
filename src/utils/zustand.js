import create from 'zustand';
import { storage } from './storage';

export const useStore = create((set) => ({
  profile: {},
  pokemonList: [],
  counter: 0,
  setProfile: async (profile) => {
    await storage.saveProfile(profile);
    set(() => ({ profile }));
  },
  setPokemonList: async (pokemonList) => {
    await storage.savePokemonList(pokemonList);
    set(() => ({ pokemonList }));
  },
  setCounter: (counter) => {
    set(() => ({ counter }));
  },
  loadProfile: async () => {
    const profile = await storage.getProfile();
    if (profile) {
      set(() => ({ profile }));
    }
  },
  loadPokemonList: async () => {
    const pokemonList = await storage.getPokemonList();
    if (pokemonList) {
      set(() => ({ pokemonList }));
    }
  },
  loadCounter: () => {
    set(() => ({ counter: 0 }));
  },
}));

export const useZustand = (selector) => useStore((state) => selector(state));
