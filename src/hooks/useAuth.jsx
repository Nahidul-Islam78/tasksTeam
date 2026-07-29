import React, { use } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
  const data = use(AuthContext);
  return data
};

export default useAuth;