import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemons = async (offset = 0, limit = 20) => {
  const response = await axios.get(`${BASE_URL}/pokemon`, {
    params: {
      offset,
      limit,
    },
  });
  return response.data;
};

export const getPokemon = async (id) => {
  const response = await axios.get(`${BASE_URL}/pokemon/${id}`);
  return response.data;
};
