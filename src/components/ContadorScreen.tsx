import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'react-native/Libraries/Image/Image';
import { Counter } from '../components/Counter';

const ContadorScreen = () => {
  return (
    <View style={{ width: '100%', height: '100%' }}>
      <Counter />
    </View>
  );
};

export default ContadorScreen;
