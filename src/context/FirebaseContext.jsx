import { createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCoitlbo0J0TMt32eJSLpIXMKmo3zv4Ips",
  authDomain: "med-school-in-yfn5e2.firebaseapp.com",
  projectId: "med-school-in-yfn5e2",
  storageBucket: "med-school-in-yfn5e2.appspot.com",
  messagingSenderId: "601200906207",
  appId: "1:601200906207:web:5880d6b0be46bbc946be6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const FirebaseContext = createContext();

export function FirebaseProvider({ children }) {
  return (
    <FirebaseContext.Provider value={{ db }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  return useContext(FirebaseContext);
}
