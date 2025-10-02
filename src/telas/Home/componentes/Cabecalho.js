// src/telas/Home/componentes/Cabecalho.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { carregaUsuario } from '../../../services/carregaDados.js';

export default function Cabecalho() {
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    const dadosUsuario = carregaUsuario();
    setUsuario(dadosUsuario);
  }, []);

  return (
    <View style={estilos.container}>
      <View style={estilos.header}>
        <Text style={estilos.menuIcon}>☰</Text>
        <Text style={estilos.titulo}>Início</Text>
      </View>
      <View style={estilos.perfil}>
        <Text style={estilos.saudacao}>{usuario.boasVindas}</Text>
        <Text style={estilos.saldo}>Saldo: {usuario.saldo}</Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  menuIcon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  perfil: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  saudacao: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  saldo: {
    fontSize: 16,
    backgroundColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
});