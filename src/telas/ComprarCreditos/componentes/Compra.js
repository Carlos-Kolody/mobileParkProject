import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Modal, 
} from "react-native";

import usuario from "../../../mocks/usuario";

export default function ComprarCreditos({ navigation }) {
  const [precoFinal, setPrecoFinal] = useState(0);
  const [metodoPagamento, setMetodoPagamento] = useState(null);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState("");

  const valoresFixos = [150, 100, 50, 20];

  const atualizarPreco = (valor) => {
    const novoPreco = precoFinal + valor;
    if (novoPreco < 0) return;
    setPrecoFinal(novoPreco);
  };

  const finalizarCompra = () => {
    if (!metodoPagamento) {
      setMensagemAlerta("Por favor, selecione um método de pagamento antes de finalizar.");
      setMostrarAlerta(true);
      return;
    }

    if (precoFinal <= 0) {
      setMensagemAlerta("O valor da compra deve ser maior que R$0,00. Selecione a quantidade de créditos.");
      setMostrarAlerta(true);
      return;
    }

    if (metodoPagamento === "pix") {
      navigation.navigate("PagamentoPix", { preco: precoFinal });
    } else {
      navigation.navigate("PagamentoCartao", { preco: precoFinal });
    }
  };

  const AlertaPersonalizado = () => (
    <Modal
      transparent={true}
      visible={mostrarAlerta}
      animationType="fade"
      onRequestClose={() => setMostrarAlerta(false)}
    >
      <View style={estilos.modalBackground}>
        <View style={estilos.alertaContainer}>
          <Text style={estilos.alertaTitulo}>⚠️ Atenção</Text>
          <Text style={estilos.alertaMensagem}>{mensagemAlerta}</Text>
          <TouchableOpacity
            style={estilos.alertaBotao}
            onPress={() => setMostrarAlerta(false)}
          >
            <Text style={estilos.alertaTextoBotao}>Entendi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={estilos.tela}>
      <AlertaPersonalizado /> 
      
      <ScrollView contentContainerStyle={estilos.container}>
        <Text style={estilos.titulo}>Quanto créditos quer comprar?</Text>

        <View style={estilos.linha}>
          <View style={estilos.blocoValoresFixos}>
            {valoresFixos.map((valor) => (
              <TouchableOpacity
                key={valor}
                style={estilos.botaoFixo}
                onPress={() => setPrecoFinal(valor)}
              >
                <Text style={estilos.textoBotaoFixo}>R${valor},00</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={estilos.blocoVariavel}>
            <TouchableOpacity
              style={estilos.botaoVariavel}
              onPress={() => atualizarPreco(10)}
            >
              <Text style={estilos.textoVariavel}>+R$10,00</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={estilos.botaoVariavel}
              onPress={() => atualizarPreco(1)}
            >
              <Text style={estilos.textoVariavel}>+R$1,00</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={estilos.botaoVariavel}
              onPress={() => atualizarPreco(-1)}
            >
              <Text style={estilos.textoVariavel}>-R$1,00</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={estilos.botaoVariavel}
              onPress={() => atualizarPreco(-10)}
            >
              <Text style={estilos.textoVariavel}>-R$10,00</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={estilos.total}>TOTAL: R${precoFinal},00</Text>

        <Text style={estilos.subtitulo}>Selecione a forma de pagamento</Text>

        <View style={estilos.linhaPagamento}>
          <TouchableOpacity
            style={[
              estilos.opcaoPagamento,
              metodoPagamento === "pix" && estilos.opcaoSelecionada,
            ]}
            onPress={() => setMetodoPagamento("pix")}
          >
            <Text
              style={[
                estilos.textoPagamento,
                metodoPagamento === "pix" && estilos.textoSelecionado,
              ]}
            >
              Pix
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              estilos.opcaoPagamento,
              metodoPagamento === "cartao" && estilos.opcaoSelecionada,
            ]}
            onPress={() => setMetodoPagamento("cartao")}
          >
            <Text
              style={[
                estilos.textoPagamento,
                metodoPagamento === "cartao" && estilos.textoSelecionado,
              ]}
            >
              Cartão de Crédito / Débito
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={estilos.botaoFinalizar} onPress={finalizarCompra}>
          <Text style={estilos.textoFinalizar}>Finalizar Compra</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: "#fff" },
  container: { padding: 20 },
  titulo: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  linha: { flexDirection: "row", justifyContent: "space-between" },
  
  blocoValoresFixos: {
    width: "45%",
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "space-between", 
  },

  botaoFixo: {
    width: "48%", 
    paddingVertical: 15,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  textoBotaoFixo: { fontSize: 16, fontWeight: "bold" },

  blocoVariavel: {
    width: "45%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  botaoVariavel: {
    width: "48%",
    backgroundColor: "#eee",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },

  textoVariavel: { fontSize: 16, fontWeight: "bold" },

  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },

  subtitulo: { fontSize: 16, marginBottom: 10 },

  linhaPagamento: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  opcaoPagamento: {
    width: "48%",
    padding: 20,
    borderWidth: 2, 
    borderColor: "#ccc",
    borderRadius: 12, 
    alignItems: "center",
    backgroundColor: "#f9f9f9", 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, 
  },

  opcaoSelecionada: {
    borderColor: "#4a90e2", 
    backgroundColor: "#e6f0ff", 
  },

  textoPagamento: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333", 
    textAlign: "center",
  },

  textoSelecionado: {
    color: "#4a90e2", 
  },

  botaoFinalizar: {
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 8,
  },

  textoFinalizar: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  
  
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertaContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 10, 
  },
  alertaTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#D00', 
  },
  alertaMensagem: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  alertaBotao: {
    backgroundColor: '#4a90e2',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  alertaTextoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});