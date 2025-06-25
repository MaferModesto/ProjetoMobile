import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

const { login } = useAuth();

const handleLogin = async () => {
  setError('');
  if (!email || !password) {
    setError('Preencha todos os campos');
    return;
  }

  try {
    await login(email, password); // chama o método do contexto, que atualiza o user
    navigation.replace('ListProducts');
  } catch (err) {
    setError(err.message || 'Erro ao verificar o login.');
    console.error(err);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seja bem-vindo!</Text>
      <Text style={styles.loginText}>Faça login na sua conta</Text>

      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={24} color="#7D7DB8" style={styles.inputIcon} />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.textInput}
          placeholderTextColor="#B3B3D1"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Fontisto name="locked" size={24} color="#7D7DB8" style={styles.inputIcon} />
        <TextInput
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.textInput}
          placeholderTextColor="#B3B3D1"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Não tem uma conta? Cadastre-se</Text>
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
    textAlign: 'center',
    fontSize: 42,
    fontWeight: '700',
    color: '#5B42F3',
    marginBottom: 12,
  },
  loginText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#3A3A66',
    marginBottom: 32,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 30,
    elevation: 10,
    marginVertical: 12,
    alignItems: 'center',
    paddingHorizontal: 16,
    shadowColor: '#5B42F3',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#3A3A66',
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#5B42F3',
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 24,
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
  link: {
    marginTop: 20,
    color: '#7D7DB8',
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
