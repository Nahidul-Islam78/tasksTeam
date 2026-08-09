import React, { useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebase/firebase.init';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth/cordova';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading,setLoading]=useState(false)
  //user signup
  const createUser = (email, password) => {
    loading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  }
  //user login
  const loginUser = (email, password) => {
    loading(true)
    return signInWithEmailAndPassword(auth, email, password);
  }

  //user logout

  const logoutUser = () => {
    loading(true)
    return signOut(auth);
  }
  
  //set observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
      
    })
    return () => unsubscribe();
  },[])


  const data = {
    createUser,
    loginUser,
    logoutUser,
    user,
    loading
  }
  
  return <AuthContext value={data}>{children}</AuthContext>
};

export default AuthProvider;