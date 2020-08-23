import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Feed from './pages/Feed';

import logo from './assets/instagram.png';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerTitle: () => <Image source={logo} />,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#f5f5f5',
        },
      }}>
      <Stack.Screen name="Feed" component={Feed} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Routes;
