import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import CatalogoScreen from '../screens/CatalogoScreen';
import PerfilScreen from '../screens/PerfilScreen';
import ContadorScreen from '../screens/ContadorScreen';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Perfil" component={PerfilScreen} />
        <Tab.Screen name="Catálogo de pokémon" component={CatalogoScreen} />
        <Tab.Screen name="Contador" component={ContadorScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
