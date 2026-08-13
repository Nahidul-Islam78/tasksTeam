import React from 'react';
import { BsPersonWorkspace } from 'react-icons/bs';
import { GoProject } from 'react-icons/go';
import { MdDashboard } from 'react-icons/md';
import { NavLink, Outlet } from 'react-router';
import useAuth from '../hooks/useAuth';
import Logo from '../component/Logo';

const DashboardLayout = () => {
  const { loading } = useAuth();


  if (loading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input
          id="my-drawer-4"
          type="checkbox"
          className="drawer-toggle inline"
        />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost drawer-button"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4">
              <NavLink to="/">
                <Logo></Logo>
              </NavLink>
            </div>
          </nav>
          {/* Page content here */}
          <Outlet></Outlet>
        </div>

        <div className="drawer-side ">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/* List item */}
              <li>
                <NavLink
                  to="/dashboard"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Dashboard"
                >
                  <MdDashboard />
                  <span className="is-drawer-close:hidden">Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/project"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Project"
                >
                  <GoProject />

                  <span className="is-drawer-close:hidden">Project</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/workspace"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Workspace"
                >
                  <BsPersonWorkspace />

                  <span className="is-drawer-close:hidden">Workspace</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;