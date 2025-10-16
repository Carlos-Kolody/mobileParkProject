import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Acao = ({ icone, texto, onPress }) => (
  <TouchableOpacity style={estilos.botao} onPress={onPress}>
    <Text style={estilos.icone}>{icone}</Text>
    <Text style={estilos.textoBotao}>{texto}</Text>
  </TouchableOpacity>
);

export default function Acoes({ navigation }) {
  return (
    <View style={estilos.container}>
      <Acao
        icone="🚗"
        texto="Reservar agora"
        onPress={() => navigation.navigate('Reservar')}
      />
      <Acao
        icone="📅"
        texto="Minhas reservas"
        onPress={() => navigation.navigate('MinhasReservas')}
      />
      <Acao
        icone="🛒"
        texto="Comprar créditos"
        onPress={() => navigation.navigate('ComprarCreditos')}
      />
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