import React, { useRef } from 'react';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import { ArrowRight } from 'lucide-react';

const InviteMembersStep = ({ next, workspaceId, workspaceName }) => {
  const emailRef = useRef();
  const axios = useAxios();
  const { user } = useAuth()
  const handelInvitation = () => {
    const email = emailRef.current.value;
    const invitation = {
      email,
      workspaceId,
      workspaceName,
      status: 'pending',
      role: 'member',
      inviterName:user?.displayName
    };
    axios.post('/invitations', invitation).then(res => {
      next();
    });
  };
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div>
        <h1 className=" text-center my-7 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Invite member
        </h1>
      </div>
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Email
        </label>

        <input
          ref={emailRef}
          id="email"
          name="emailAddress"
          type="email"
          placeholder="abc@example.com"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>
      <div className="flex  items-center gap-3">
        <button
          className="rounded-lg px-4 py-3 text-sm font-medium text-slate-500 transition hover:text-slate-800"
          onClick={next}
        >
          Skip for now
        </button>
        <button
          onClick={handelInvitation}
          className="  mx-auto mt-10 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
        >
          Continue
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default InviteMembersStep;