import React from "react";
import { ScrollView } from "react-native";
import Cabecalho from "./componentes/Cabecalho";
import Cadastro from "./componentes/Cadastro";

export default function CadastrarCartao({ navigation }) {
  return (
    <ScrollView>
      <Cabecalho titulo="Cadastrar Pagamento" />
      <Cadastro navigation={navigation} />
    </ScrollView>
  );
}
