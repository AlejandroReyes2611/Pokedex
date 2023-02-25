import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type PokemonStore = {
  pokemonCount: number;
  history: { oldValue: number; newValue: number }[];
  addPokemons: (count: number) => void;
  increasePokemonCount: () => void;
  decreasePokemonCount: () => void;
};

const POKEMON_COUNT_STORAGE_KEY = 'POKEMON_COUNT_STORAGE_KEY';

export const usePokemonStore = create<PokemonStore>((set) => {
  const initialState = { pokemonCount: 0, history: [] };

  // Leer el número de pokemons guardado en AsyncStorage
  AsyncStorage.getItem(POKEMON_COUNT_STORAGE_KEY).then((value) => {
    if (value !== null) {
      const pokemonCountFromAsyncStorage = JSON.parse(value);
      set({ pokemonCount: pokemonCountFromAsyncStorage });
    }
  });

  return {
    ...initialState,
    addPokemons: (count) =>
      set((state) => ({
        pokemonCount: state.pokemonCount + count,
        history: [...state.history, { oldValue: state.pokemonCount, newValue: state.pokemonCount + count }],
      })),
    increasePokemonCount: () =>
      set((state) => {
        const newPokemonCount = state.pokemonCount + 1;

        // Guardar el nuevo número de pokemons en AsyncStorage
        AsyncStorage.setItem(POKEMON_COUNT_STORAGE_KEY, JSON.stringify(newPokemonCount)).catch((error) =>
          console.log(error),
        );

        return {
          pokemonCount: newPokemonCount,
          history: [...state.history, { oldValue: state.pokemonCount, newValue: newPokemonCount }],
        };
      }),
    decreasePokemonCount: () =>
      set((state) => {
        const newPokemonCount = state.pokemonCount - 1;

        // Guardar el nuevo número de pokemons en AsyncStorage
        AsyncStorage.setItem(POKEMON_COUNT_STORAGE_KEY, JSON.stringify(newPokemonCount)).catch((error) =>
          console.log(error),
        );

        return {
          pokemonCount: newPokemonCount,
          history: [...state.history, { oldValue: state.pokemonCount, newValue: newPokemonCount }],
        };
      }),
  };
});
