import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  Alert,
  Modal, 
  FlatList, 
} from 'react-native';

const CARTOES_CADASTRADOS = [
    { id: 1, bandeira: 'Visa', final: '1234', nome: 'João F. Silva' },
    { id: 2, bandeira: 'Mastercard', final: '5678', nome: 'João F. Silva' },
    { id: 3, bandeira: 'Elo', final: '9012', nome: 'João F. Silva' },
];

export default function PagamentoCartao({ navigation, route }) {
    
    const preco = 18.00;
    
    const [cartaoSelecionado, setCartaoSelecionado] = useState(CARTOES_CADASTRADOS[0] || null);
    const [mostrarModalCartoes, setMostrarModalCartoes] = useState(false);

    const handleConfirmarPagamento = () => {
        if (!cartaoSelecionado) {
            Alert.alert("Erro", "Por favor, selecione um cartão.");
            return;
        }

        Alert.alert(
            "🎉 Reserva Confirmada!",
            `Pagamento de R$${preco.toFixed(2).replace('.', ',')} realizado com sucesso no Cartão ${cartaoSelecionado.bandeira} final ${cartaoSelecionado.final}.`,
            [{ text: "OK", onPress: () => navigation.popToTop() }]
        );
    };

    const selecionarNovoCartao = (cartao) => {
        setCartaoSelecionado(cartao);
        setMostrarModalCartoes(false);
    }

    const getIconeCartao = (bandeira) => {
        if (bandeira === 'Visa') return '💳';
        if (bandeira === 'Mastercard') return 'Ⓜ️';
        if (bandeira === 'Elo') return '💳';
        return '💳';
    };

    const renderItemCartao = ({ item }) => (
        <TouchableOpacity
            style={estilos.itemLista}
            onPress={() => selecionarNovoCartao(item)}
        >
            <View style={estilos.cartaoDetalheModal}>
                <Text style={estilos.iconeCartaoModal}>{getIconeCartao(item.bandeira)}</Text>
                <View>
                    <Text style={estilos.textoCartaoBandeira}>{item.bandeira}</Text>
                    <Text style={estilos.textoCartaoFinal}>Final {item.final} ({item.nome})</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={estilos.tela}>
            <ScrollView contentContainerStyle={estilos.container}>
                
                <Text style={estilos.titulo}>1. Detalhes de Pagamento</Text>

                {}
                <View style={estilos.blocoSelecao}>
                    <Text style={estilos.label}>Cartão Selecionado:</Text>
                    
                    {}
                    <TouchableOpacity 
                        style={estilos.cartaoBox}
                        onPress={() => setMostrarModalCartoes(true)}
                    >
                        {cartaoSelecionado ? (
                            <View style={estilos.cartaoDetalhe}>
                                <Text style={estilos.iconeCartao}>{getIconeCartao(cartaoSelecionado.bandeira)}</Text>
                                <View>
                                    <Text style={estilos.textoCartaoBandeira}>{cartaoSelecionado.bandeira}</Text>
                                    <Text style={estilos.textoCartaoFinal}>Final {cartaoSelecionado.final}</Text>
                                </View>
                            </View>
                        ) : (
                            <Text style={estilos.textoPlaceholder}>Selecione um cartão</Text>
                        )}
                        <Text style={estilos.seta}>▼</Text>
                    </TouchableOpacity>

                    {}

                </View>

                {}
                <View style={[estilos.resumo, {marginBottom: 30}]}> {}
                    <Text style={estilos.resumoTexto}>Pagamento de Reserva:</Text>
                    <Text style={estilos.resumoValor}>R${preco.toFixed(2).replace('.', ',')}</Text>
                </View>
                
                {}
                <View style={{ height: 80 }} /> 

            </ScrollView>

            {}
            <TouchableOpacity 
                style={estilos.botaoRodape} 
                onPress={handleConfirmarPagamento}
            >
                <Text style={estilos.textoBotaoRodape}>Pagar R${preco.toFixed(2).replace('.', ',')} →</Text>
            </TouchableOpacity>

            {}
            <Modal visible={mostrarModalCartoes} transparent animationType="slide">
                <View style={estilos.modal}>
                    <View style={estilos.modalConteudo}>
                        <Text style={estilos.modalTitulo}>Escolha o Cartão</Text>
                        <FlatList
                            data={CARTOES_CADASTRADOS}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItemCartao}
                        />
                        <TouchableOpacity onPress={() => setMostrarModalCartoes(false)}>
                            <Text style={estilos.fecharModal}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}


const estilos = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        padding: 20,
        alignItems: 'center',
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginBottom: 30,
    },
    
    blocoSelecao: {
        width: '100%',
        marginBottom: 20, 
        paddingHorizontal: 10,
    },
    label: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    cartaoBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
    },
    cartaoDetalhe: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconeCartao: {
        fontSize: 25,
        marginRight: 15,
    },
    textoCartaoBandeira: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    textoCartaoFinal: {
        fontSize: 14,
        color: '#777',
    },
    textoPlaceholder: {
        fontSize: 16,
        color: '#777',
    },
    seta: {
        fontSize: 18,
        color: '#777',
    },

    resumo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    resumoTexto: {
        fontSize: 16,
        color: '#333',
    },
    resumoValor: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
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
        textAlign: 'center',
    },
    itemLista: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    cartaoDetalheModal: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconeCartaoModal: {
        fontSize: 20,
        marginRight: 10,
    },
    fecharModal: {
        marginTop: 15,
        textAlign: 'center',
        color: 'red',
        fontWeight: 'bold',
    },
});