import React from 'react';
import { ScrollView } from 'react-native';
import Cabecalho from './componentes/Cabecalho';
import Acoes from './componentes/Acoes';

export default function Home({ navigation }) {
  return (
    <ScrollView>
      <Cabecalho />
      {}
      <Acoes navigation={navigation} />
    </ScrollView>
  );
}