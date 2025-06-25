import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { updateProduct } from '../../services/firestore/products';
import { useAuth } from '../../contexts/AuthContext';
import { useProducts } from '../../contexts/ProductsContext';

export default function EditProductScreen({ route, navigation }) {
  const { product } = route.params;
  const [nome, setNome] = useState(product.nome);
  const [preco, setPreco] = useState(product.preco.toString());
  const [descricao, setDescricao] = useState(product.descricao);
  const { user } = useAuth();
  const { loadProducts } = useProducts();

 const handleUpdate = async () => {
  if (!nome || !preco || !descricao) {
    return Alert.alert('Erro', 'Preencha todos os campos.');
  }
  try {
    await updateProduct(product.id, { nome, preco: parseFloat(preco), descricao }, user.uid);
    loadProducts();

    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('ListProducts');
    }
  } catch (err) {
    Alert.alert('Erro', 'Você só pode atualizar seu próprio produto.');
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Produto</Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        placeholderTextColor="#A6A6D1"
      />
      <TextInput
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#A6A6D1"
      />
      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={[styles.input, styles.textArea]}
        multiline
        numberOfLines={4}
        placeholderTextColor="#A6A6D1"
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2FF',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#3A3A66',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#7D7DB8',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#3A3A66',
    marginBottom: 20,
    shadowColor: '#5B42F3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#5B42F3',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#5B42F3',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
