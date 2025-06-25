import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProductDetailsScreen({ route }) {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.nome}</Text>
      <Text style={styles.label}>Preço:</Text>
      <Text style={styles.value}>R$ {product.preco}</Text>
      <Text style={styles.label}>Descrição:</Text>
      <Text style={styles.value}>{product.descricao}</Text>
      <Text style={styles.label}>Criado por:</Text>
      <Text style={styles.value}>{product.criadoPor}</Text>
      <Text style={styles.label}>Criado em:</Text>
      <Text style={styles.value}>{new Date(product.createdAt?.seconds * 1000).toLocaleString()}</Text>
      {product.updatedAt && (
        <>
          <Text style={styles.label}>Atualizado por:</Text>
          <Text style={styles.value}>{product.atualizadoPor}</Text>
          <Text style={styles.label}>Atualizado em:</Text>
          <Text style={styles.value}>{new Date(product.updatedAt.seconds * 1000).toLocaleString()}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { fontWeight: 'bold', marginTop: 10 },
  value: { marginBottom: 10 },
});
