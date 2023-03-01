import React from 'react';
import { LogBox, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';
import { TabBottomNavigator } from './src/navigator/Navigation';

LogBox.ignoreAllLogs(true);

const App = () => {
  return (
    <NavigationContainer>
      <TabBottomNavigator/>
      
    </NavigationContainer>
  )
}

export default App;
