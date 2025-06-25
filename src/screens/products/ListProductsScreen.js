import React, { useLayoutEffect, useEffect} from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useProducts } from '../../contexts/ProductsContext';
import { useAuth } from '../../contexts/AuthContext';
import { deleteProduct } from '../../services/firestore/products';
import { Ionicons } from '@expo/vector-icons'; // Icone para botão sair

export default function ListProductsScreen({ navigation }) {
  const { products, loadProducts } = useProducts();
  const { user, setUser } = useAuth();

   useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadProducts);
    return unsubscribe;
  }, [navigation]);

  useLayoutEffect(() => {
  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ marginRight: 3}}>
        <Ionicons name="person-circle-outline" size={20} color="#000" text= 'Perfil'/>
      </TouchableOpacity>
    ),
  });
}, [navigation]);

  const handleDelete = async (productId) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteProduct(productId, user.uid);
              Alert.alert('Sucesso', 'Produto excluído com sucesso!');
              loadProducts();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o produto.');
              console.error(error);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => {
    const isOwner = item.criadoPor === user?.uid;

    return (
      <View style={styles.productCard}>
        <Text style={styles.productName}>{item.nome}</Text>
        <Text style={styles.productPrice}>R$ {item.preco}</Text>
        <Text style={styles.productDescription}>{item.descricao}</Text>

        {isOwner && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate('EditProduct', { product: item })}
            >
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.buttonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {products.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddProduct')}
      >
        <Text style={styles.addButtonText}>Adicionar Produto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2FF',
    padding: 16,
  },
  productCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  productName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3A3A66',
  },
  productPrice: {
    fontSize: 16,
    color: '#5B42F3',
    marginBottom: 8,
  },
  productDescription: {
  fontSize: 14,
  color: '#6B6B9A',
  marginBottom: 8,
},

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  editButton: {
    backgroundColor: '#5B42F3',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#A45B9A',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
    color: '#7D7DB8',
  },
  addButton: {
    backgroundColor: '#5B42F3',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 12,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
