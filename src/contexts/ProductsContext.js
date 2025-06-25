import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAllProducts } from '../services/firestore/products'; // nova função
import { useAuth } from './AuthContext';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();

  const loadProducts = async () => {
    try {
      const data = await getAllProducts(); // busca todos os produtos
      setProducts(data);
    } catch (err) {
      console.error('Erro ao carregar produtos:', err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, setProducts, loadProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
