import React, {  useRef } from 'react';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';

const CreateProjectStep = ({ finish, workspaceId,}) => {
  const axios = useAxios();
  const { user } = useAuth();

  const projectRef = useRef();
  const createProject = () => {
    const project = {
      name: projectRef.current.value,
      workspaceId: workspaceId,
      ownerEmail: user?.email,
    };
    axios.post('/projects', project).then(res => {
      const projectId = res.data.insertedId;
      if (projectId) {
        const projectMember = {
          projectId: res.data.insertedId,
          userEmail: user?.email,
          role: 'admin',
        };
        axios.post('/projectMembers', projectMember).then(res => {
          console.log(res.data);
          finish();
        });
      }
    });
  };
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div>
        <h1 className=" text-center my-7 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Create Project
        </h1>
      </div>
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Project Name
        </label>

        <input
          ref={projectRef}
          id="name"
          name="name"
          type="text"
          placeholder="Enter your project name"
          autoComplete="name"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>
      <button
        onClick={createProject}
        className="  mx-auto mt-10 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
      >
        finish
      </button>
    </div>
  );
};

export default CreateProjectStep;