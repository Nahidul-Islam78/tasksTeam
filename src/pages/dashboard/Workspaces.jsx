import React, { useRef } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Building2, FolderPlus,  MoreHorizontal, Plus,  X } from 'lucide-react';
import { Link } from 'react-router';

const Workspaces = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const modalRef=useRef()
  const { data: workspaces = [] ,refetch:workspaceRefetch} = useQuery({
    queryKey: ['workspace', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/workspaces/${user.email}`);
      return res.data;
    },
  });

  const handelOpenModal = () => {
    modalRef.current.showModal();
  }

  const handelWorkspaceSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const workspaceData = {
      name: form.name.value,
      ownerEmail: user?.email,
    };
     axios.post('/workspaces', workspaceData).then(res => {
      if (res.data.insertedId) {
        const workspaceMember = {
          workspaceId: res.data.insertedId,
          userEmail: user?.email,
          role: 'admin',
        };
        axios.post('/workspaceMembers', workspaceMember).then(res => {
          workspaceRefetch();
          form.reset();
          modalRef.current?.close();
        });
      }
    });
}

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

          <button onClick={handelOpenModal} className="btn btn-primary gap-2">
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
              key={workspace._id}
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
                <div>
                  <div className="mt-5 flex items-center justify-between">
                    <Link
                      state={{
                        workspaceName: workspace.name,
                        ownerEmail: workspace.ownerEmail,
                      }}
                      to={`/workspaces/${workspace._id}`}
                      className="btn btn-outline btn-primary w-full gap-2"
                    >
                      View Workspace
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Create Workspace Card */}
          <button
            onClick={handelOpenModal}
            className="card  border-2 border-dashed border-base-300 bg-base-100 transition hover:border-primary hover:bg-primary/5"
          >
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
      {/*  workspace modal */}

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
                  Create New Workspace
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Start a new workspace and invite your team members.
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
          <form onSubmit={handelWorkspaceSubmit} className="space-y-5">
            {/* Project Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Workspace Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="e.g. Website Redesign"
                className="input input-bordered w-full rounded-xl"
                required
              />
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
};

export default Workspaces;