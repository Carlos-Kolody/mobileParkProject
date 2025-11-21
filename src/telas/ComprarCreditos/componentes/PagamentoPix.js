import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    ScrollView, 
    SafeAreaView,
    Modal,
    Image
} from 'react-native';

import usuario from "../../../mocks/usuario";

const QrCodeImage = require("../../../../assets/qrcode.png");

export default function PagamentoPix({ navigation, route }) {

    const preco = route.params?.preco ?? 0;
    
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [mostrarSucesso, setMostrarSucesso] = useState(false);
    const [novoSaldoDisplay, setNovoSaldoDisplay] = useState('');


    const handleCopyCode = () => { 
        console.log("CÓDIGO: Copiar (Frontend)"); 
    };
    
    const handleJaPaguei = () => {
        setMostrarConfirmacao(true);
    };

    const processarPagamento = () => {
        setMostrarConfirmacao(false);

        const valorAtual = Number(usuario.saldo.replace("R$", "").replace(",", "."));
        const novoSaldo = valorAtual + preco;
        const novoSaldoFormatado = `R$${novoSaldo.toFixed(2).replace(".", ",")}`;

        usuario.saldo = novoSaldoFormatado;
        
        setNovoSaldoDisplay(novoSaldoFormatado);

        setMostrarSucesso(true);
    };

    const handleFinalizar = () => {
        setMostrarSucesso(false);
        navigation.navigate("Home");
    };


    const ModalConfirmacao = () => (
        <Modal 
            visible={mostrarConfirmacao} 
            transparent 
            animationType="fade"
            onRequestClose={() => setMostrarConfirmacao(false)}
        >
            <View style={estilosPix.modalOverlay}>
                <View style={estilosPix.modalPersonalizado}>
                    <Text style={estilosPix.modalTituloPersonalizado}>Confirmação de Pagamento</Text>
                    <Text style={estilosPix.modalMensagem}>
                        Ao clicar em "Paguei o PIX", você confirma que o pagamento de 
                        <Text style={{fontWeight: 'bold'}}> R${preco.toFixed(2).replace('.', ',')} </Text>
                        foi realizado. Deseja prosseguir com a confirmação?
                    </Text>
                    <View style={estilosPix.modalBotoes}>
                        <TouchableOpacity 
                            style={[estilosPix.botaoModal, estilosPix.botaoCancelarModal]} 
                            onPress={() => setMostrarConfirmacao(false)}
                        >
                            <Text style={estilosPix.textoBotaoModal}>Voltar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[estilosPix.botaoModal, estilosPix.botaoConfirmarModal]} 
                            onPress={processarPagamento}
                        >
                            <Text style={estilosPix.textoBotaoModal}>Paguei o PIX</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );

    const ModalSucesso = () => (
        <Modal 
            visible={mostrarSucesso} 
            transparent 
            animationType="fade"
            onRequestClose={handleFinalizar}
        >
            <View style={estilosPix.modalOverlay}>
                <View style={estilosPix.modalPersonalizado}>
                    <Text style={[estilosPix.modalTituloPersonalizado, { color: 'green' }]}>✅ PIX Confirmado!</Text>
                    <Text style={estilosPix.modalMensagem}>
                        A compra de R${preco.toFixed(2).replace('.', ',')} foi confirmada e seu novo saldo é:
                    </Text>
                    <Text style={estilosPix.novoSaldoText}>{novoSaldoDisplay}</Text>
                    <TouchableOpacity 
                        style={[estilosPix.botaoModal, estilosPix.botaoConfirmarModal, { width: '80%', marginTop: 20 }]} 
                        onPress={handleFinalizar}
                    >
                        <Text style={estilosPix.textoBotaoModal}>Ir para a Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
    
    return (
        <SafeAreaView style={estilosPix.tela}>
            
            {}
            <ModalConfirmacao />
            <ModalSucesso />

            <ScrollView contentContainerStyle={estilosPix.container}>
                
                <Text style={estilosPix.titulo}>1. Código PIX</Text>

                {}
                <View style={estilosPix.qrCodeContainer}>
                    {}
                    <Image 
                        source={QrCodeImage}
                        style={estilosPix.qrCodeImage}
                        resizeMode="contain"
                        onError={(e) => console.log('Erro ao carregar QR Code:', e.nativeEvent.error)}
                    />
                </View>

                <TouchableOpacity onPress={handleCopyCode}>
                    <Text style={estilosPix.textoCopiar}>Copiar Código</Text>
                </TouchableOpacity>

                <Text style={estilosPix.textoRodape}>
                    Após realizar o pagamento no seu banco, clique em "JÁ PAGUEI" para que a confirmação dos créditos seja processada.
                </Text>


                <View style={estilosPix.containerBotoesAcao}>

                    <TouchableOpacity
                        style={[estilosPix.botaoAcao, estilosPix.botaoJaPaguei]}
                        onPress={handleJaPaguei}
                    >
                        <Text style={estilosPix.textoJaPaguei}>JÁ PAGUEI</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={[estilosPix.botaoAcao, estilosPix.botaoCancelar]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={estilosPix.textoCancelar}>CANCELAR</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 80 }} /> 
            </ScrollView>

            <View style={estilosPix.barraRodapeFixa}>
                <Text style={estilosPix.textoRodapeFixo}>PIX: R${preco.toFixed(2).replace('.', ',')}</Text>
            </View>
        </SafeAreaView>
    );
}


const estilosPix = StyleSheet.create({
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
        marginBottom: 20,
    },
    
    qrCodeContainer: {
        width: 250, 
        height: 250,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qrCodeImage: {
        width: '100%',
        height: '100%',
    },
    textoCopiar: {
        color: '#000',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginBottom: 30,
    },
    textoRodape: {
        textAlign: 'center',
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
        marginHorizontal: 10,
        marginBottom: 30,
    },
    containerBotoesAcao: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    botaoAcao: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderWidth: 1,
        width: '45%',
        alignItems: 'center',
    },
    botaoJaPaguei: {
        borderColor: '#000',
        backgroundColor: '#000',
    },
    textoJaPaguei: {
        color: '#fff',
        fontWeight: 'bold',
    },
    botaoCancelar: {
        borderColor: '#ccc',
    },
    textoCancelar: {
        color: '#555',
        fontWeight: 'bold',
    },
    barraRodapeFixa: {
        backgroundColor: '#000',
        paddingVertical: 16,
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: 30,
    },
    textoRodapeFixo: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

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
    botaoCancelarModal: { 
        backgroundColor: '#ccc',
    },
    botaoConfirmarModal: {
        backgroundColor: '#000', 
    },
    textoBotaoModal: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});