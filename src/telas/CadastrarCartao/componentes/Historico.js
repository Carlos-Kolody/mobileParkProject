import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    SafeAreaView,
    TouchableOpacity 
} from 'react-native';


import usuario from "../../../mocks/usuario"; 

export default function HistoricoCartoes({ navigation }) {

    const renderItem = ({ item }) => (
        <View style={estilos.cardContainer}>
            <View style={estilos.cardHeader}>
                {}
                <Text style={estilos.cardEmoji}>{item.bandeiraEmoji}</Text>
                <Text style={estilos.cardBandeira}>{item.bandeira}</Text>
            </View>
            <View style={estilos.cardBody}>
                <Text style={estilos.cardFinal}>Final: **** **** **** {item.final}</Text>
                <Text style={estilos.cardTitular}>Titular: {item.nomeTitular}</Text>
                <Text style={estilos.cardValidade}>Validade: {item.validade}</Text>
            </View>
            {}
            <TouchableOpacity 
                style={estilos.botaoExcluir} 
                onPress={() => alert(`Funcionalidade Excluir para o cartão final ${item.final}`)}
            >
                <Text style={estilos.textoBotaoExcluir}>Excluir</Text>
            </TouchableOpacity>
        </View>
    );

    const cartoes = usuario.cartoes || [];

    if (cartoes.length === 0) {
        return (
            <SafeAreaView style={estilos.telaVazia}>
                <Text style={estilos.textoVazio}>Nenhum cartão cadastrado ainda. 🥺</Text>
                <TouchableOpacity 
                    style={estilos.botaoVoltar} 
                    onPress={() => navigation.goBack()}
                >
                    <Text style={estilos.textoBotaoVoltar}>Voltar ao Cadastro</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={estilos.tela}>
            <Text style={estilos.titulo}>Histórico de Cartões Cadastrados</Text>
            <FlatList
                data={cartoes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={estilos.lista}
            />
        </SafeAreaView>
    );
}

const estilos = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    telaVazia: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    textoVazio: {
        fontSize: 18,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
    },
    botaoVoltar: {
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    textoBotaoVoltar: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        textAlign: 'center',
    },
    lista: {
        padding: 20,
    },
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 5,
    },
    cardEmoji: {
        fontSize: 24,
        marginRight: 10,
    },
    cardBandeira: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    cardBody: {
        marginLeft: 5,
    },
    cardFinal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 3,
    },
    cardTitular: {
        fontSize: 14,
        color: '#555',
    },
    cardValidade: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    botaoExcluir: {
        backgroundColor: '#FF3B30',
        padding: 8,
        borderRadius: 5,
        marginTop: 15,
        alignSelf: 'flex-end',
    },
    textoBotaoExcluir: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    }
});