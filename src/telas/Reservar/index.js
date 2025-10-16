import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Reservar({ navigation }) {
  const [veiculo, setVeiculo] = useState({ nome: 'Super Kwid', placa: 'GTR 4J29' });
  const [estacionamento, setEstacionamento] = useState('Shopping Palladium');
  const [data, setData] = useState(new Date(2025, 9, 13));
  const [horaInicio, setHoraInicio] = useState('15:00');
  const [horaFim, setHoraFim] = useState('22:00');

  const [mostrarVeiculos, setMostrarVeiculos] = useState(false);
  const [mostrarEstacionamentos, setMostrarEstacionamentos] = useState(false);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [mostrarRelogioInicio, setMostrarRelogioInicio] = useState(false);
  const [mostrarRelogioFim, setMostrarRelogioFim] = useState(false);

  const veiculos = [
    { nome: 'Super Kwid', placa: 'GTR 4J29' },
    { nome: 'Onix LT', placa: 'ABC 1D23' },
    { nome: 'HB20 Comfort', placa: 'XYZ 9A88' },
  ];

  const estacionamentosLista = [
    'Shopping Palladium',
    'Shopping Estação',
    'Estacionamento Central',
    'Aeroporto Afonso Pena',
  ];

  const aoSelecionarData = (event, selectedDate) => {
    setMostrarCalendario(false);
    if (selectedDate) {
      setData(selectedDate);
      setMostrarRelogioInicio(true);
    }
  };

  const aoSelecionarHoraInicio = (event, selectedTime) => {
    setMostrarRelogioInicio(false);
    if (selectedTime) {
      const horas = selectedTime.getHours().toString().padStart(2, '0');
      const minutos = selectedTime.getMinutes().toString().padStart(2, '0');
      setHoraInicio(`${horas}:${minutos}`);
      setMostrarRelogioFim(true);
    }
  };

  const aoSelecionarHoraFim = (event, selectedTime) => {
    setMostrarRelogioFim(false); 
    if (selectedTime) {
      const horas = selectedTime.getHours().toString().padStart(2, '0');
      const minutos = selectedTime.getMinutes().toString().padStart(2, '0');
      setHoraFim(`${horas}:${minutos}`);
    }
  };

  return (
    <View style={estilos.tela}>
      <ScrollView contentContainerStyle={estilos.container}>
        {/* Saldo (Pode ser removido se o cabeçalho já mostrar) */}
        <Text style={estilos.saldo}>Saldo: R$23,00</Text>

        {/* Seção Veículo */}
        <Text style={estilos.tituloSecao}>Selecione o veículo:</Text>
        <View style={estilos.caixa}>
          <View style={estilos.infoContainer}>
            <Text style={estilos.icone}>🚗</Text>
            <View>
              <Text style={estilos.titulo}>{veiculo.nome}</Text>
              <Text style={estilos.subtitulo}>{veiculo.placa}</Text>
            </View>
          </View>
          <TouchableOpacity style={estilos.botaoTrocar} onPress={() => setMostrarVeiculos(true)}>
            <Text style={estilos.textoTrocar}>Trocar</Text>
          </TouchableOpacity>
        </View>

        {}
        <Text style={estilos.tituloSecao}>Selecione o estacionamento:</Text>
        <View style={estilos.caixa}>
          <View style={estilos.infoContainer}>
            <Text style={estilos.icone}>🅿️</Text>
            <View>
              <Text style={estilos.titulo}>{estacionamento}</Text>
            </View>
          </View>
          <TouchableOpacity style={estilos.botaoTrocar} onPress={() => setMostrarEstacionamentos(true)}>
            <Text style={estilos.textoTrocar}>Trocar</Text>
          </TouchableOpacity>
        </View>

        {/* Seção Data e Período */}
        <Text style={estilos.tituloSecao}>Selecione a data e o período:</Text>
        <View style={estilos.caixa}>
          <View style={estilos.infoContainer}>
            <Text style={estilos.icone}>📅</Text>
            <View>
              <Text style={estilos.titulo}>{data.toLocaleDateString('pt-BR')}</Text>
              <Text style={estilos.subtitulo}>{horaInicio} às {horaFim}</Text>
            </View>
          </View>
          <TouchableOpacity style={estilos.botaoTrocar} onPress={() => setMostrarCalendario(true)}>
            <Text style={estilos.textoTrocar}>Trocar</Text>
          </TouchableOpacity>
        </View>

        {/* Botão Avançar */}
        <TouchableOpacity style={estilos.botaoAvancar} onPress={() => navigation.navigate('ConfirmarReserva')}>
          <Text style={estilos.textoAvancar}>Avançar →</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal de veículos */}
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
                  }}>
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

      {/* Modal de estacionamentos */}
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
                  }}>
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

      {/* Seletores de data e hora */}
      {mostrarCalendario && (
        <DateTimePicker value={data} mode="date" display="calendar" onChange={aoSelecionarData} />
      )}
      {mostrarRelogioInicio && (
        <DateTimePicker value={data} mode="time" is24Hour display="clock" onChange={aoSelecionarHoraInicio} />
      )}
      {mostrarRelogioFim && (
        <DateTimePicker value={data} mode="time" is24Hour display="clock" onChange={aoSelecionarHoraFim} />
      )}
    </View>
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
    marginBottom: 8,
    fontSize: 16,
  },
  caixa: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icone: {
    fontSize: 24,
    marginRight: 12,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 14,
    color: '#555',
  },
  botaoTrocar: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
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
    justifyContent: 'flex-end',
  },
  modalConteudo: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  itemLista: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  fecharModal: {
    marginTop: 20,
    padding: 10,
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
  },
});