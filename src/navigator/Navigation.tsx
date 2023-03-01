import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Navigator } from './Navigator';
import ContadorScreen from '../components/ContadorScreen';

const Tab = createBottomTabNavigator();

export const TabBottomNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          } else {
            iconName = 'settings';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false
      })}
      
    >
      
      <Tab.Screen
        name="Navigator"
        component={Navigator}
        options={{ tabBarLabel: 'Catalogo Pokemon', tabBarIcon: ({ color, size }: TabBarIconProps) => <Icon name="ios-paw-outline" size={size} color={color} /> }}
      />
      <Tab.Screen
        name="Contador"
        component={ContadorScreen}
        options={{ tabBarLabel: 'Contador', tabBarIcon: ({ color, size }: TabBarIconProps) => <Icon name="ios-calculator-outline" size={size} color={color} />}}
      />
    </Tab.Navigator>
  );
};
