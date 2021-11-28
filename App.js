import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Home from './screens/Home/Home';
import ListCities from './screens/ListCities/Search';
import Nosotros from './screens/Nosotros/Nosotros';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        animated={true}
        backgroundColor='#142950'
        barStyle='light-content'
      />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Home'
            component={Home}
            options={{ title: 'Clima Ahora' }}
          />
          <Stack.Screen
            name='Search'
            component={ListCities}
            options={{ title: 'Tus Ciudades' }}
          />
          <Stack.Screen
            name='Nosotros'
            component={Nosotros}
            options={{ title: 'Quiénes Somos' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
