import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router';
import useAxios from '../../hooks/useAxios';

const ProjectKanbanBoard = () => {
  const { id } = useParams();
  const axios = useAxios();
  const modalRef = useRef();
  //get columns
  const { data: columnsData = [] } = useQuery({
    queryKey: ['columns', id],
    queryFn: async () => {
      const res = await axios.get(`/columns/${id}`);
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
    console.log(columnId);
    modalRef.current.showModal();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Website Redesign</h1>
          <p className="text-gray-500">
            Manage your project using Kanban Board
          </p>
        </div>
      </div>

      {/* Board */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {columnsData.map(column => (
          <div key={column._id} className="rounded-xl bg-white p-4 shadow">
            {/* Column Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-lg">{column.title}</h2>

              <span className="rounded-full bg-slate-200 px-2 py-1 text-xs">
                {column.tasks.length}
              </span>
            </div>

            {/* Add Task */}
            <button
              className="mb-4 w-full rounded-lg border border-dashed border-slate-300 py-2 text-sm text-slate-500 hover:bg-slate-100"
              onClick={() => handelAddTask(column._id)}
            >
              + Add Task
            </button>
            {/* Tasks */}
            <div className="space-y-3">
              {column.tasks.map(task => (
                <div
                  key={task.id}
                  className="rounded-lg border bg-white p-4 shadow-sm"
                >
                  <h3 className="font-semibold">{task.title}</h3>

                  <span
                    className={`mt-2 inline-block rounded-full px-2 py-1 text-xs font-medium ${priorityColor[task.priority]}`}
                  >
                    {task.priority}
                  </span>

                  <div className="mt-3 text-sm text-gray-500">
                    👤 {task.assignee}
                  </div>

                  <div className="text-sm text-gray-500">📅 {task.dueDate}</div>

                  <div className="mt-4 flex justify-end">
                    <button className="text-gray-400 hover:text-black">
                      ⋮
                    </button>
                  </div>
                </div>
              ))}

              {column.tasks.length === 0 && (
                <div className="rounded-lg border border-dashed p-5 text-center text-sm text-gray-400">
                  No tasks
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <dialog
        ref={modalRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProjectKanbanBoard;
