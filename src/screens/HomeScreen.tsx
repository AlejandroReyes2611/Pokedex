import React, { useState, useEffect } from 'react';
import { Image, FlatList, ActivityIndicator, Text, View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { styles } from '../theme/appTheme';
import { PokemonCard } from '../components/PokemonCard';
import { usePokemonStore } from '../hooks/PokemonStore';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const HomeScreen = () => {
    const [myPokemons, setMyPokemons] = useState<SimplePokemon[]>([]);
    

    const { top } = useSafeAreaInsets();
    const { simplePokemonList, loadPokemons } = usePokemonPaginated();
    const navigation = useNavigation();
    const { pokemonCount } = usePokemonStore();

    useEffect(() => {
        const getMyPokemons = async () => {
          const response = await AsyncStorage.getItem('myPokemons');
          const data = response ? JSON.parse(response) : [];
          setMyPokemons(data);
        };
        getMyPokemons();
      }, []);
    
      const createUniqueId = (name: string) => {
        const date = new Date();
        const uniqueId = `${name}-${date.getTime()}`;
        return uniqueId;
      };
    
      const addPokemon = (pokemon: SimplePokemon) => {
        const uniqueId = createUniqueId(pokemon.name);
        setMyPokemons((prev) => [...prev, { ...pokemon, id: uniqueId }]);
        AsyncStorage.setItem('myPokemons', JSON.stringify([...myPokemons, { ...pokemon, id: uniqueId }]));
      };
    
      const allPokemons = [
        ...simplePokemonList.slice(0, pokemonCount),
        ...myPokemons,
      ];
      return (
        <>
          <Image source={require('../assets/pokebola.png')} style={styles.pokebolaBG} />
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('PokemonCatalogScreen')}
              style={{
                top: top + 10,
                left: 90,
                backgroundColor: '#007AFF',
                borderRadius: 10,
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}
            >
              <Text style={{ color: 'white' }}>Ver Catálogo</Text>
            </TouchableOpacity>
            <FlatList
              data={allPokemons}
              keyExtractor={(pokemon) => pokemon.id}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              ListHeaderComponent={(
                <Text style={{
                  ...styles.title,
                  ...styles.globalMargin,
                  top: top + 20,
                  marginBottom: top + 20,
                  paddingBottom: 10,
                }}>Pokedex </Text>
              )}
              renderItem={({ item }) => (
                <PokemonCard pokemon={item} onAdd={() => addPokemon(item)} />
              )}
            />
          </View>
        </>
      );
};