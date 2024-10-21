import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.js'; // Adjust the import to your Firebase config

// Ensure the document and field exist
const settingsDocRef = doc(db, 'settings', 'lastModified');
await setDoc(settingsDocRef, {
  timestamp: serverTimestamp()
}, { merge: true });