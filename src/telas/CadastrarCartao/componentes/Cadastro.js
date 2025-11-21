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
    Modal, 
    FlatList, 
} from 'react-native';

import usuario from "../../../mocks/usuario";

const BANDEIRAS = [
    { nome: "Visa", emoji: "💳" },
    { nome: "Mastercard", emoji: "🗂️" },
    { nome: "Elo", emoji: "✨" },
    { nome: "Amex", emoji: "🗽" },
    { nome: "Hipercard", emoji: "🔗" },
    { nome: "Outra", emoji: "⚫" }
];
const BANDEIRA_DEFAULT = { nome: "Selecione a Bandeira", emoji: "❔" };

export default function CadastroCartao({ navigation }) {
    
    const [numeroCartao, setNumeroCartao] = useState('');
    const [nomeTitular, setNomeTitular] = useState('');
    const [validade, setValidade] = useState('');
    const [cvv, setCvv] = useState('');
    const [bandeiraSelecionada, setBandeiraSelecionada] = useState(BANDEIRA_DEFAULT); // Novo estado para a bandeira
    const [modalVisible, setModalVisible] = useState(false);
    
    const [cadastroConcluido, setCadastroConcluido] = useState(false); 
    const [cartaoFinal, setCartaoFinal] = useState(''); 

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
        
        if (bandeiraSelecionada.nome === BANDEIRA_DEFAULT.nome) {
            alert("Por favor, selecione a bandeira do cartão.");
            return;
        }

        if (numeroLimpo.length < 16 || !nomeTitular || validade.length !== 5 || cvv.length < 3) {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }

        const final = numeroLimpo.slice(-4);
        const novoCartao = {
            id: (usuario.cartoes ? usuario.cartoes.length : 0) + 1,
            bandeira: bandeiraSelecionada.nome, 
            bandeiraEmoji: bandeiraSelecionada.emoji, 
            final: final, 
            nomeTitular: nomeTitular.trim(),
            validade: validade,
        };

        if (Array.isArray(usuario.cartoes)) {
            usuario.cartoes.push(novoCartao);
        } else {
            usuario.cartoes = [novoCartao];
        }

        setCartaoFinal(final);
        setCadastroConcluido(true);
    };

    const BandeiraModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={estilos.modalOverlay}>
                <View style={estilos.modalContainer}>
                    <Text style={estilos.modalTitulo}>Selecione a Bandeira</Text>
                    <FlatList
                        data={BANDEIRAS}
                        keyExtractor={(item) => item.nome}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={estilos.modalItem}
                                onPress={() => {
                                    setBandeiraSelecionada(item);
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={estilos.modalItemEmoji}>{item.emoji}</Text>
                                <Text style={estilos.modalItemText}>{item.nome}</Text>
                            </TouchableOpacity>
                        )}
                        ItemSeparatorComponent={() => <View style={estilos.modalSeparator} />}
                    />
                    <TouchableOpacity 
                        style={estilos.modalCloseButton} 
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={estilos.modalCloseButtonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    const TelaSucesso = () => (
        <View style={estilos.sucessoContainer}>
            <Text style={estilos.sucessoIcone}>✅</Text>
            <Text style={estilos.sucessoTitulo}>Cartão Cadastrado com Sucesso!</Text>
            <Text style={estilos.sucessoMensagem}>
                O cartão {bandeiraSelecionada.emoji} {bandeiraSelecionada.nome} (final {cartaoFinal}) foi salvo com segurança.
            </Text>

            <TouchableOpacity 
                style={[estilos.botaoAcaoSucesso, { backgroundColor: '#000', marginTop: 30 }]} 
                onPress={() => navigation.navigate("Home")}
            >
                <Text style={estilos.textoBotaoRodape}>Voltar ao Início</Text>
            </TouchableOpacity>

            {}
            <TouchableOpacity 
                style={[estilos.botaoAcaoSucesso, { backgroundColor: '#ccc' }]} 
                onPress={() => navigation.navigate("HistoricoCartoes")}
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
                        
                        <Text style={estilos.titulo}>Adicionar Novo Cartão</Text>

                        {/* Botão de Histórico */}
                        <TouchableOpacity
                            style={estilos.botaoHistorico}
                            onPress={() => navigation.navigate("HistoricoCartoes")}
                        >
                            <Text style={estilos.textoBotaoHistorico}>Ver Cartões Cadastrados</Text>
                        </TouchableOpacity>

                        {/* Campo Número do Cartão */}
                        <Text style={estilos.label}>Número do Cartão</Text>
                        <TextInput
                            style={estilos.input}
                            value={numeroCartao}
                            onChangeText={formatarNumeroCartao}
                            placeholder="xxxx xxxx xxxx xxxx"
                            keyboardType="numeric"
                            maxLength={19}
                        />

                        {/* Campo Seleção de Bandeira */}
                        <Text style={estilos.label}>Bandeira</Text>
                        <TouchableOpacity 
                            style={estilos.inputBandeira}
                            onPress={() => setModalVisible(true)}
                        >
                            <Text style={estilos.inputBandeiraEmoji}>{bandeiraSelecionada.emoji}</Text>
                            <Text style={[
                                estilos.inputBandeiraText, 
                                bandeiraSelecionada.nome === BANDEIRA_DEFAULT.nome && { color: '#999' }
                            ]}>
                                {bandeiraSelecionada.nome}
                            </Text>
                        </TouchableOpacity>
                        
                        {/* Campo Nome do Titular */}
                        <Text style={estilos.label}>Nome do Titular</Text>
                        <TextInput
                            style={estilos.input}
                            value={nomeTitular}
                            onChangeText={setNomeTitular}
                            placeholder="Nome como está no cartão"
                            autoCapitalize="words"
                        />

                        {/* Validade e CVV Split */}
                        <View style={estilos.containerSplit}>
                            
                            {/* Validade */}
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

                            {/* CVV */}
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
                        
                        {/* Espaço em branco no final */}
                        <View style={{ height: 80 }} /> 

                    </ScrollView>

                    {/* Botão Salvar (Rodapé Fixo) */}
                    <TouchableOpacity 
                        style={estilos.botaoRodape} 
                        onPress={handleSalvarCartao}
                    >
                        <Text style={estilos.textoBotaoRodape}>Salvar Cartão</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            )}
            
            {}
            <BandeiraModal /> 
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
    inputBandeira: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
        marginBottom: 10,
        paddingHorizontal: 5,
    },
    inputBandeiraEmoji: {
        fontSize: 20,
        marginRight: 10,
    },
    inputBandeiraText: {
        fontSize: 16,
        color: '#000',
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

    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '60%',
    },
    modalTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#000',
    },
    modalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    modalItemEmoji: {
        fontSize: 20,
        marginRight: 15,
    },
    modalItemText: {
        fontSize: 16,
        color: '#333',
    },
    modalSeparator: {
        height: 1,
        backgroundColor: '#f0f0f0',
    },
    modalCloseButton: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    modalCloseButtonText: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 16,
    },

    sucessoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#fff',
    },
    sucessoIcone: {
        fontSize: 60,
        marginBottom: 20,
    },
    sucessoTitulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    sucessoMensagem: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 30,
    },
    botaoAcaoSucesso: {
        width: '100%',
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
    }
});