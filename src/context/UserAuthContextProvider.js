import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
// import { Navigate } from 'react-router-dom';
import { auth } from '../db/firebase';

const userAuthContext = createContext();

export default function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState('');
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logIn(email, password) {
    console.log('Email :', email);
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }

  function googleSignIn() {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider value={{ user, signUp, logIn, logOut, googleSignIn }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}

// const provider = new GoogleAuthProvider();
//   signInWithPopup(auth, provider)
//     .then((result) => {

//        console.log('signin',result);

//       // const name = result.user.displayName;
//       // const email = result.user.email;
//       // const profilePic = result.user.photoURL;
//       // const {name ,email,profilePic} = result.user
//       const {user:{displayName,email,photoURL}} = result;

//      console.log(result);

//       localStorage.setItem("user details", displayName);
//       localStorage.setItem("email", email);
//       localStorage.setItem("profilePic", photoURL);

//     })
//     .catch((error) => {
//       console.log(error);
//     });
