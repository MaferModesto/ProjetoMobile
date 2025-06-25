import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function generateUID() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  useEffect(() => {
    const loadUser = async () => {
      const json = await AsyncStorage.getItem('@app:user');
      if (json) setUser(JSON.parse(json));
      setLoading(false);
    };
    loadUser();
  }, []);

  const register = async (email, password) => {
    const usersJson = await AsyncStorage.getItem('@app:users');
    const users = usersJson ? JSON.parse(usersJson) : [];

    if (users.find(u => u.email === email)) {
      throw new Error('Usuário já existe');
    }

    const newUser = { uid: generateUID(), email, password };
    users.push(newUser);

    await AsyncStorage.setItem('@app:users', JSON.stringify(users));
    await AsyncStorage.setItem('@app:user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const login = async (email, password) => {
    const usersJson = await AsyncStorage.getItem('@app:users');
    const users = usersJson ? JSON.parse(usersJson) : [];

    const foundUser = users.find(u => u.email === email && u.password === password);
    if (!foundUser) throw new Error('Email ou senha inválidos');

    await AsyncStorage.setItem('@app:user', JSON.stringify(foundUser));
    setUser(foundUser);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('@app:user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
