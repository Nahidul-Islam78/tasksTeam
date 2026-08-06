import React, { useRef,  } from 'react';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';


const CreateWorkSpaceStep = ({ next,setWorkspaceId}) => {
  const axios = useAxios();
  const workSpaceRef = useRef();
  const { user } = useAuth();


  

  const { data:ownerInfo } = useQuery({
    queryKey: [user?.email, 'user'],
    enabled:!!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/users/${user.email}`);
      return res.data
    }
  })
  
  const createWorkSpace = () => {
    const workspace = {
      name: workSpaceRef.current.value,
      ownerId:ownerInfo._id,
      ownerEmail: ownerInfo.email
    };
    axios.post('/workspaces', workspace).then(res => {
      setWorkspaceId(res.data.insertedId);
      next();
    });
  };
  return (
    <div>
      <p>workSpace</p>
      <input type="text" ref={workSpaceRef} />
      <button onClick={createWorkSpace}>next</button>
    </div>
  );
};

export default CreateWorkSpaceStep;