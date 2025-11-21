import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    SafeAreaView,
    FlatList,
} from 'react-native';

import usuario from "../../../mocks/usuario";

const ItemVeiculo = ({ veiculo }) => (
    <View style={estilosHistorico.item}>
        <Text style={estilosHistorico.itemTitulo}>{veiculo.apelido || veiculo.modelo}</Text>
        <Text style={estilosHistorico.itemDetalhe}>Modelo: {veiculo.modelo}</Text>
        <Text style={estilosHistorico.itemDetalhe}>Placa: {veiculo.placa}</Text>
        <Text style={estilosHistorico.itemDetalhe}>Cor: {veiculo.cor}</Text>
    </View>
);

export default function HistoricoCarros() {
    
    const listaVeiculos = usuario.veiculos || [];
    
    return (
        <SafeAreaView style={estilosHistorico.tela}>
            <View style={estilosHistorico.container}>
                <Text style={estilosHistorico.titulo}>Meus Veículos Cadastrados</Text>
                
                {listaVeiculos.length === 0 ? (
                    <Text style={estilosHistorico.mensagemVazia}>Nenhum veículo cadastrado ainda.</Text>
                ) : (
                    <FlatList
                        data={listaVeiculos}
                        renderItem={({ item }) => <ItemVeiculo veiculo={item} />}
                        keyExtractor={item => String(item.id)}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const estilosHistorico = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
    },
    mensagemVazia: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        marginTop: 50,
    },
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 1,
        borderLeftWidth: 5,
        borderLeftColor: '#000',
    },
    itemTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemDetalhe: {
        fontSize: 14,
        color: '#555',
    },
});