import React, {  use, useRef } from 'react';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
;

const columnsDataPromise = fetch('/columns.json').then(res => res.json());

const CreateProjectStep = ({ finish, workspaceId }) => {
  const axios=useAxios()
  const columnsData = use(columnsDataPromise);
  const {user}=useAuth()

  const projectRef = useRef();
 
  console.log(workspaceId)
  const createProject = () => {
    const project = {
      name: projectRef.current.value,
      workspaceId:workspaceId
    };
    axios.post('/projects', project).then(res => {
      const projectId = res.data.insertedId;
      if (projectId) {
        const projectMember = {
          projectId: res.data.insertedId,
          userEmail: user?.email,
          role: 'admin',
        };
        axios.post('/projectMembers',projectMember).then(res => {
          console.log(res.data);
        });
      }
      //insert  & update columns 
        const updateColumns = columnsData.map(column => ({
          ...column,
          projectId: projectId,
        }));
        console.log(updateColumns);

        axios.post('/columns', updateColumns).then(res => {
          console.log(res.data);
        });
      finish();
    });
  };
  return (
    <div>
      <p>create project</p>
      <input type="text" ref={projectRef} />
      <button onClick={createProject}>finish</button>
    </div>
  );
};

export default CreateProjectStep;