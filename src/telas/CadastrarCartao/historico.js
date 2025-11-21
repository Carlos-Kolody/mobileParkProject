import React from "react";
import { ScrollView } from "react-native";
import Cabecalho from "./componentes/Cabecalho";
import Historico from "./componentes/Historico";

export default function CadastrarCartao({ navigation }) {
  return (
    <ScrollView>
      <Cabecalho titulo="Cadastrar Pagamento" />
      <Historico navigation={navigation} />
    </ScrollView>
  );
}
