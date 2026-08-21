import { useRef,} from 'react';
import { Link, useLocation, useParams } from 'react-router';
import {
  ArrowLeft,
  Briefcase,
  UserPlus,
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';

const Workspace = () => {
  const {user}=useAuth()
  const { id } = useParams();
  const location = useLocation();
  const modalRef = useRef();
  const axios = useAxios();
  const workspaceName = location.state.workspaceName;
  const ownerEmail = location.state.ownerEmail;
  const existOwner = ownerEmail === user?.email;
  //open modal
  const handelOpenModal = () => {
    modalRef.current.showModal();
  };
  //invite member
  const handelInviteMember = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const invitation = {
      email,
      workspaceId: id,
      status: 'pending',
      role: 'member',
      inviterName: user?.displayName,
      inviterEmail: user?.email,
    };
    axios.post('/invitations', invitation).then(res => {
      modalRef.current.close();
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mb-6">
          {/* Back */}
          <Link
            to="/workspace"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
          >
            <ArrowLeft size={18} />
            Back to Workspaces
          </Link>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              {/* Workspace Info */}

              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                  <Briefcase size={27} />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">
                      {workspaceName}
                    </h1>

                    <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600">
                      Workspace
                    </span>
                  </div>
                </div>
              </div>

              {/* Header Actions */}
              {existOwner && (
                <button
                  onClick={handelOpenModal}
                  className="btn btn-primary gap-2"
                >
                  <UserPlus size={17} />
                  Invite Member
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Invite Member Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-11/12 max-w-md rounded-2xl p-6">
          {/* Header */}
          <div className="mb-6 flex items-start justify-between">
            <div>
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-slate-800">
                Invite Member
              </h3>

              <p className="mt-1 text-sm leading-5 text-slate-500">
                Invite someone to join this workspace.
              </p>
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={() => modalRef.current?.close()}
              className="btn btn-circle btn-ghost btn-sm"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handelInviteMember}>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="member@example.com"
                className="input input-bordered w-full rounded-xl"
                required
              />

              <p className="mt-2 text-xs text-slate-400">
                An invitation link will be sent to this email address.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5">
              <button
                type="button"
                onClick={() => modalRef.current?.close()}
                className="btn btn-ghost"
              >
                Cancel
              </button>

              <button type="submit" className="btn btn-primary px-6">
                Invite Member
              </button>
            </div>
          </form>
        </div>

        {/* Click outside to close */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Workspace;
