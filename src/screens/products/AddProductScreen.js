import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { addProduct } from '../../services/firestore/products';
import { useAuth } from '../../contexts/AuthContext';
import { useProducts } from '../../contexts/ProductsContext';

export default function AddProductScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const { user } = useAuth();
  const { loadProducts } = useProducts();

  const handleAdd = async () => {
    if (!nome || !preco || !descricao) {
      return Alert.alert('Erro', 'Preencha todos os campos.');
    }
    try {
      await addProduct({ nome, preco: parseFloat(preco), descricao }, user.uid);
      loadProducts();
      navigation.goBack();
    } catch (err) {
      Alert.alert('Erro', 'Você só pode adicionar produtos na sua lista.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Produto</Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        placeholderTextColor="#B3B3D1"
      />

      <TextInput
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#B3B3D1"
      />

      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
        placeholderTextColor="#B3B3D1"
      />

      <TouchableOpacity style={styles.button} onPress={handleAdd} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F2FF',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#5B42F3',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontSize: 16,
    color: '#3A3A66',
    marginVertical: 10,
    shadowColor: '#5B42F3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  button: {
    backgroundColor: '#5B42F3',
    paddingVertical: 16,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#5B42F3',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
