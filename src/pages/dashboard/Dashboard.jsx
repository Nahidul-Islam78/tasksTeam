import { useQuery } from '@tanstack/react-query';
import React  from 'react';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import { ArrowRight, CheckSquare, FolderKanban,Plus, Users } from 'lucide-react';
import { Link } from 'react-router';
import { MdWorkspacePremium, MdWorkspaces } from 'react-icons/md';

const Dashboard = () => {
  const { user } = useAuth();
  const axios = useAxios();

  //get workspaces
  const { data: workspaces = [] } = useQuery({
    queryKey: ['workspace', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/workspaces/${user.email}`);
      return res.data;
    },
  });
  //get projects
  const { data: projects = [] } = useQuery({
    queryKey: ['projects', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/projects/${user.email}`);
      return res.data;
    },
  });
  // get invitations
  const { data:invitations=[]} = useQuery({
    queryKey: ['invitation', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/invitations/${user.email}`);
      return res.data;
    }
  })

  //get projects members
  const { data:projectsMembers } = useQuery({
    queryKey: ['projectMembers', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/projectsMembers/${user.email}`);
      return res.data;
    }
  })


  const stats = [
    {
      title: 'Total Projects',
      value: `${projects?.length}`,
      icon: FolderKanban,
    },
    {
      title: 'Total Workspace',
      value: `${workspaces?.length}`,
      icon: MdWorkspaces,
    },
    {
      title: 'Projects Members',
      value: `${projectsMembers?.length}`,
      icon: Users,
    },
    {
      title: 'Invite Members',
      value: `${invitations?.length}`,
      icon: Users,
    },
  ];
  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">
              Welcome back, {user?.displayName}
            </h1>

            <p className="mt-1 text-sm text-base-content/60">
              Manage your projects and team activities.
            </p>
          </div>

          <button className="btn btn-primary gap-2">
            <Plus size={18} />
            Create Project
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(stat => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="card border border-base-300 bg-base-100 shadow-sm"
              >
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-base-content/60">
                        {stat.title}
                      </p>

                      <h2 className="mt-2 text-3xl font-bold">{stat.value}</h2>
                    </div>

                    <div className="rounded-xl bg-primary/10 p-3 text-primary">
                      <Icon size={24} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Projects */}
          <div className="card border border-base-300 bg-base-100 shadow-sm ">
            <div className="card-body">
              {/* Section Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Recent Projects</h2>

                  <p className="text-sm text-base-content/60">
                    Track your latest projects
                  </p>
                </div>

                <Link to="/project" className="btn btn-ghost btn-sm gap-1">
                  View all
                  <ArrowRight size={15} />
                </Link>
              </div>

              {/* Project List */}
              <div className="mt-5 space-y-4">
                {projects.map(project => (
                  <div
                    key={project.name}
                    className="rounded-xl border border-base-300 p-4 transition hover:bg-base-200"
                  >
                    <Link
                      state={{
                        workspaceId: project.workspaceId,
                        ownerEmail: project.ownerEmail,
                      }}
                      to={`/projects/${project._id}`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{project.name}</h3>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* workspaces */}
          <div className="card border border-base-300 bg-base-100 shadow-sm ">
            <div className="card-body">
              {/* Section Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Recent Workspaces</h2>

                  <p className="text-sm text-base-content/60">
                    Track your latest workspaces
                  </p>
                </div>

                <Link to="/workspace" className="btn btn-ghost btn-sm gap-1">
                  View all
                  <ArrowRight size={15} />
                </Link>
              </div>

              {/* Project List */}
              <div className="mt-5 space-y-4">
                {workspaces.map(workspace => (
                  <div
                    key={workspace.name}
                    className="rounded-xl border border-base-300 p-4 transition hover:bg-base-200"
                  >
                    <Link
                      to={`/workspaces/${workspace._id}`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{workspace.name}</h3>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
