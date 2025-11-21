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
    FlatList 
} from 'react-native';

// CAMINHO CORRIGIDO
import usuario from "../../../mocks/usuario";

const CARTOES_CADASTRADOS = [
    { id: 1, bandeira: 'Visa', final: '1234', nome: 'Gabriel A. Vale' },
    { id: 2, bandeira: 'Mastercard', final: '5678', nome: 'Gabriel A. Vale' },
];

export default function PagamentoCartao({ navigation, route }) {

    const preco = route.params?.preco ?? 0;

    const [cartaoSelecionado, setCartaoSelecionado] = useState(CARTOES_CADASTRADOS[0]);
    const [mostrarModalCartoes, setMostrarModalCartoes] = useState(false);
    
    // NOVOS ESTADOS PARA CONTROLE DOS MODAIS PERSONALIZADOS
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [mostrarSucesso, setMostrarSucesso] = useState(false);
    const [novoSaldoDisplay, setNovoSaldoDisplay] = useState('');


    // MANTIDA, mas agora ela apenas aciona o modal de CONFIRMAÇÃO
    const handleConfirmarPagamento = () => {
        // Abre o modal de confirmação
        setMostrarConfirmacao(true);
    };

    // NOVA FUNÇÃO: Executa a lógica após a confirmação do usuário no modal
    const processarPagamento = () => {
        // 1. Fecha o modal de confirmação
        setMostrarConfirmacao(false);

        // 2. Lógica de atualização de saldo
        const valorAtual = Number(usuario.saldo.replace("R$", "").replace(",", "."));
        const novoSaldo = valorAtual + preco;
        const novoSaldoFormatado = `R$${novoSaldo.toFixed(2).replace(".", ",")}`;

        // 3. Atualiza o saldo do mock (simulação)
        usuario.saldo = novoSaldoFormatado;
        
        // 4. Salva o novo saldo para exibir no modal de sucesso
        setNovoSaldoDisplay(novoSaldoFormatado);

        // 5. Abre o modal de sucesso
        setMostrarSucesso(true);
    };

    // NOVA FUNÇÃO: Redireciona para Home após o sucesso
    const handleFinalizar = () => {
        setMostrarSucesso(false);
        navigation.navigate("Home");
    };


    const selecionarNovoCartao = (cartao) => {
        setCartaoSelecionado(cartao);
        setMostrarModalCartoes(false);
    };

    const getIconeCartao = (bandeira) => {
        if (bandeira === 'Visa') return '💳';
        if (bandeira === 'Mastercard') return 'Ⓜ️';
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

    // Componente Modal de Confirmação Personalizado
    const ModalConfirmacao = () => (
        <Modal 
            visible={mostrarConfirmacao} 
            transparent 
            animationType="fade"
            onRequestClose={() => setMostrarConfirmacao(false)}
        >
            <View style={estilos.modalOverlay}>
                <View style={estilos.modalPersonalizado}>
                    <Text style={estilos.modalTituloPersonalizado}>Confirmação de Compra</Text>
                    <Text style={estilos.modalMensagem}>
                        Você confirma a compra de créditos no valor de 
                        <Text style={{fontWeight: 'bold'}}> R${preco.toFixed(2).replace('.', ',')} </Text>
                        usando o cartão {cartaoSelecionado.bandeira} (Final {cartaoSelecionado.final})?
                    </Text>
                    <View style={estilos.modalBotoes}>
                        <TouchableOpacity 
                            style={[estilos.botaoModal, estilos.botaoCancelar]} 
                            onPress={() => setMostrarConfirmacao(false)}
                        >
                            <Text style={estilos.textoBotaoModal}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[estilos.botaoModal, estilos.botaoConfirmar]} 
                            onPress={processarPagamento}
                        >
                            <Text style={estilos.textoBotaoModal}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );

    // Componente Modal de Sucesso Personalizado
    const ModalSucesso = () => (
        <Modal 
            visible={mostrarSucesso} 
            transparent 
            animationType="fade"
            onRequestClose={handleFinalizar}
        >
            <View style={estilos.modalOverlay}>
                <View style={estilos.modalPersonalizado}>
                    <Text style={[estilos.modalTituloPersonalizado, { color: '#007bff' }]}>✅ Saldo Atualizado!</Text>
                    <Text style={estilos.modalMensagem}>
                        A compra de R${preco.toFixed(2).replace('.', ',')} foi aprovada e seu novo saldo é:
                    </Text>
                    <Text style={estilos.novoSaldoText}>{novoSaldoDisplay}</Text>
                    <TouchableOpacity 
                        style={[estilos.botaoModal, estilos.botaoConfirmar, { width: '80%', marginTop: 20 }]} 
                        onPress={handleFinalizar}
                    >
                        <Text style={estilos.textoBotaoModal}>Ir para a Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );


    return (
        <SafeAreaView style={estilos.tela}>
            
            {/* INSERÇÃO DOS MODAIS PERSONALIZADOS */}
            <ModalConfirmacao />
            <ModalSucesso />

            <ScrollView contentContainerStyle={estilos.container}>
                
                <Text style={estilos.titulo}>1. Detalhes de Pagamento</Text>

                <View style={estilos.blocoSelecao}>
                    <Text style={estilos.label}>Cartão Selecionado:</Text>
                    
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

                </View>

                <View style={[estilos.resumo, { marginBottom: 30 }]}>
                    <Text style={estilos.resumoTexto}>Total de créditos:</Text>
                    <Text style={estilos.resumoValor}>R${preco.toFixed(2).replace('.', ',')}</Text>
                </View>

                <View style={{ height: 80 }} /> 
            </ScrollView>

            <TouchableOpacity 
                style={estilos.botaoRodape} 
                onPress={handleConfirmarPagamento}
            >
                <Text style={estilos.textoBotaoRodape}>
                    Pagar R${preco.toFixed(2).replace('.', ',')} →
                </Text>
            </TouchableOpacity>

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

    // --- ESTILOS DO MODAL DE SELEÇÃO DE CARTÃO ---
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

    // --- NOVOS ESTILOS PARA MODAIS PERSONALIZADOS ---
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalPersonalizado: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 25,
        alignItems: 'center',
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
    },
    modalTituloPersonalizado: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
        textAlign: 'center',
    },
    modalMensagem: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 24,
        color: '#555',
    },
    novoSaldoText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 15,
    },
    modalBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    botaoModal: {
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        width: '48%',
    },
    botaoCancelar: {
        backgroundColor: '#ccc',
    },
    botaoConfirmar: {
        backgroundColor: '#000', // Manter preto para ação principal
    },
    textoBotaoModal: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});