import React, { useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebase/firebase.init';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const AuthProvider = ({ children }) => {
  const [user,setUser]=useState(null)
  //user signup
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  //set observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      console.log(currentUser)
    })
    return () => unsubscribe();
  },[])


  const data = {
    createUser,
    user
  }
  
  return <AuthContext value={data}>{children}</AuthContext>
};

export default AuthProvider;