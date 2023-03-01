import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useStore } from 'zustand';
import { PokemonStore } from '../hooks/PokemonStore';

interface Props {
  pokemonId: number;
}

export const Contador = ({ pokemonId }: Props) => {
  const count = useStore((state) => state.count);

  const handleIncrement = () => {
    useStore.setState({ count: count });
  };

  const handleDecrement = () => {
    useStore.setState({ count: count });
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'black' }}>
      <TouchableOpacity onPress={handleDecrement}>
        <Text style={{ fontSize: 24, color: 'red', marginRight: 10 }}>-</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 24,}}>{pokemonId}</Text>
      <TouchableOpacity onPress={handleIncrement}>
        <Text style={{ fontSize: 24, color: 'green', marginLeft: 10 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
