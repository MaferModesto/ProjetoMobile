import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../config/firebase';

const collectionRef = collection(db, 'products');

export const addProduct = async (product, userUid) => {
  if (!userUid) throw new Error('Usuário não autenticado');
  await addDoc(collectionRef, {
    ...product,
    criadoPor: userUid,
    createdAt: new Date(),
  });
};

export const getAllProducts = async () => {
  const productsCol = collection(db, 'products');
  const productsSnapshot = await getDocs(productsCol);
  const productsList = productsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  return productsList;
};

export const updateProduct = async (id, updatedData, userUid) => {
  const ref = doc(db, 'products', id);
  const docSnap = await getDoc(ref);

  if (!docSnap.exists()) {
    throw new Error('Produto não encontrado');
  }

  const productData = docSnap.data();

  if (productData.criadoPor !== userUid) {
    throw new Error('Usuário não autorizado a editar este produto');
  }

  await updateDoc(ref, {
    ...updatedData,
    atualizadoPor: userUid,
    updatedAt: serverTimestamp(),
  });
};

export const deleteProduct = async (id, userUid) => {
  const ref = doc(db, 'products', id);
  const docSnap = await getDoc(ref);

  if (!docSnap.exists()) {
    throw new Error('Produto não encontrado');
  }

  const productData = docSnap.data();

  if (productData.criadoPor !== userUid) {
    throw new Error('Usuário não autorizado a excluir este produto');
  }

  await deleteDoc(ref);
};