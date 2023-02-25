import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY_PROFILE = 'PROFILE';
const STORAGE_KEY_POKEMON_LIST = 'POKEMON_LIST';

export const storage = {
  set: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  },
  get: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value != null ? JSON.parse(value) : null;
    } catch (error) {
      console.log(error);
    }
  },
  remove: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  },
  clear: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
  },
  saveProfile: async (profile) => {
    await storage.set(STORAGE_KEY_PROFILE, profile);
  },
  getProfile: async () => {
    return await storage.get(STORAGE_KEY_PROFILE);
  },
  savePokemonList: async (pokemonList) => {
    await storage.set(STORAGE_KEY_POKEMON_LIST, pokemonList);
  },
  getPokemonList: async () => {
    return await storage.get(STORAGE_KEY_POKEMON_LIST);
  },
};
