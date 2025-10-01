// src/telas/Home/index.js

import React from 'react';
import { ScrollView } from 'react-native';
import Cabecalho from './componentes/Cabecalho';
import Acoes from './componentes/Acoes';

export default function Home() {
  return (
    <ScrollView>
      <Cabecalho />
      <Acoes />
    </ScrollView>
  );
}