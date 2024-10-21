import React, { useEffect, useState } from "react";
import { doc, onSnapshot  } from "firebase/firestore";
import { db } from "../firebase.js"; 

import styled from 'styled-components';

const LabelText = styled.p`
color: wheat;
`;

const ModifiedLabel = () => {

    const [timestamp, setTimestamp] = useState(null);

    useEffect(() => {
      const unsub = onSnapshot(doc(db, 'settings', 'lastModified'), (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setTimestamp(data.timestamp?.toDate()); // Converts Firestore timestamp to JS Date object
        }
      });
  
      return () => unsub(); // Clean up the listener when the component unmounts
    }, []);
  
    return (
        <LabelText>
          Last Modified: {timestamp ? new Date(timestamp).toLocaleString('en-GB') : 'No data available'}
        </LabelText>
      );

};

export default ModifiedLabel;
