import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigation.replace('Login');
    } catch (err) {
      Alert.alert('Erro', 'Falha ao sair. Tente novamente.');
      console.error('Erro ao sair:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user?.email}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>UID</Text>
        <Text style={styles.value}>{user?.uid}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2FF',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#3A3A66',
    marginBottom: 40,
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#5B42F3',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#5B42F3',
    marginBottom: 6,
  },
  value: {
    fontSize: 16,
    color: '#3A3A66',
  },
  logoutButton: {
    backgroundColor: '#A45B9A',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#A45B9A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
})
