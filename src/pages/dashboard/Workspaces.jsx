import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

import { Link } from 'react-router';

const Workspaces = () => {
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
  return (
    <div>
      <p>workspace</p>
      <ul>
        {workspaces.map(workspace => <li>
          <Link to={`/workspaces/${workspace._id}`}>{workspace.name}</Link>
        </li>)}
      </ul>
    </div>
  );
};

export default Workspaces;