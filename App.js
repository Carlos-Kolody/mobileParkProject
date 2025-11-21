import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./src/telas/Login";
import Home from "./src/telas/Home";
import Reservar from "./src/telas/Reservar";
import MinhasReservas from "./src/telas/MinhasReservas";

import ComprarCreditos from "./src/telas/ComprarCreditos";
import Compra from "./src/telas/ComprarCreditos/componentes/Compra";

import PagamentoPix from "./src/telas/ComprarCreditos/pagamentopix";
import PagamentoCartao from "./src/telas/ComprarCreditos/pagamentocartao";

import CadastrarCarro from "./src/telas/CadastrarCarro";
// IMPORTAÇÃO DA TELA DE HISTÓRICO DE CARROS
import HistoricoCarros from "./src/telas/CadastrarCarro/historico"; 

import CadastrarCartao from "./src/telas/CadastrarCartao";
// IMPORTAÇÃO DA TELA DE HISTÓRICO DE CARTÕES
import HistoricoCartoes from "./src/telas/CadastrarCartao/historico";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />

        {/* Telas principais */}
        <Stack.Screen name="Reservar" component={Reservar} />
        <Stack.Screen name="MinhasReservas" component={MinhasReservas} />

        {/* Créditos */}
        <Stack.Screen name="ComprarCreditos" component={ComprarCreditos} />
        <Stack.Screen name="Compra" component={Compra} />

        {/* Pagamentos */}
        <Stack.Screen name="PagamentoPix" component={PagamentoPix} />
        <Stack.Screen name="PagamentoCartao" component={PagamentoCartao} />

        {/* Cadastros */}
        <Stack.Screen name="CadastrarCarro" component={CadastrarCarro} />
        {/* NOVA ROTA: Histórico de Carros */}
        <Stack.Screen name="HistoricoCarros" component={HistoricoCarros} /> 

        <Stack.Screen name="CadastrarCartao" component={CadastrarCartao} />
        {/* NOVA ROTA: Histórico de Cartões */}
        <Stack.Screen name="HistoricoCartoes" component={HistoricoCartoes} /> 

      </Stack.Navigator>
    </NavigationContainer>
  );
}