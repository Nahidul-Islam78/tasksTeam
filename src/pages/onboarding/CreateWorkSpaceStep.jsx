import React, { useRef,  } from 'react';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';


const CreateWorkSpaceStep = ({ next, setWorkspaceId, setWorkspaceName }) => {
  const axios = useAxios();
  const workSpaceRef = useRef();
  const { user } = useAuth();
  const createWorkSpace = async () => {
    setWorkspaceName(workSpaceRef.current.value);
    const workspace = {
      name: workSpaceRef.current.value,
      ownerEmail: user?.email,
    };
    await axios.post('/workspaces', workspace).then(res => {
      setWorkspaceId(res.data.insertedId);
      
      if (res.data.insertedId) {
        const workspaceMember = {
          workspaceId: res.data.insertedId,
          userEmail: user?.email,
          role: 'admin',
        };
        axios.post('/workspaceMembers', workspaceMember).then(res => {
          next();
        });
      }
    });
  };
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div>
        <h1 className=" text-center my-7 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Create Workspace
        </h1>
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Workspace Name
          </label>

          <input
            ref={workSpaceRef}
            id="name"
            name="name"
            type="text"
            placeholder="Enter your workspace name"
            autoComplete="name"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
        <button
          onClick={createWorkSpace}
          className="  mx-auto mt-10 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
        >
          next
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default CreateWorkSpaceStep;