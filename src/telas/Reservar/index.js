import React from 'react';
import { ScrollView } from 'react-native';
import Cabecalho from './componentes/Cabecalho';
import Configuracoes from './componentes/Configuracoes';

export default function Reservar({ navigation }) {
  return (
    <ScrollView>
      <Cabecalho />
      <Configuracoes navigation={navigation} />
    </ScrollView>
  );
}
