import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import Home from './src/telas/Home';
import Reservar from './src/telas/Reservar';
import MinhasReservas from './src/telas/MinhasReservas';
import ComprarCreditos from './src/telas/ComprarCreditos';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Reservar"
          component={Reservar}
          options={{ title: 'Reservar Vaga' }}
        />
        <Stack.Screen
          name="MinhasReservas"
          component={MinhasReservas}
          options={{ title: 'Minhas Reservas' }}
        />
        <Stack.Screen
          name="ComprarCreditos"
          component={ComprarCreditos}
          options={{ title: 'Comprar Créditos' }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}