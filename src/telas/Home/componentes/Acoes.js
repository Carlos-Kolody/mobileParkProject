// src/telas/Home/componentes/Acoes.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Ícones podem ser adicionados depois com uma biblioteca como react-native-vector-icons
const Acao = ({ icone, texto }) => (
  <TouchableOpacity style={estilos.botao}>
    <Text style={estilos.icone}>{icone}</Text>
    <Text style={estilos.textoBotao}>{texto}</Text>
  </TouchableOpacity>
);

export default function Acoes() {
  return (
    <View style={estilos.container}>
      <Acao icone="🚗" texto="Reservar agora" />
      <Acao icone="📅" texto="Minhas reservas" />
      <Acao icone="🛒" texto="Comprar créditos" />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 8,
  },
  botao: {
    backgroundColor: '#f6f6f6',
    padding: 24,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icone: {
    fontSize: 24,
    marginRight: 16,
  },
  textoBotao: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});