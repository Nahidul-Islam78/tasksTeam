import React, { useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebase/firebase.init';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';


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
    loading
  }
  
  return <AuthContext value={data}>{children}</AuthContext>
};

export default AuthProvider;