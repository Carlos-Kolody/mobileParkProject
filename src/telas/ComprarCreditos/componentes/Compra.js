import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const VALORES_PREDEFINIDOS = [150, 100, 50, 20];
const AJUSTES_RAPIDOS = [
  { valor: 10, label: '+R$10,00' },
  { valor: 1, label: '+R$1,00' },
  { valor: -10, label: '-R$10,00' },
  { valor: -1, label: '-R$1,00' },
];

export default function ComprarCreditos({ navigation }) {
  const [valorCredito, setValorCredito] = useState(25.00); 
  const [formaPagamento, setFormaPagamento] = useState('Nenhum');

  const selecionarValor = (valor) => {
    setValorCredito(valor);
  };

  const ajustarValor = (ajuste) => {
    setValorCredito(prevValor => {
      // Garante que o valor não seja negativo
      const novoValor = prevValor + ajuste;
      return novoValor >= 1 ? novoValor : 1; 
    });
  };

  const renderBotoesValores = () => (
    <View style={estilos.linhaBotoes}>
      {VALORES_PREDEFINIDOS.map(valor => (
        <TouchableOpacity
          key={valor}
          style={estilos.botaoValor}
          onPress={() => selecionarValor(valor)}
        >
          <Text style={estilos.textoBotaoValor}>R${valor.toFixed(2).replace('.', ',')}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderAjustesRapidos = () => (
    <View style={estilos.secaoAjuste}>
      {/* Linha superior: +R$10,00 e +R$1,00 */}
      <View style={estilos.linhaBotoesAjuste}>
        {AJUSTES_RAPIDOS.slice(0, 2).map(ajuste => (
          <TouchableOpacity
            key={ajuste.label}
            style={estilos.botaoAjuste}
            onPress={() => ajustarValor(ajuste.valor)}
          >
            <Text style={estilos.textoBotaoAjuste}>{ajuste.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {}
      <View style={estilos.linhaBotoesAjuste}>
        {AJUSTES_RAPIDOS.slice(2, 4).map(ajuste => (
          <TouchableOpacity
            key={ajuste.label}
            style={estilos.botaoAjuste}
            onPress={() => ajustarValor(ajuste.valor)}
          >
            <Text style={estilos.textoBotaoAjuste}>{ajuste.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={estilos.tela} contentContainerStyle={estilos.container}>
      
      {}
      <Text style={estilos.tituloSecao}>Quantos créditos quer comprar?</Text>

      <View style={estilos.containerSelecao}>
        <View style={estilos.secaoValores}>
          {}
          {renderBotoesValores()}
          
          {}
          <View style={estilos.separadorVertical} />
          
          {}
          {renderAjustesRapidos()}
        </View>
      </View>
      
      {}
      <Text style={estilos.textoTotal}>
        TOTAL: R${valorCredito.toFixed(2).replace('.', ',')}
      </Text>
      
      {}
      <View style={estilos.separadorHorizontal} />

      {}
      <Text style={estilos.tituloSecao}>Selecione a forma de pagamento</Text>

      <View style={estilos.containerPagamento}>
        
        {}
        <TouchableOpacity
          style={[
            estilos.botaoPagamento,
            formaPagamento === 'Pix' && estilos.botaoPagamentoSelecionado,
          ]}
          onPress={() => setFormaPagamento('Pix')}
        >
          <Text style={estilos.textoPagamento}>Pix</Text>
        </TouchableOpacity>
        
        {}
        <TouchableOpacity
          style={[
            estilos.botaoPagamento,
            formaPagamento === 'Cartão' && estilos.botaoPagamentoSelecionado,
          ]}
          onPress={() => setFormaPagamento('Cartão')}
        >
          <Text style={estilos.textoPagamento}>Cartão de{"\n"}Crédito / Débito</Text>
        </TouchableOpacity>
      </View>

      {}
      <TouchableOpacity 
        style={estilos.botaoFinalizar} 
        disabled={!formaPagamento || valorCredito <= 0}
        onPress={() => {
          Alert.alert("Compra", `Deseja pagar R$${valorCredito.toFixed(2).replace('.', ',')} via ${formaPagamento}?`);
        }}
      >
        <Text style={estilos.textoFinalizar}>Finalizar Compra</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
  },
  tituloSecao: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  containerSelecao: {
    marginBottom: 20,
  },
  secaoValores: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  linhaBotoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '45%',
    justifyContent: 'space-between',
  },
  botaoValor: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
    width: '48%', 
    marginBottom: 8,
    alignItems: 'center',
  },
  textoBotaoValor: {
    fontWeight: '500',
  },
  
  separadorVertical: {
    width: 1,
    height: '100%', 
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  secaoAjuste: {
    width: '45%',
  },
  linhaBotoesAjuste: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  botaoAjuste: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: '48%',
    alignItems: 'center',
  },
  textoBotaoAjuste: {
    fontSize: 12,
  },
  
  textoTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  separadorHorizontal: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 20,
  },

  containerPagamento: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  botaoPagamento: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 20,
    width: 130, 
    height: 130,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent', 
  },
  botaoPagamentoSelecionado: {
    borderColor: '#000', 
  },
  textoPagamento: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },


  botaoFinalizar: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 40,
  },
  textoFinalizar: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});