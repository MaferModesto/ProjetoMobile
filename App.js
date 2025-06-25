import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider } from './src/contexts/AuthContext';
import { ProductsProvider } from './src/contexts/ProductsContext';

import LoginScreen from './src/screens/authentication/LoginScreen';
import RegisterScreen from './src/screens/authentication/RegisterScreen';
import ListProductsScreen from './src/screens/products/ListProductsScreen';
import AddProductScreen from './src/screens/products/AddProductScreen';
import EditProductScreen from './src/screens/products/EditProductScreen';
import ProductDetailsScreen from './src/screens/products/ProductDetailsScreen';
import ProfileScreen from './src/screens/profile/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ListProducts" component={ListProductsScreen} />
            <Stack.Screen name="AddProduct" component={AddProductScreen} />
            <Stack.Screen name="EditProduct" component={EditProductScreen} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ProductsProvider>
    </AuthProvider>
  );
}
