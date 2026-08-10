import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';


const PrivetRoute = ({children}) => {
  const { user,loading } = useAuth();
  
  if (loading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }
  console.log(user)
  if (!user) {
   return <Navigate to='/auth/login'></Navigate>
  } else {
    return children;
  }
  
};

export default PrivetRoute;