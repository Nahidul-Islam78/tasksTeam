import axios from 'axios';
import React from 'react';
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
const useAxios = () => {
  return api
};

export default useAxios;