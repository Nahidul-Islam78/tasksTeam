import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

import { Link } from 'react-router';
import { ArrowRight, Building2, FolderKanban, MoreHorizontal, Plus, Search, Users } from 'lucide-react';

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
  const workspacess = [
    {
      id: 1,
      name: 'Kakoli',
      description: 'Main workspace for our team',
      members: 8,
      projects: 5,
      color: 'bg-primary',
      initials: 'K',
    },
    {
      id: 2,
      name: 'Development Team',
      description: 'Software development projects',
      members: 12,
      projects: 8,
      color: 'bg-secondary',
      initials: 'D',
    },
    {
      id: 3,
      name: 'Marketing',
      description: 'Marketing and campaign management',
      members: 6,
      projects: 4,
      color: 'bg-accent',
      initials: 'M',
    },
    {
      id: 4,
      name: 'Personal',
      description: 'Personal projects and tasks',
      members: 2,
      projects: 3,
      color: 'bg-info',
      initials: 'P',
    },
  ];

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Building2 size={26} className="text-primary" />

              <h1 className="text-2xl font-bold md:text-3xl">Workspaces</h1>
            </div>

            <p className="mt-2 text-sm text-base-content/60">
              Manage your workspaces and collaborate with your team.
            </p>
          </div>

          <button className="btn btn-primary gap-2">
            <Plus size={18} />
            Create Workspace
          </button>
        </div>
        {/* Workspace Count */}
        <div className="mb-5">
          <p className="text-sm text-base-content/60">
            {workspaces.length} workspaces
          </p>
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {workspaces.map(workspace => (
            <div
              key={workspace.id}
              className="group card border border-base-300 bg-base-100 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="card-body">
                {/* Top */}
                <div className="flex items-start justify-between">
                  <div></div>

                  <div className="dropdown dropdown-end">
                    <button className="btn btn-ghost btn-sm btn-square">
                      <MoreHorizontal size={19} />
                    </button>

                    <ul className="menu dropdown-content z-10 mt-2 w-40 rounded-box bg-base-100 p-2 shadow">
                      <li>
                        <a>Edit Workspace</a>
                      </li>
                      <li>
                        <a className="text-error">Delete</a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* WORKSPACE INFO */}

                <div className="mt-5">
                  <h2 className="text-lg font-bold">{workspace.name}</h2>
                </div>

                {/* Button */}
                <div className="mt-5">
                  <button className="btn btn-outline btn-primary w-full gap-2">
                    View Workspace
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Create Workspace Card */}
          <button className="card  border-2 border-dashed border-base-300 bg-base-100 transition hover:border-primary hover:bg-primary/5">
            <div className="card-body flex items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Plus size={26} />
              </div>

              <h3 className="mt-4 text-lg font-semibold">
                Create a new workspace
              </h3>

              <p className="max-w-xs text-sm text-base-content/60">
                Start a new workspace and invite your team members.
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Workspaces;