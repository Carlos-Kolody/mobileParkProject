import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MinhasReservas() {
  return (
    <View style={estilos.container}>
      <Text style={estilos.texto}>Tela de Minhas Reservas</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  texto: { fontSize: 22, fontWeight: "bold" },
});