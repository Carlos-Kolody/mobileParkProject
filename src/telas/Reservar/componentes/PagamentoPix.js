import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  Alert 
} from 'react-native';

export default function PagamentoPix({ navigation }) {
    
    const precoSimulado = 18.00;

    const handleCopyCode = () => { console.log("CÓDIGO: Copiar (Frontend)"); };
    
    const handleJaPaguei = () => {
        Alert.alert(
            "🎉 Reserva Confirmada!",
            "Seu pagamento PIX foi verificado. Sua reserva no Shopping Palladium está ativa.",
            [
                { 
                    text: "Ver Reserva", 
                    onPress: () => navigation.popToTop() 
                }
            ]
        );
    };
    
    const handleCancelar = () => { console.log("CÓDIGO: Cancelar (Frontend)"); };

    return (
        <SafeAreaView style={estilosPix.tela}>
            <ScrollView contentContainerStyle={estilosPix.container}>
                
                {}
                <Text style={estilosPix.titulo}>1. Código PIX</Text>

                {}
                <View style={estilosPix.qrCodeBox}>
                    {}
                    <Text style={{ textAlign: 'center', fontSize: 100, marginBottom: 5 }}>██</Text> 
                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>QR Code Exemplo</Text> 
                    

[Image of a QR code]

                </View>

                {}
                <TouchableOpacity onPress={handleCopyCode}>
                    <Text style={estilosPix.textoCopiar}>Copiar Código</Text>
                </TouchableOpacity>

                {}
                <View style={estilosPix.containerBotoesAcao}>
                    
                    {}
                    <TouchableOpacity
                        style={[estilosPix.botaoAcao, estilosPix.botaoJaPaguei]}
                        onPress={handleJaPaguei}
                    >
                        <Text style={estilosPix.textoJaPaguei}>JÁ PAGUEI</Text>
                    </TouchableOpacity>
                    
                    {/* Cancelar */}
                    <TouchableOpacity
                        style={[estilosPix.botaoAcao, estilosPix.botaoCancelar]}
                        onPress={handleCancelar}
                    >
                        <Text style={estilosPix.textoCancelar}>CANCELAR</Text>
                    </TouchableOpacity>
                </View>

                {}
                <Text style={estilosPix.textoRodape}>
                    Após o pagamento sua reserva será confirmada. Você pode solicitar o cancelamento da reserva até 48 horas antes do check-in, o valor será reembolsado em créditos EasyPark
                </Text>

                {/* Espaço para o rodapé fixo */}
                <View style={{ height: 80 }} /> 

            </ScrollView>

            {}
            <View style={estilosPix.barraRodapeFixa}>
                <Text style={estilosPix.textoRodapeFixo}>PIX: R${precoSimulado.toFixed(2).replace('.', ',')}</Text>
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
    qrCodeBox: {
        width: 200, 
        height: 200,
        marginBottom: 10,
        backgroundColor: '#f0f0f0', 
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
    },
    textoCopiar: {
        color: '#000',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
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
        borderColor: 'green',
        backgroundColor: 'rgba(0, 128, 0, 0.1)',
    },
    textoJaPaguei: {
        color: 'green',
        fontWeight: 'bold',
    },
    botaoCancelar: {
        borderColor: 'red',
    },
    textoCancelar: {
        color: 'red',
        fontWeight: 'bold',
    },
    textoRodape: {
        textAlign: 'center',
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
        marginHorizontal: 10,
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
});