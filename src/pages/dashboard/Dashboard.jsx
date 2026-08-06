import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';

const Dashboard = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const { data: workspaces = [] } = useQuery({
    queryKey: ['workspace', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/workspaces/${user.email}`);
      return res.data;
    },
  });
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
      <p>dashboard</p>
      <p>total workspace:{workspaces.length}</p>
      <p>total projects:{projects.length}</p>
    </div>
  );
};

export default Dashboard;
