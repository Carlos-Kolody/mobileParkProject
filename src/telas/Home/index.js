// src/telas/Home/index.js

import React from 'react';
import { ScrollView } from 'react-native';
import Cabecalho from './componentes/Cabecalho';
import Acoes from './componentes/Acoes';

// A tela Home agora recebe a propriedade { navigation } automaticamente do Stack Navigator
export default function Home({ navigation }) {
  return (
    <ScrollView>
      <Cabecalho />
      {/* Passamos a propriedade para o componente que tem os botões */}
      <Acoes navigation={navigation} />
    </ScrollView>
  );
}