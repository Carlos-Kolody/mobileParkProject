import React from 'react';
import { ScrollView } from 'react-native';
import Cabecalho from './componentes/Cabecalho';
import PagamentoCartao from './componentes/PagamentoCartao';

export default function PagamentoCartaoScreen({ navigation, route }) {
  return (
    <ScrollView>
      <Cabecalho />
      <PagamentoCartao navigation={navigation} route={route} />
    </ScrollView>
  );
}
