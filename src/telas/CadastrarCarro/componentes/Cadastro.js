import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';

export default function CadastroVeiculo({ navigation }) {
    
    const [modelo, setModelo] = useState('');
    const [cor, setCor] = useState('');
    const [placa, setPlaca] = useState('');
    const [apelido, setApelido] = useState(''); 

    const handleSalvarVeiculo = () => {
        if (!modelo || !placa) {
            Alert.alert("Erro", "Por favor, preencha o Modelo e a Placa.");
            return;
        }
        
        
        Alert.alert(
            "Sucesso",
            `O veículo ${modelo} (Placa: ${placa.toUpperCase()}) foi cadastrado com sucesso!`,
            [{ text: "OK", onPress: () => navigation.goBack() }]
        );
    };

    return (
        <SafeAreaView style={estilos.tela}>
            <ScrollView contentContainerStyle={estilos.container}>
                
                <Text style={estilos.titulo}>Adicionar Novo Veículo</Text>
                
                {/* Campo Modelo */}
                <Text style={estilos.label}>Modelo / Marca</Text>
                <TextInput
                    style={estilos.input}
                    value={modelo}
                    onChangeText={setModelo}
                    placeholder="Ex: Fiat Mobi, Chevrolet Onix"
                />

                {}
                <Text style={estilos.label}>Placa (Mercosul)</Text>
                <TextInput
                    style={estilos.input}
                    value={placa}
                    onChangeText={text => setPlaca(text.toUpperCase())}
                    placeholder="Ex: ABC1D23"
                    maxLength={7}
                    autoCapitalize="characters"
                />

                {/* Campo Cor */}
                <Text style={estilos.label}>Cor</Text>
                <TextInput
                    style={estilos.input}
                    value={cor}
                    onChangeText={setCor}
                    placeholder="Ex: Cinza, Branco"
                />

                {}
                <Text style={estilos.label}>Apelido (Opcional)</Text>
                <TextInput
                    style={estilos.input}
                    value={apelido}
                    onChangeText={setApelido}
                    placeholder="Ex: Carro Principal"
                />
                
                {}
                <View style={{ height: 80 }} /> 

            </ScrollView>

            {}
            <TouchableOpacity 
                style={estilos.botaoRodape} 
                onPress={handleSalvarVeiculo}
            >
                <Text style={estilos.textoBotaoRodape}>Salvar Veículo</Text>
            </TouchableOpacity>
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
        paddingBottom: 90, 
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#000',
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 5,
        marginTop: 15,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
        fontSize: 16,
        width: '100%',
        marginBottom: 10,
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
});