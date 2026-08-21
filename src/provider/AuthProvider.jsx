import React, { useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebase/firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading,setLoading]=useState(true)
  //user signup
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  //user login
  const loginUser = (email, password) => {
   
    return signInWithEmailAndPassword(auth, email, password);
  }

  //const Signin with google

  const googleSignin = () => {
    return signInWithPopup(auth,googleProvider)
  }



  //user logout

  const logoutUser = () => {
    return signOut(auth);
  }
  
  //set observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
      
    })
    return () => unsubscribe();
  }, [])
  
  //update user profile

  const updateUser = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo)
  }

  
  const data = {
    createUser,
    loginUser,
    logoutUser,
    updateUser,
    user,
    loading,
    googleSignin,
  };
  
  return <AuthContext value={data}>{children}</AuthContext>
};

export default AuthProvider;