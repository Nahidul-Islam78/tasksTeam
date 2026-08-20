import { useQuery } from '@tanstack/react-query';
import React, { useRef }  from 'react';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import { ArrowRight,  FolderKanban,FolderPlus,Plus, Users, X } from 'lucide-react';
import { Link } from 'react-router';
import { MdWorkspaces } from 'react-icons/md';

const Dashboard = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const modalRef = useRef();

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
  const { data: projects = [],refetch:projectRefetch } = useQuery({
    queryKey: ['projects', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/projects/${user.email}`);
      return res.data;
    },
  });
  // get invitations
  const { data: invitations = [] } = useQuery({
    queryKey: ['invitation', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/invitations/${user.email}`);
      return res.data;
    },
  });

  //get projects members
  const { data: projectsMembers } = useQuery({
    queryKey: ['projectMembers', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/projectsMembers/${user.email}`);
      return res.data;
    },
  });
  //open modal
  const handelOpenModal = () => {
    modalRef.current.showModal();
  };

  //create project

  const handleProjectSubmit = e => {
    e.preventDefault();
    const form = e.target;

    const projectData = {
      name: form.name.value,
      workspaceId: form.workspaceId.value,
      ownerEmail: user?.email,
    };

    axios.post('/projects', projectData).then(res => {
      const projectId = res.data.insertedId;
      if (projectId) {
        const projectMember = {
          projectId,
          userEmail: user?.email,
          role: 'admin',
        };
        axios.post('/projectMembers', projectMember).then(res => {
         projectRefetch();
         form.reset();
         modalRef.current?.close();
        });
      }
      
    })
  };

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

          <button onClick={handelOpenModal} className="btn btn-primary gap-2">
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
                    <Link to={`/workspaces/${workspace._id}`}>
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

      {/*  project modal */}

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-11/12 max-w-lg rounded-2xl p-6">
          {/* Header */}
          <div className="mb-6 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                <FolderPlus size={22} />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  Create New Project
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Create a project inside your workspace.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => modalRef.current?.close()}
              className="btn btn-circle btn-ghost btn-sm"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleProjectSubmit} className="space-y-5">
            {/* Project Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Project Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="e.g. Website Redesign"
                className="input input-bordered w-full rounded-xl"
                required
              />
            </div>

            {/* Workspace */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Workspace
              </label>

              <select
                name="workspaceId"
                className="select select-bordered w-full rounded-xl"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Select a workspace
                </option>

                {workspaces.map(
                  workspace =>
                    workspace.ownerEmail === user.email && (
                      <option key={workspace._id} value={workspace._id}>
                        {workspace.name}
                      </option>
                    ),
                )}
              </select>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
              <button
                type="button"
                onClick={() => modalRef.current?.close()}
                className="btn btn-ghost"
              >
                Cancel
              </button>

              <button type="submit" className="btn btn-primary px-6">
                Create Project
              </button>
            </div>
          </form>
        </div>

        {/* Click outside modal */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};;

export default Dashboard;
