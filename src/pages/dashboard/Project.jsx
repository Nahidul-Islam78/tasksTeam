import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import {  NavLink } from 'react-router';


const Project = () => {
  const {user}=useAuth()
  const axios=useAxios()
  const { data: projects = [] } = useQuery({
    queryKey: ['projects', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/projects/${user.email}`);
      return res.data;
    },
  });
 
  return (
    <div>
      <p>total projects :{projects.length}</p>
      <ul>
        {projects.map(project => (
          <li key={project._id}>
            <NavLink state={{workspaceId:project.workspaceId}} to={`/projects/${project._id}`}>{project.name}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Project;