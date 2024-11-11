import React, { useEffect, useState } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase.js";

import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";

const LabelText = styled.p`
  color: wheat;
`;

const getFirstName = (displayName) => {
  if (!displayName) return "Someone";
  return displayName.split(" ")[0];
};

const ModifiedLabel = () => {
  const [timestamp, setTimestamp] = useState(null);
  const [modifiedBy, setModifiedBy] = useState(null);
  const [user] = useAuthState(auth); // Get user from context

  useEffect(() => {
    const docRef = doc(db, "settings", "lastModified");

    const unsub = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setTimestamp(data.timestamp?.toDate());
        setModifiedBy(data.modifiedBy);
      }
    });


    return () => unsub(); // Clean up the listener when the component unmounts
  }, []); 

  return (
    <LabelText>
      {user
        ? `User: ${getFirstName(user.displayName)} `
        : "Log in to edit tiles - "}
      Last Modified: {timestamp
        ? `${new Date(timestamp).toLocaleString("en-GB")} `
        : "No data available "}

      By: { getFirstName(modifiedBy) || "Unknown"}
    </LabelText>
  );
};

export default ModifiedLabel;