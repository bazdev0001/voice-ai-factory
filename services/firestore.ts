import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  onSnapshot,
  DocumentData,
  DocumentSnapshot,
  Unsubscribe,
  Firestore,
  serverTimestamp,
  QuerySnapshot,
} from 'firebase/firestore';
import { app } from './firebase';
import { VoiceAgent } from '../types';

const db: Firestore = getFirestore(app);

export const getDocument = async (col: string, id: string): Promise<DocumentData | null> => {
  try {
    const docRef = doc(db, col, id);
    const docSnap: DocumentSnapshot = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
};

export const setDocument = async (col: string, id: string, data: DocumentData): Promise<void> => {
  try {
    const docRef = doc(db, col, id);
    await setDoc(docRef, data);
  } catch (error) {
    console.error('Error setting document:', error);
    throw error;
  }
};

export const updateDocument = async (col: string, id: string, data: Partial<DocumentData>): Promise<void> => {
  try {
    const docRef = doc(db, col, id);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

export const deleteDocument = async (col: string, id: string): Promise<void> => {
  try {
    const docRef = doc(db, col, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

export const subscribeToDocument = (
  col: string,
  id: string,
  callback: (data: DocumentData | null) => void
): Unsubscribe => {
  const docRef = doc(db, col, id);
  return onSnapshot(docRef, (docSnap: DocumentSnapshot) => {
    if (docSnap.exists()) {
      callback({ id: docSnap.id, ...docSnap.data() });
    } else {
      callback(null);
    }
  });
};

export const saveVoiceAgent = async (userId: string, agentData: Omit<VoiceAgent, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const agentsRef = collection(db, 'voiceAgents');
    const docRef = await addDoc(agentsRef, {
      ...agentData,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving voice agent:', error);
    throw error;
  }
};

export const getUserAgents = async (userId: string): Promise<VoiceAgent[]> => {
  try {
    const agentsRef = collection(db, 'voiceAgents');
    const q = query(agentsRef, where('userId', '==', userId));
    const querySnap: QuerySnapshot = await getDocs(q);
    return querySnap.docs.map(d => ({ id: d.id, ...d.data() } as VoiceAgent));
  } catch (error) {
    console.error('Error getting agents:', error);
    throw error;
  }
};

export { db };
