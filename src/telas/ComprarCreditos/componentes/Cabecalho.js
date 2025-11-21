import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { carregaUsuario } from '../../../services/carregaDados.js';

export default function Cabecalho({ titulo = "Comprar Créditos" }) {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState({});
  const [menuVisivel, setMenuVisivel] = useState(false);

  useEffect(() => {
    const dadosUsuario = carregaUsuario();
    setUsuario(dadosUsuario);
  }, []);

  const irPara = (rota) => {
    navigation.navigate(rota);
    setMenuVisivel(false);
  };

  return (
    <View style={estilos.container}>
      
      {/* Área superior */}
      <View style={estilos.header}>
        <TouchableOpacity onPress={() => setMenuVisivel(!menuVisivel)}>
          <Text style={estilos.menuIcon}>☰</Text>
        </TouchableOpacity>

        <Text style={estilos.titulo}>{titulo}</Text>
      </View>

      {/* Saudação */}
      <View style={estilos.perfil}>
        <Text style={estilos.saudacao}>{usuario.boasVindas}</Text>
        <Text style={estilos.saldo}>Saldo: {usuario.saldo}</Text>
      </View>

      {/* MENU LATERAL */}
      {menuVisivel && (
        <View style={estilos.menu}>
          <TouchableOpacity onPress={() => irPara("Home")}>
            <Text style={estilos.opcao}>🏠 Início</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => irPara("Reservar")}>
            <Text style={estilos.opcao}>🚗 Reservar agora</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => irPara("ComprarCreditos")}>
            <Text style={estilos.opcao}>🛒 Comprar créditos</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => irPara("CadastrarCarro")}>
            <Text style={estilos.opcao}>🚘 Cadastrar veículo</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => irPara("CadastrarCartao")}>
            <Text style={estilos.opcao}>💳 Cadastrar forma de pagamento</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => irPara("MinhasReservas")}>
            <Text style={estilos.opcao}>📅 Minhas reservas</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => irPara("Login")}>
            <Text style={estilos.opcao}>🚪Sair</Text>
          </TouchableOpacity>
        </View>
      )}
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
    marginBottom: 16,
  },
  menuIcon: {
    fontSize: 28,
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
  menu: {
    marginTop: 16,
    backgroundColor: "#f6f6f6",
    padding: 12,
    borderRadius: 8,
  },
  opcao: {
    fontSize: 18,
    paddingVertical: 8,
  }
});
