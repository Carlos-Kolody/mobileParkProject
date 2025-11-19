import React from "react";
import { ScrollView } from "react-native";
import Cabecalho from "./componentes/Cabecalho";
import Cadastro from "./componentes/Cadastro";

export default function CadastrarCarro({ navigation }) {
  return (
    <ScrollView>
      <Cabecalho titulo="Cadastrar Veículo" />
      <Cadastro navigation={navigation} />
    </ScrollView>
  );
}
