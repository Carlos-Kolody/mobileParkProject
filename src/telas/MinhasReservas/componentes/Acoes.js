import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Alert, FlatList } from 'react-native';

export default function ConfirmarReserva({ navigation, route }) {
  
  const [reservasAtivas, setReservasAtivas] = useState([
    { id: 1, veiculo: { nome: 'Super Kwid', placa: 'GTR 4J29' }, dataHora: '13/10/2025 || 15:00 - 22:00', estacionamento: 'Shopping Palladium' },
    { id: 2, veiculo: { nome: 'Super Peugeot', placa: 'ABC 1D23' }, dataHora: '14/10/2025 || 09:00 - 18:00', estacionamento: 'Shopping Estação' },
  ]);
  
  const [mostrarModal, setMostrarModal] = useState(false);
  const [reservaParaCancelar, setReservaParaCancelar] = useState(null);

  const handleCancelar = (reserva) => {
    setReservaParaCancelar(reserva);
    setMostrarModal(true);
  };

  const confirmarCancelamento = () => {
    if (reservaParaCancelar) {
      setReservasAtivas(reservasAtivas.filter(r => r.id !== reservaParaCancelar.id));
      
      Alert.alert(
        "Sucesso", 
        `Reserva do ${reservaParaCancelar.veiculo.nome} em ${reservaParaCancelar.estacionamento} foi cancelada.`,
        [{ text: "OK" }]
      );
    }
    

    setMostrarModal(false);
    setReservaParaCancelar(null);
  };

  const renderItemReserva = ({ item }) => (
    <View style={estilos.blocoReserva}>
      {}
      <View style={estilos.caixaTopo}>
        <View style={estilos.itemTopo}>
          <Text style={estilos.iconeTopo}>🕒</Text>
          <Text style={estilos.textoTopo}>{item.dataHora}</Text>
        </View>
        <View style={estilos.itemTopo}>
          <Text style={estilos.iconeTopo}>📍</Text>
          <Text style={estilos.textoTopo}>{item.estacionamento}</Text>
        </View>
      </View>
      
      {}
      <View style={estilos.caixaVeiculo}>
        <View style={estilos.detalhesVeiculo}>
          <Text style={estilos.iconeVeiculo}>🚗</Text>
          <View>
            <Text style={estilos.titulo}>{item.veiculo.nome}</Text>
            <Text style={estilos.subtitulo}>{item.veiculo.placa}</Text>
          </View>
        </View>

        {}
        <TouchableOpacity style={estilos.botaoCancelar} onPress={() => handleCancelar(item)}>
          <Text style={estilos.textoCancelar}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={estilos.tela}>
      
      {}
      {reservasAtivas.length > 0 ? (
        <FlatList
          data={reservasAtivas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItemReserva}
          contentContainerStyle={estilos.container}
        />
      ) : (
        <View style={estilos.containerVazio}>
          <Text style={estilos.textoVazio}>Nenhuma reserva ativa.</Text>
        </View>
      )}

      {}
      <Modal visible={mostrarModal} transparent animationType="fade">
        <View style={estilos.modal}>
          <View style={estilos.modalConteudo}>
            <Text style={estilos.modalTitulo}>Cancelar Reserva</Text>
            <Text style={estilos.modalMensagem}>
              Tem certeza que deseja cancelar a reserva para 
              **{reservaParaCancelar?.veiculo?.nome}** em **{reservaParaCancelar?.estacionamento}**?
            </Text>
            
            <View style={estilos.modalBotoes}>
              <TouchableOpacity style={estilos.modalBotao} onPress={() => setMostrarModal(false)}>
                <Text style={estilos.modalTexto}>Não</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[estilos.modalBotao, estilos.modalBotaoConfirmar]} 
                onPress={confirmarCancelamento}
              >
                <Text style={estilos.modalTextoConfirmar}>Sim, Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  containerVazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoVazio: {
    fontSize: 18,
    color: '#999',
  },
  blocoReserva: {
    marginBottom: 20, 
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000', 
  },

  caixaTopo: {
    marginBottom: 10,
    paddingLeft: 5,
  },
  itemTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  iconeTopo: {
    fontSize: 20,
    marginRight: 8,
  },
  textoTopo: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },

  caixaVeiculo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000', 
    borderRadius: 8,
    padding: 16,
  },
  detalhesVeiculo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconeVeiculo: {
    fontSize: 30,
    marginRight: 10,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 14,
    color: '#555',
  },
  
  botaoCancelar: {
    borderWidth: 1,
    borderColor: 'red', 
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginLeft: 10,
  },
  textoCancelar: {
    fontWeight: 'bold',
    color: 'red',
  },

  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalConteudo: {
    backgroundColor: '#fff',
    padding: 20,
    width: '85%',
    borderRadius: 10,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMensagem: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalBotao: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  modalBotaoConfirmar: {
    backgroundColor: 'red',
    borderColor: 'red',
    marginLeft: 10,
  },
  modalTexto: {
    color: '#333',
    fontWeight: 'bold',
  },
  modalTextoConfirmar: {
    color: '#fff',
    fontWeight: 'bold',
  },
});