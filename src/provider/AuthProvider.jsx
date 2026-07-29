import React from 'react';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebase/firebase.init';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const AuthProvider = ({ children }) => {
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }


  const data = {
    createUser
  }
  
  return <AuthContext value={data}>{children}</AuthContext>
};

export default AuthProvider;