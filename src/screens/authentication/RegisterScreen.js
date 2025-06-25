import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function generateUID() {
    return (
      Date.now().toString(36) +
      Math.random().toString(36).substr(2, 9)
    );
  }

  const handleRegister = async () => {
    setError('');
    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }

    try {
      const usersJson = await AsyncStorage.getItem('@app:users');
      const users = usersJson ? JSON.parse(usersJson) : [];

      if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
        setError('Email já cadastrado');
        return;
      }

      const newUser = {
        uid: generateUID(),
        email,
        password, // cuidado, senha em texto plano é inseguro
      };

      users.push(newUser);

      await AsyncStorage.setItem('@app:users', JSON.stringify(users));
      await AsyncStorage.setItem('@app:user', JSON.stringify(newUser));

      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      navigation.navigate('Login');
    } catch (err) {
      setError('Erro ao salvar os dados');
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#B3B3D1"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholderTextColor="#B3B3D1"
        autoCapitalize="none"
        autoCorrect={false}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleRegister} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Já tem uma conta? Faça login</Text>
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
    fontSize: 36,
    fontWeight: '700',
    color: '#5B42F3',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontSize: 16,
    color: '#3A3A66',
    marginVertical: 12,
    shadowColor: '#5B42F3',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
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
    elevation: 7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  link: {
    marginTop: 24,
    color: '#7D7DB8',
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
