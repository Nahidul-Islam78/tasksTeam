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
  
  const createWorkSpace = async() => {
    const workspace = {
      name: workSpaceRef.current.value,
      ownerId:ownerInfo._id, 
      ownerEmail: ownerInfo.email
    };
    await axios.post('/workspaces', workspace).then(res => {
      setWorkspaceId(res.data.insertedId);
      if (res.data.insertedId) {
        const workspaceMember = {
          workspaceId: res.data.insertedId,
          userEmail: ownerInfo.email,
          role: 'admin',
        };
        axios.post('/workspaceMembers', workspaceMember).then(res => {
          console.log(res.data);
          next();
        })
      }
      
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