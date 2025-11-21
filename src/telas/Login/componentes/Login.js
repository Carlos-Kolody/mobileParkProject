import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function Login({ navigation }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const autenticar = () => {
    if (usuario === "admin" && senha === "admin") {
      setErro("");
      navigation.replace("Home"); // impede voltar para o login
    } else {
      setErro("Usuário ou senha incorretos.");
    }
  };

  return (
    <View style={estilos.container}>

      {/* Topo igual às outras telas */}
      <View style={estilos.header}>
        <Text style={estilos.titulo}>Login</Text>
      </View>

      {/* Área de login */}
      <View style={estilos.areaLogin}>
        <Text style={estilos.label}>Usuário</Text>
        <TextInput
          style={estilos.input}
          value={usuario}
          onChangeText={setUsuario}
          placeholder="Digite seu usuário"
          autoCapitalize="none"
        />

        <Text style={estilos.label}>Senha</Text>
        <TextInput
          style={estilos.input}
          value={senha}
          onChangeText={setSenha}
          placeholder="Digite sua senha"
          secureTextEntry
        />

        {erro ? <Text style={estilos.erro}>{erro}</Text> : null}

        <TouchableOpacity style={estilos.botao} onPress={autenticar}>
          <Text style={estilos.textoBotao}>Entrar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    backgroundColor: "#000",
    padding: 20,
    alignItems: "center",
  },

  titulo: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  areaLogin: {
    marginTop: 60,
    paddingHorizontal: 20,
  },

  label: {
    fontSize: 18,
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: "#cfcfcf",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },

  botao: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  textoBotao: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  erro: {
    color: "red",
    marginBottom: 10,
    fontSize: 16,
  },
});
