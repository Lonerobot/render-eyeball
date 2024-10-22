import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TileGrid from './components/TileGrid';

// import HeaderGrid from './components/HeaderGrid';

import ModifiedLabel from './components/ModifiedLabel';
import HeaderLogo from './components/ImageComponent';

import './App.css';

import { db } from './firebase';
import { collection, doc, updateDoc , onSnapshot } from 'firebase/firestore';

const App = () => {
  const [mode, setMode] = useState('view'); // 'view' or 'edit'
  const [computers, setComputers] = useState([]);

  useEffect(() => {
    // Subscribe to the 'computers' collection
    const unsubscribe = onSnapshot(collection(db, 'computers'), (snapshot) => {
      const computersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setComputers(computersData);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'free' ? 'occupied' : 'free';  // Toggle status
      const docRef = doc(db, 'computers', id);  // Replace 'computers' with your collection name
      await updateDoc(docRef, { status: newStatus });  // Update Firestore with the new status
      console.log('Status updated to:', newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

    // Set all computers to "occupied"
    const setAllToOccupied = async () => {
      try {
        const batch = computers.map(async (computer) => {
          const docRef = doc(db, 'computers', computer.id);
          await updateDoc(docRef, { status: 'occupied' });
        });
        await Promise.all(batch);
        console.log('All computers set to occupied');
      } catch (error) {
        console.error('Error setting all to occupied:', error);
      }
    };
  
    // Set all computers to "free"
    const setAllToFree = async () => {
      try {
        const batch = computers.map(async (computer) => {
          const docRef = doc(db, 'computers', computer.id);
          await updateDoc(docRef, { status: 'free' });
        });
        await Promise.all(batch);
        console.log('All computers set to free');
      } catch (error) {
        console.error('Error setting all to free:', error);
      }
    };
  
    const [showDetails, setShowDetails] = useState(false); // State to control showing details

    const handleToggleDetails = () => {
      setShowDetails(prev => !prev); // Toggle the state
    };

  return (
    <div className="App"> 

    <div>
      <Header mode={mode} setMode={setMode} onToggleDetails={handleToggleDetails} showDetails={showDetails} />
      <TileGrid computers={computers} mode={mode} toggleStatus={toggleStatus} showDetails={showDetails} />
    </div>


      {/* <Header mode={mode} setMode={setMode} />
      <TileGrid computers={computers} mode={mode} toggleStatus={toggleStatus} /> */}
      
      {/* <HeaderGrid computers={computers} mode={mode} toggleStatus={toggleStatus} ></HeaderGrid> */}
      
      <div className="div-layout-top">  
      {mode === 'edit' && (
        <button className='view action' onClick={() => setAllToOccupied()}>          
          Set All Occupied
        </button>
        )}            
      <ModifiedLabel /> 
      </div>
     </div>

  );
};

export default App;
