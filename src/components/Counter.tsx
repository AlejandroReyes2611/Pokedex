import React from 'react';
import { View, Text, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePokemonStore } from '../hooks/PokemonStore';
import { styles } from '../theme/appTheme';

export const Counter = () => {
  const { pokemonCount } = usePokemonStore();
  const { top } = useSafeAreaInsets();

  return (
    <View >
      <View style={{ width: '100%', height: '100%' }}>
        <Image
          source={require('../assets/ash.png')}
          style={styles.teamPokemon}
        />
        <Text style={{
          ...styles.title,
          ...styles.globalMargin,
          top: top + 80,
          marginBottom: top + 90,
          paddingBottom: 10, 
          textAlign: 'center',

        }}>Total pokemons</Text>
        <Text style={{ fontSize: 40, color: 'black', marginHorizontal: 170, marginVertical: 10 }}>{pokemonCount}</Text>
      </View>
    </View>
  );
};
