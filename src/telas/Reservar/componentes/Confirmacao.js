import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Alert,
  SafeAreaView 
} from 'react-native';

export default function DetalhesReservaPagamento({ navigation, route }) {
  // Dados de exemplo para a reserva
  const [veiculo, setVeiculo] = useState({ nome: 'Super Kwid', placa: 'GTR 4J29' });
  const [dataHora, setDataHora] = useState('13/10/2025 || 15:00 - 22:00');
  const [estacionamento, setEstacionamento] = useState('Shopping Palladium');
  const [preco, setPreco] = useState(18.00); // R$18,00

  // Formas de Pagamento: 'CreditoEasyPark', 'Pix', 'Cartao', null
  const [formaPagamento, setFormaPagamento] = useState(null); 

  // Função para lidar com o clique no botão "Reservar"
  const handleReservar = () => {
    if (!formaPagamento) {
      Alert.alert("Atenção", "Por favor, selecione uma forma de pagamento.");
      return;
    }
    
    // Se for PIX, navega para a tela de geração do código.
    if (formaPagamento === 'Pix') {
        navigation.navigate('PagamentoPix', {
            preco: preco,
            reservaDetalhes: { veiculo, dataHora, estacionamento }
        });
    } else {
        // Lógica de pagamento direto para Cartão ou Créditos
        Alert.alert(
          "Atenção", 
          `Processando pagamento de R$${preco.toFixed(2).replace('.', ',')} via ${formaPagamento}...`,
        );
    }
  };

  return (
    <SafeAreaView style={estilos.tela}>
      <ScrollView contentContainerStyle={estilos.container}>
        
        {/* Seção do Veículo (topo) */}
        <View style={estilos.caixaVeiculo}>
          <Text style={estilos.iconeVeiculo}>🚗</Text>
          <Text style={estilos.textoVeiculo}>{veiculo.nome} - {veiculo.placa}</Text>
        </View>

        {/* Linha separadora logo abaixo do veículo */}
        <View style={estilos.separadorHorizontal} />

        {/* Detalhes da Reserva (Data/Hora, Local, Preço) */}
        <View style={estilos.secaoDetalhes}>
          <View style={estilos.itemDetalhe}>
            <Text style={estilos.iconeDetalhe}>🕒</Text>
            <Text style={estilos.textoDetalhe}>{dataHora}</Text>
          </View>
          <View style={estilos.itemDetalhe}>
            <Text style={estilos.iconeDetalhe}>📍</Text>
            <Text style={estilos.textoDetalhe}>{estacionamento}</Text>
          </View>
          <View style={estilos.itemDetalhe}>
            <Text style={estilos.iconeDetalhe}>💲</Text>
            <Text style={estilos.textoDetalhe}>R${preco.toFixed(2).replace('.', ',')}</Text>
          </View>
        </View>

        {/* Título "Selecione a forma de pagamento" */}
        <Text style={estilos.tituloSecaoPagamento}>Selecione a forma de pagamento:</Text>

        {/* Opções de Pagamento */}
        <View style={estilos.containerPagamento}>
          
          {/* Crédito EasyPark */}
          <TouchableOpacity
            style={[
              estilos.botaoPagamento,
              formaPagamento === 'CreditoEasyPark' && estilos.botaoPagamentoSelecionado,
            ]}
            onPress={() => setFormaPagamento('CreditoEasyPark')}
          >
            <Text style={estilos.textoPagamento}>Crédito{"\n"}EasyPark</Text>
          </TouchableOpacity>
          
          {/* Pix */}
          <TouchableOpacity
            style={[
              estilos.botaoPagamento,
              formaPagamento === 'Pix' && estilos.botaoPagamentoSelecionado,
            ]}
            onPress={() => setFormaPagamento('Pix')}
          >
            <Text style={estilos.textoPagamento}>Pix</Text>
          </TouchableOpacity>
          
          {/* Cartão de Crédito/Débito */}
          <TouchableOpacity
            style={[
              estilos.botaoPagamento,
              formaPagamento === 'Cartao' && estilos.botaoPagamentoSelecionado,
            ]}
            onPress={() => setFormaPagamento('Cartao')}
          >
            <Text style={estilos.textoPagamento}>Cartão de{"\n"}Crédito / Débito</Text>
          </TouchableOpacity>
        </View>

        {/* Espaço para o botão fixo no rodapé não cobrir o conteúdo */}
        <View style={{ height: 80 }} /> 

      </ScrollView>

      {/* Botão "Reservar" Fixo no Rodapé */}
      <TouchableOpacity 
        style={estilos.botaoRodape} 
        onPress={handleReservar}
      >
        <Text style={estilos.textoBotaoRodape}>Reservar →</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ------------------------------------------------------------------
// ESTILOS
// ... (Estilos permanecem os mesmos, exceto pelo paddingBottom removido do container)
// ------------------------------------------------------------------

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    paddingBottom: 90, 
  },
  caixaVeiculo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconeVeiculo: {
    fontSize: 28,
    marginRight: 10,
  },
  textoVeiculo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  separadorHorizontal: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  secaoDetalhes: {
    marginBottom: 20,
  },
  itemDetalhe: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconeDetalhe: {
    fontSize: 20,
    marginRight: 10,
  },
  textoDetalhe: {
    fontSize: 16,
    color: '#333',
  },
  tituloSecaoPagamento: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  containerPagamento: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  botaoPagamento: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 15,
    width: '30%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    marginBottom: 10,
  },
  botaoPagamentoSelecionado: {
    borderColor: '#000',
  },
  textoPagamento: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 13,
  },
  botaoRodape: {
    backgroundColor: '#000',
    paddingVertical: 16,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  textoBotaoRodape: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});