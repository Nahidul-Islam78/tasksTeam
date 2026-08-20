import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import { Link, NavLink } from 'react-router';
import {
  ArrowRight,
  CalendarDays,
  CheckSquare,
  FolderKanban,
  MoreHorizontal,
  Plus,
  Search,
  Users,
} from 'lucide-react';

const Project = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const { data: projects = [] } = useQuery({
    queryKey: ['projects', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/projects/${user.email}`);
      return res.data;
    },
  });

  const projectss = [
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Redesign the company website',
      progress: 65,
      members: 5,
      completedTasks: 13,
      totalTasks: 20,
      status: 'Active',
      deadline: 'Aug 30, 2026',
      color: 'bg-primary',
      initials: 'WR',
    },
    {
      id: 2,
      name: 'Mobile Application',
      description: 'Build a modern mobile application',
      progress: 40,
      members: 8,
      completedTasks: 8,
      totalTasks: 20,
      status: 'Active',
      deadline: 'Sep 15, 2026',
      color: 'bg-secondary',
      initials: 'MA',
    },
    {
      id: 3,
      name: 'Marketing Campaign',
      description: 'Q3 marketing campaign',
      progress: 90,
      members: 6,
      completedTasks: 18,
      totalTasks: 20,
      status: 'Completed',
      deadline: 'Aug 10, 2026',
      color: 'bg-accent',
      initials: 'MC',
    },
    {
      id: 4,
      name: 'TaskFlow Dashboard',
      description: 'Build TaskFlow dashboard interface',
      progress: 55,
      members: 4,
      completedTasks: 11,
      totalTasks: 20,
      status: 'Active',
      deadline: 'Sep 05, 2026',
      color: 'bg-info',
      initials: 'TD',
    },
  ];

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

          <button className="btn btn-primary gap-2">
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

          <button className="card  border-2 border-dashed border-base-300 bg-base-100 transition hover:border-primary hover:bg-primary/5">
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
    </div>
  );
};

export default Project;
