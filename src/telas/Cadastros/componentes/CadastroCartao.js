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

export default function CadastroCartao({ navigation }) {
    
    const [numeroCartao, setNumeroCartao] = useState('');
    const [nomeTitular, setNomeTitular] = useState('');
    const [validade, setValidade] = useState('');
    const [cvv, setCvv] = useState('');

    const formatarNumeroCartao = (text) => {
        const rawText = text.replace(/\D/g, '');
        let formattedText = '';
        for (let i = 0; i < rawText.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedText += ' ';
            }
            formattedText += rawText[i];
        }
        setNumeroCartao(formattedText);
    };

    const formatarValidade = (text) => {
    
        const rawText = text.replace(/\D/g, '');
        let formattedText = rawText;

       
        if (rawText.length > 2) {
            formattedText = rawText.slice(0, 2) + '/' + rawText.slice(2, 4);
        }
        setValidade(formattedText);
    };

    const handleSalvarCartao = () => {
        const numeroLimpo = numeroCartao.replace(/\s/g, '');
        
        if (numeroLimpo.length < 16 || !nomeTitular || validade.length !== 5 || cvv.length < 3) {
            Alert.alert("Erro", "Por favor, preencha todos os campos corretamente.");
            return;
        }

        
        Alert.alert(
            "Sucesso",
            `O cartão final ${numeroLimpo.slice(-4)} foi cadastrado e salvo com segurança!`,
            [{ text: "OK", onPress: () => navigation.goBack() }]
        );
    };

    return (
        <SafeAreaView style={estilos.tela}>
            <ScrollView contentContainerStyle={estilos.container}>
                
                <Text style={estilos.titulo}>Adicionar Novo Cartão</Text>

                {}
                <Text style={estilos.label}>Número do Cartão</Text>
                <TextInput
                    style={estilos.input}
                    value={numeroCartao}
                    onChangeText={formatarNumeroCartao}
                    placeholder="xxxx xxxx xxxx xxxx"
                    keyboardType="numeric"
                    maxLength={19}
                />
                
                {}
                <Text style={estilos.label}>Nome do Titular</Text>
                <TextInput
                    style={estilos.input}
                    value={nomeTitular}
                    onChangeText={setNomeTitular}
                    placeholder="Nome como está no cartão"
                    autoCapitalize="words"
                />

                {}
                <View style={estilos.containerSplit}>
                    
                    {}
                    <View style={estilos.inputGroup}>
                        <Text style={estilos.label}>Validade</Text>
                        <TextInput
                            style={estilos.inputSplit}
                            value={validade}
                            onChangeText={formatarValidade}
                            placeholder="MM/AA"
                            keyboardType="numeric"
                            maxLength={5}
                        />
                    </View>

                    {}
                    <View style={estilos.inputGroup}>
                        <Text style={estilos.label}>CVV</Text>
                        <TextInput
                            style={estilos.inputSplit}
                            value={cvv}
                            onChangeText={setCvv}
                            placeholder="***"
                            keyboardType="numeric"
                            maxLength={4}
                            secureTextEntry
                        />
                    </View>
                </View>
                
                {}
                <View style={{ height: 80 }} /> 

            </ScrollView>

            {}
            <TouchableOpacity 
                style={estilos.botaoRodape} 
                onPress={handleSalvarCartao}
            >
                <Text style={estilos.textoBotaoRodape}>Salvar Cartão</Text>
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
    containerSplit: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    inputGroup: {
        width: '48%',
    },
    inputSplit: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
        fontSize: 16,
        textAlign: 'center',
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