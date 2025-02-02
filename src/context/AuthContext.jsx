// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(email, password) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      throw new Error(getHebrewErrorMessage(error.code));
    }
  }

  async function login(email, password) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      throw new Error(getHebrewErrorMessage(error.code));
    }
  }

  function logout() {
    return signOut(auth);
  }

  // Helper function to translate Firebase error messages to Hebrew
  function getHebrewErrorMessage(errorCode) {
    const errorMessages = {
      'auth/email-already-in-use': 'כתובת האימייל כבר בשימוש',
      'auth/invalid-email': 'כתובת האימייל אינה תקינה',
      'auth/operation-not-allowed': 'הפעולה אינה מורשית',
      'auth/weak-password': 'הסיסמה חלשה מדי',
      'auth/user-disabled': 'המשתמש מושבת',
      'auth/user-not-found': 'משתמש לא נמצא',
      'auth/wrong-password': 'סיסמה שגויה',
      'default': 'אירעה שגיאה, אנא נסה שוב'
    };
    return errorMessages[errorCode] || errorMessages.default;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
