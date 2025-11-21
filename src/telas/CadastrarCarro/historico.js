import React from "react";
import { ScrollView } from "react-native";
import Cabecalho from "./componentes/Cabecalho";
import Historico from "./componentes/Historico";

export default function CadastrarCarro({ navigation }) {
  return (
    <ScrollView>
      <Cabecalho titulo="Cadastrar Veículo" />
      <Historico navigation={navigation} />
    </ScrollView>
  );
}
