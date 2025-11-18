import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Modal, 
  FlatList, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';


export default function Reservar({ navigation }) {
  const [veiculo, setVeiculo] = useState({ nome: 'Super Kwid', placa: 'GTR 4J29' });
  const [estacionamento, setEstacionamento] = useState('Shopping Palladium');
  
  const [dataTexto, setDataTexto] = useState('13/10/2025');
  const [horaInicio, setHoraInicio] = useState('15:00');
  const [horaFim, setHoraFim] = useState('22:00');

  const [mostrarVeiculos, setMostrarVeiculos] = useState(false);
  const [mostrarEstacionamentos, setMostrarEstacionamentos] = useState(false);
  

  const veiculos = [
    { nome: 'Super Kwid', placa: 'GTR 4J29' },
    { nome: 'Super Peugeot', placa: 'ABC 1D23' },
    { nome: 'HB20 Comfort', placa: 'XYZ 9A88' },
  ];

  const estacionamentosLista = [
    'Shopping Palladium',
    'Shopping Estação',
    'Aeroporto Afonso Pena',
  ];

  return (
    <KeyboardAvoidingView
      style={estilos.tela}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <ScrollView contentContainerStyle={estilos.container}>
        {}
        <Text style={estilos.saldo}>Saldo: R$23,00</Text>

        {}
        <Text style={estilos.tituloSecao}>Selecione o veículo:</Text>
        <View style={estilos.caixa}>
          <View>
            <Text style={estilos.icone}>🚗</Text>
            <Text style={estilos.titulo}>{veiculo.nome}</Text>
            <Text style={estilos.subtitulo}>{veiculo.placa}</Text>
          </View>
          <TouchableOpacity style={estilos.botaoTrocar} onPress={() => setMostrarVeiculos(true)}>
            <Text style={estilos.textoTrocar}>Trocar</Text>
          </TouchableOpacity>
        </View>

        {}
        <Text style={estilos.tituloSecao}>Selecione o estacionamento:</Text>
        <View style={estilos.caixa}>
          <View>
            <Text style={estilos.icone}>🅿️</Text>
            <Text style={estilos.titulo}>{estacionamento}</Text>
          </View>
          <TouchableOpacity style={estilos.botaoTrocar} onPress={() => setMostrarEstacionamentos(true)}>
            <Text style={estilos.textoTrocar}>Trocar</Text>
          </TouchableOpacity>
        </View>

        {}
        <Text style={estilos.tituloSecao}>Selecione a data e o período (digite):</Text>
        <View style={[estilos.caixa, { justifyContent: 'space-around' }]}>
          {}
          <View>
            <Text style={estilos.titulo}>Data:</Text>
            <TextInput
              style={estilos.inputTempo}
              value={dataTexto}
              onChangeText={setDataTexto}
              placeholder="DD/MM/AAAA"
              keyboardType="numeric"
              maxLength={10}
            />
          </View>
          {}
          <View>
            <Text style={estilos.titulo}>Início:</Text>
            <TextInput
              style={estilos.inputTempo}
              value={horaInicio}
              onChangeText={setHoraInicio}
              placeholder="HH:MM"
              keyboardType="numeric"
              maxLength={5}
            />
          </View>
          {}
          <View>
            <Text style={estilos.titulo}>Fim:</Text>
            <TextInput
              style={estilos.inputTempo}
              value={horaFim}
              onChangeText={setHoraFim}
              placeholder="HH:MM"
              keyboardType="numeric"
              maxLength={5}
            />
          </View>
        </View>

        {}
        <TouchableOpacity style={estilos.botaoAvancar} onPress={() => navigation.navigate('ConfirmarReserva')}>
          <Text style={estilos.textoAvancar}>Avançar →</Text>
        </TouchableOpacity>
      </ScrollView>

      {}
      <Modal visible={mostrarVeiculos} transparent animationType="slide">
        <View style={estilos.modal}>
          <View style={estilos.modalConteudo}>
            <Text style={estilos.modalTitulo}>Escolha o veículo</Text>
            <FlatList
              data={veiculos}
              keyExtractor={(item) => item.placa}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={estilos.itemLista}
                  onPress={() => {
                    setVeiculo(item);
                    setMostrarVeiculos(false);
                  }}
                >
                  <Text>{item.nome} ({item.placa})</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setMostrarVeiculos(false)}>
              <Text style={estilos.fecharModal}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {}
      <Modal visible={mostrarEstacionamentos} transparent animationType="slide">
        <View style={estilos.modal}>
          <View style={estilos.modalConteudo}>
            <Text style={estilos.modalTitulo}>Escolha o estacionamento</Text>
            <FlatList
              data={estacionamentosLista}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={estilos.itemLista}
                  onPress={() => {
                    setEstacionamento(item);
                    setMostrarEstacionamentos(false);
                  }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setMostrarEstacionamentos(false)}>
              <Text style={estilos.fecharModal}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {}
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
  },
  saldo: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 6,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  tituloSecao: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  caixa: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  icone: {
    fontSize: 22,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 14,
    color: '#555',
  },
  botaoTrocar: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-end',
  },
  textoTrocar: {
    fontWeight: 'bold',
  },
  botaoAvancar: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  textoAvancar: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalConteudo: {
    backgroundColor: '#fff',
    padding: 20,
    width: '80%',
    borderRadius: 10,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemLista: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  fecharModal: {
    marginTop: 10,
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
  },
  inputTempo: {
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    padding: 5,
    fontSize: 14,
    width: 85, 
    textAlign: 'center',
  }
});