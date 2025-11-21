import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Telas padrão
import Login from "./src/telas/Login";          // <-- ADICIONADO
import Home from "./src/telas/Home";
import Reservar from "./src/telas/Reservar";
import MinhasReservas from "./src/telas/MinhasReservas";
import ComprarCreditos from "./src/telas/ComprarCreditos";

// Pagamentos
import PagamentoPix from "./src/telas/ComprarCreditos/pagamentopix";
import PagamentoCartao from "./src/telas/ComprarCreditos/pagamentocartao";

// Cadastros
import CadastrarCarro from "./src/telas/CadastrarCarro";
import CadastrarCartao from "./src/telas/CadastrarCartao";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* 🟢 Tela inicial passa a ser LOGIN */}
        <Stack.Screen name="Login" component={Login} />

        {/* 🏠 Tela principal */}
        <Stack.Screen name="Home" component={Home} />

        {/* Ações */}
        <Stack.Screen name="Reservar" component={Reservar} />
        <Stack.Screen name="MinhasReservas" component={MinhasReservas} />
        <Stack.Screen name="ComprarCreditos" component={ComprarCreditos} />

        {/* Pagamentos */}
        <Stack.Screen name="PagamentoPix" component={PagamentoPix} />
        <Stack.Screen name="PagamentoCartao" component={PagamentoCartao} />

        {/* Cadastros */}
        <Stack.Screen name="CadastrarCarro" component={CadastrarCarro} />
        <Stack.Screen name="CadastrarCartao" component={CadastrarCartao} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}