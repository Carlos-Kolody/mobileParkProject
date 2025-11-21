import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform, 
} from 'react-native';

import usuario from "../../../mocks/usuario";

export default function CadastroVeiculo({ navigation }) {
    
    const [modelo, setModelo] = useState('');
    const [cor, setCor] = useState('');
    const [placa, setPlaca] = useState('');
    const [apelido, setApelido] = useState(''); 
    const [cadastroConcluido, setCadastroConcluido] = useState(false); 

    const handleSalvarVeiculo = () => {
    
        if (!modelo || !placa) {
            alert("Por favor, preencha o Modelo e a Placa.");
            return;
        }
        
        const novoVeiculo = {
            id: usuario.veiculos.length + 1,
            modelo: modelo.trim(),
            cor: cor.trim() || 'Não informada',
            placa: placa.toUpperCase().trim(),
            apelido: apelido.trim() || modelo.trim(),
        };

    
        if (Array.isArray(usuario.veiculos)) {
            usuario.veiculos.push(novoVeiculo);
        } else {
            usuario.veiculos = [novoVeiculo];
        }
        
    
        setCadastroConcluido(true);
    };

    
    const TelaSucesso = () => (
        <View style={estilos.sucessoContainer}>
            <Text style={estilos.sucessoIcone}>🚗</Text>
            <Text style={estilos.sucessoTitulo}>Veículo Cadastrado com Sucesso!</Text>
            <Text style={estilos.sucessoMensagem}>
                Seu veículo {apelido || modelo} (Placa: {placa.toUpperCase()}) foi salvo e está pronto para ser usado.
            </Text>

            <TouchableOpacity 
                style={[estilos.botaoAcaoSucesso, { backgroundColor: '#000', marginTop: 30 }]} 
                onPress={() => navigation.navigate("Home")}
            >
                <Text style={estilos.textoBotaoRodape}>Voltar ao Início</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[estilos.botaoAcaoSucesso, { backgroundColor: '#ccc' }]} 
                onPress={() => navigation.navigate("HistoricoCarros")} 
            >
                <Text style={[estilos.textoBotaoRodape, { color: '#000' }]}>Ver todos os cadastrados</Text>
            </TouchableOpacity>
        </View>
    );


    return (
        <SafeAreaView style={estilos.tela}>
            {cadastroConcluido ? (
                <TelaSucesso />
            ) : (
                <KeyboardAvoidingView 
                    style={{ flex: 1 }} 
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <ScrollView contentContainerStyle={estilos.container}>
                        
                        <Text style={estilos.titulo}>Adicionar Novo Veículo</Text>

                        {/* Botão de Histórico*/}
                        <TouchableOpacity
                            style={estilos.botaoHistorico}
                            onPress={() => navigation.navigate("HistoricoCarros")}
                        >
                            <Text style={estilos.textoBotaoHistorico}>Ver Cadastros Anteriores</Text>
                        </TouchableOpacity>
                        
                        {/* Campo Modelo */}
                        <Text style={estilos.label}>Modelo / Marca</Text>
                        <TextInput
                            style={estilos.input}
                            value={modelo}
                            onChangeText={setModelo}
                            placeholder="Ex: Fiat Mobi, Chevrolet Onix"
                        />

                        {/* Campo Placa */}
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

                        {/* Campo Apelido */}
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
                </KeyboardAvoidingView>
            )}
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
        marginBottom: 10,
        color: '#000',
    },
    botaoHistorico: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    textoBotaoHistorico: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555',
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

    sucessoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#fff',
    },
    sucessoIcone: {
        fontSize: 80,
        marginBottom: 20,
    },
    sucessoTitulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 15,
    },
    sucessoMensagem: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 20,
    },
    botaoAcaoSucesso: {
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 8,
        width: '100%',
        marginBottom: 10,
    },
});