import fs from 'fs';
import { getFirestore, collection, deleteDoc, doc, setDoc, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyABY-lTi_Cqmfi3Z3V_GGCyKj55rngiWXQ",
    authDomain: "render-eyeball-fb-react.firebaseapp.com",
    projectId: "render-eyeball-fb-react",
    storageBucket: "render-eyeball-fb-react.appspot.com",
    messagingSenderId: "926282959643",
    appId: "1:926282959643:web:f1b61e392ed36f9889e1be"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to import computers data into Firestore
async function importComputers() {
    try {
        // Remove existing entries
        const computersRef = collection(db, 'computers');
        const snapshot = await getDocs(computersRef);

        // Delete each document in the collection
        snapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });

        console.log('Existing entries removed.');

        // Read the JSON file
        const data = fs.readFileSync('computers.json', 'utf8');
        const computers = JSON.parse(data);

        // Add new entries
        for (const computer of computers) {
            const computerName = computer['Computer Name'];
            const computerRef = doc(computersRef, computerName); // Use PC name as document ID

            // Set document data with the PC name included
            await setDoc(computerRef, {
                name: computerName, // Add PC name as a field
                ...computer.Hardware // Spread the hardware properties
            });
        }

        console.log('New entries added successfully.');
    } catch (error) {
        console.error('Error importing computers:', error);
    }
}

// Execute the import function
importComputers();

