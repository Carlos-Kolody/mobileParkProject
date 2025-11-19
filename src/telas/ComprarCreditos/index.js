import React from 'react';
import { ScrollView } from 'react-native';
import Cabecalho from './componentes/Cabecalho';
import Compra from './componentes/Compra';

export default function ComprarCreditos({ navigation }) {
  return (
    <ScrollView>
      <Cabecalho />
      <Compra navigation={navigation} />
    </ScrollView>
  );
}
