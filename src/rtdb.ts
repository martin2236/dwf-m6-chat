import { initializeApp } from 'firebase/app';
import { getDatabase} from "firebase/database";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "m14KXfyNSZY2orakmj6Fbq7opHZ4CK1Gf2YRkyPG",
  authDomain: "dwf-m6-crud-51731.firebaseapp.com",
  projectId: "dwf-m6-crud-51731",
  databaseURL: "https://dwf-m6-crud-51731-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);

const fireStore = getFirestore(app);
const RTDB = getDatabase(app);

export {RTDB, fireStore}