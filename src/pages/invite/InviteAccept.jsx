import React from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxios from '../../hooks/useAxios';

const InviteAccept = () => {
  const { token } = useParams();
  const axios = useAxios();
  const userData = {};
  const navigate=useNavigate()
  axios.post(`/invitation/accept/${token}`, userData).then(res => {
    navigate('/dashboard')
  })

  return (
    <div>
      <p>accept</p>
    </div>
  );
};

export default InviteAccept;