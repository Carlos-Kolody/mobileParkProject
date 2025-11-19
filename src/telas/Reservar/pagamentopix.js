import React from 'react';
import { ScrollView } from 'react-native';
import Cabecalho from './componentes/Cabecalho';
import PagamentoPix from './componentes/PagamentoPix';

export default function PagamentoPixReservar({ navigation, route }) {
  return (
    <ScrollView>
      <Cabecalho />
      <PagamentoPix navigation={navigation} route={route} />
    </ScrollView>
  );
}
