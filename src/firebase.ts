import { initializeApp, getApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  setDoc,
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration from firebase-applet-config.json
const firebaseConfig = {
  apiKey: "AIzaSyBLRY7aRwwI1Q8I5cK0suu_unsa6ymLRbo",
  authDomain: "gen-lang-client-0710285958.firebaseapp.com",
  projectId: "gen-lang-client-0710285958",
  storageBucket: "gen-lang-client-0710285958.firebasestorage.app",
  messagingSenderId: "1012625467306",
  appId: "1:1012625467306:web:1d0249ae46d28bd8402dd3"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

// LocalStorage Fallback class for absolute robustness in sandbox environments
class LocalDataStore {
  private isFallback: boolean = false;

  constructor() {
    // Check if we can connect to firebase, or use localStorage as fallback
    // In our case, we can write helper methods that try Firestore first, 
    // and if it fails or throws, they fall back to LocalStorage.
  }

  private getLocal(key: string): any[] {
    const data = localStorage.getItem(`cric_${key}`);
    return data ? JSON.parse(data) : [];
  }

  private setLocal(key: string, data: any[]): void {
    localStorage.setItem(`cric_${key}`, JSON.stringify(data));
  }

  async getCollection(colName: string): Promise<any[]> {
    try {
      const colRef = collection(db, colName);
      const snapshot = await getDocs(colRef);
      if (snapshot.empty) {
        // If firestore is empty, check if we have local data, otherwise return empty
        const local = this.getLocal(colName);
        if (local.length > 0) return local;
        return [];
      }
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.warn(`Firestore getCollection for ${colName} failed, falling back to LocalStorage`, error);
      return this.getLocal(colName);
    }
  }

  async addDocument(colName: string, data: any): Promise<any> {
    try {
      const colRef = collection(db, colName);
      const docRef = await addDoc(colRef, { ...data, createdAt: new Date().toISOString() });
      const newDoc = { id: docRef.id, ...data, createdAt: new Date().toISOString() };
      
      // Sync local as well
      const local = this.getLocal(colName);
      local.push(newDoc);
      this.setLocal(colName, local);
      
      return newDoc;
    } catch (error) {
      console.warn(`Firestore addDocument for ${colName} failed, using LocalStorage`, error);
      const local = this.getLocal(colName);
      const newDoc = { id: `local_${Date.now()}`, ...data, createdAt: new Date().toISOString() };
      local.push(newDoc);
      this.setLocal(colName, local);
      return newDoc;
    }
  }

  async updateDocument(colName: string, id: string, data: any): Promise<void> {
    try {
      if (id.startsWith('local_')) {
        throw new Error("Local document cannot be updated on Firestore");
      }
      const docRef = doc(db, colName, id);
      await updateDoc(docRef, data);
    } catch (error) {
      console.warn(`Firestore updateDocument for ${colName}/${id} failed, using LocalStorage`, error);
    } finally {
      const local = this.getLocal(colName);
      const index = local.findIndex(item => item.id === id);
      if (index !== -1) {
        local[index] = { ...local[index], ...data };
        this.setLocal(colName, local);
      }
    }
  }

  async deleteDocument(colName: string, id: string): Promise<void> {
    try {
      if (!id.startsWith('local_')) {
        const docRef = doc(db, colName, id);
        await deleteDoc(docRef);
      }
    } catch (error) {
      console.warn(`Firestore deleteDocument for ${colName}/${id} failed, using LocalStorage`, error);
    } finally {
      const local = this.getLocal(colName);
      const filtered = local.filter(item => item.id !== id);
      this.setLocal(colName, filtered);
    }
  }

  // Preseed default data to LocalStorage if empty to make the app gorgeous right away!
  preseedIfEmpty(colName: string, defaultData: any[]) {
    const local = this.getLocal(colName);
    if (local.length === 0) {
      this.setLocal(colName, defaultData);
    }
  }
}

export const store = new LocalDataStore();
export { db, auth };
