import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';


const ProjectKanbanBoard = () => {
  const {user}=useAuth()
  
  const [columnId,setColumnId]=useState(null)
  const { id } = useParams();
  const axios = useAxios();
  const modalRef = useRef();
  const taskModalRef = useRef();
  const location = useLocation();
  const workspaceId = location.state.workspaceId;
  const ownerEmail = location.state.ownerEmail;

  const existOwner = ownerEmail===user?.email
  //get columns
  const { data: columnsData = [],refetch } = useQuery({
    queryKey: ['columns', id],
    queryFn: async () => {
      const res = await axios.get(`/columns/${id}`);
      return res.data;
    },
  });
  //get workspace members
  const { data: workspaceMembers = []} = useQuery({
    queryKey: ['workspaceMembers', workspaceId],
    queryFn: async () => {
      const res = await axios.get(`/workspaceMembers/${workspaceId}`);
      return res.data;
    },
  });
  //set task priorityColor
  const priorityColor = {
    High: 'bg-red-100 text-red-600',
    Medium: 'bg-yellow-100 text-yellow-700',
    Low: 'bg-green-100 text-green-700',
  };

  //handel added new task

  const handelAddTask = columnId => {
   
    taskModalRef.current.showModal();
    setColumnId(columnId)
  }
  const handelTask=(e)=>{
    e.preventDefault();
    const title = e.target.title.value;
    const taskData = {
      title,
      columnId,
      projectId:id
    }
    axios.post('/tasks', taskData).then(res => {
      if (res.data.insertedId) {
        axios.patch(`/columns/${columnId}`, taskData).then(res => {
          refetch();
          taskModalRef.current.close();
        });
      }
    })
    
   
  }
  const handelOpenModal = () => {
    modalRef.current.showModal();
  }

    const handleAddedMember = async userEmail => {
      const projectMemberInfo = {
        projectId: id,
        userEmail,
        role: 'member',
        adminEmail:user?.email
      };
      await axios
        .post('/projectMembers/member', projectMemberInfo)
        .then(res => {
          modalRef.current.close();
          console.log(res.data);
        });
    };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      {/* ================= HEADER ================= */}
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
          {/* Project Info */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                📋
              </div>

              <div>
                <h1 className="text-xl font-bold text-slate-800 md:text-2xl">
                  Website Redesign
                </h1>

                <p className="text-sm text-slate-500">
                  Manage your project using Kanban Board
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {existOwner && (
              <button
                onClick={handelOpenModal}
                className="btn btn-outline gap-2"
              >
                👥
                <span className="hidden sm:inline">Add Member</span>
              </button>
            )}
          </div>
        </div>

        {/* ================= BOARD ================= */}

        <div className="overflow-x-auto pb-5">
          <div className="grid min-w-[1100px] grid-cols-4 gap-5">
            {columnsData.map((column, index) => {
              const columnColors = [
                {
                  dot: 'bg-slate-400',
                  border: 'border-slate-200',
                  header: 'bg-slate-50',
                },
                {
                  dot: 'bg-blue-500',
                  border: 'border-blue-100',
                  header: 'bg-blue-50',
                },
                {
                  dot: 'bg-orange-500',
                  border: 'border-orange-100',
                  header: 'bg-orange-50',
                },
                {
                  dot: 'bg-green-500',
                  border: 'border-green-100',
                  header: 'bg-green-50',
                },
              ];

              const color = columnColors[index] || columnColors[0];

              return (
                <div
                  key={column._id}
                  className={`flex min-h-[600px] flex-col rounded-2xl border ${color.border} bg-slate-50`}
                >
                  {/* ================= COLUMN HEADER ================= */}

                  <div
                    className={`flex items-center justify-between rounded-t-2xl border-b p-4 ${color.header}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`h-3 w-3 rounded-full ${color.dot}`} />

                      <h2 className="font-semibold text-slate-700">
                        {column.title}
                      </h2>

                      <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-500 shadow-sm">
                        {column.tasks.length}
                      </span>
                    </div>

                    <button className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-slate-700">
                      ⋮
                    </button>
                  </div>

                  {/* ================= ADD TASK ================= */}

                  <div className="p-3">
                    <button
                      onClick={() => handelAddTask(column._id)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white py-2.5 text-sm font-medium text-slate-500 transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      <span className="text-lg">+</span>
                      Add Task
                    </button>
                  </div>

                  {/* ================= TASK LIST ================= */}

                  <div className="flex-1 space-y-3 px-3 pb-4">
                    {column.tasks.map(task => (
                      <div
                        key={task.id}
                        className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
                      >
                        {/* Task Header */}
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-semibold leading-5 text-slate-800">
                            {task.title}
                          </h3>

                          <button className="rounded-lg p-1 text-slate-400 opacity-0 transition group-hover:opacity-100 hover:bg-slate-100 hover:text-slate-700">
                            ⋮
                          </button>
                        </div>

                        {/* Priority */}
                        <div className="mt-3">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                              priorityColor[task.priority]
                            }`}
                          >
                            {task.priority}
                          </span>
                        </div>

                        {/* Assignee */}
                        <div className="mt-4 flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                            {task.assignee?.charAt(0)?.toUpperCase() || 'U'}
                          </div>

                          <div>
                            <p className="text-xs text-slate-400">
                              Assigned to
                            </p>

                            <p className="text-sm font-medium text-slate-600">
                              {task.assignee || 'Unassigned'}
                            </p>
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="my-4 border-t border-slate-100" />

                        {/* Task Footer */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs text-slate-400">
                            <span>📅</span>

                            <span>{task.dueDate || 'No due date'}</span>
                          </div>

                          <button className="rounded-lg px-2 py-1 text-xs text-slate-400 hover:bg-slate-100 hover:text-indigo-600">
                            View
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Empty State */}
                    {column.tasks.length === 0 && (
                      <div className="flex min-h-[180px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white/60 px-4 text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
                          📋
                        </div>

                        <p className="text-sm font-medium text-slate-500">
                          No tasks yet
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Add a task to get started
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* TASK MODAL */}
      {/* ================================================= */}

      <dialog ref={taskModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-md">
          <h3 className="text-xl font-bold text-slate-800">Create New Task</h3>

          <p className="mt-1 text-sm text-slate-500">
            Add a new task to your project.
          </p>

          <form onSubmit={handelTask} className="mt-6 space-y-4">
            {/* Title */}
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Task Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="e.g. Design homepage"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Description
              </label>

              <textarea
                name="description"
                placeholder="Describe the task..."
                className="textarea textarea-bordered w-full"
                rows="3"
              />
            </div>

            {/* Priority */}
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Priority
              </label>

              <select name="priority" className="select select-bordered w-full">
                <option value="Low">Low</option>

                <option value="Medium">Medium</option>

                <option value="High">High</option>
              </select>
            </div>

            {/* Actions */}
            <div className="modal-action">
              <button
                type="button"
                onClick={() => taskModalRef.current?.close()}
                className="btn btn-ghost"
              >
                Cancel
              </button>

              <button type="submit" className="btn btn-primary">
                Create Task
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* ================================================= */}
      {/* MEMBERS MODAL */}
      {/* ================================================= */}

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-2xl">
          <div className="mb-5">
            <h3 className="text-xl font-bold text-slate-800">
              Workspace Members
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Select a member to add them to this project.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Role</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {workspaceMembers.map(member => (
                  <tr key={member._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                          {member.userEmail?.charAt(0)?.toUpperCase()}
                        </div>

                        <span className="text-sm font-medium">
                          {member.userEmail}
                        </span>
                      </div>
                    </td>

                    <td>
                      <span className="badge badge-ghost">{member.role}</span>
                    </td>

                    <td className="text-right">
                      <button
                        onClick={() => handleAddedMember(member.userEmail)}
                        className="btn btn-primary btn-sm"
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProjectKanbanBoard;
