import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router';
import {
  ArrowRight,
 
  FolderKanban,
  FolderPlus,
  MoreHorizontal,
  Plus,
  X,
 
} from 'lucide-react';

const Project = () => {
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
    });
  };
  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* ================= HEADER ================= */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <FolderKanban size={27} className="text-primary" />

              <h1 className="text-2xl font-bold md:text-3xl">Projects</h1>
            </div>

            <p className="mt-2 text-sm text-base-content/60">
              Manage and track all your projects in one place.
            </p>
          </div>

          <button onClick={handelOpenModal} className="btn btn-primary gap-2">
            <Plus size={18} />
            Create Project
          </button>
        </div>

        {/* ================= SEARCH & FILTER ================= */}

        <div className="mb-6 flex flex-col gap-3 md:flex-row"></div>

        {/* ================= PROJECT COUNT ================= */}

        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-base-content/60">
            {projects.length} projects
          </p>
        </div>

        {/* ================= PROJECT GRID ================= */}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map(project => (
            <div
              key={project.id}
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
                        <a>Edit Project</a>
                      </li>
                      <li>
                        <a className="text-error">Delete</a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* PROJECT INFO */}

                <div className="mt-5">
                  <h2 className="text-lg font-bold">{project.name}</h2>
                </div>

                {/* FOOTER */}

                <div className="mt-5 flex items-center justify-between">
                  <Link
                    state={{
                      workspaceId: project.workspaceId,
                      ownerEmail: project.ownerEmail,
                    }}
                    to={`/projects/${project._id}`}
                    className="btn btn-outline btn-primary w-full gap-2"
                  >
                    View Project
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* CREATE PROJECT CARD */}

          <button
            onClick={handelOpenModal}
            className="card  border-2 border-dashed border-base-300 bg-base-100 transition hover:border-primary hover:bg-primary/5"
          >
            <div className="card-body flex items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Plus size={27} />
              </div>

              <h3 className="mt-4 text-lg font-semibold">
                Create a new project
              </h3>

              <p className="max-w-xs text-sm text-base-content/60">
                Start a new project and organize your tasks with your team.
              </p>
            </div>
          </button>
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

export default Project;
