import React from 'react';
import {
  Bell,
  CalendarDays,
  ChevronDown,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Search,
  Settings,
  Users,
  X,
  FolderKanban,
  CheckSquare,
  BarChart3,
  LogOut,
} from 'lucide-react';

import { NavLink, Outlet, Link } from 'react-router';
import useAuth from '../hooks/useAuth';
import Logo from '../component/Logo';

const DashboardLayout = () => {
  const { loading, user, logoutUser } = useAuth();

  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );
  }

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Projects',
      path: '/project',
      icon: FolderKanban,
    },
    
    {
      name: 'Workspace',
      path: '/workspace',
      icon: Users,
    },
    
  ];

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* ================= MOBILE OVERLAY ================= */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-64 flex-col
          border-r border-slate-200 bg-white
          transition-transform duration-300
          lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}

        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Workspace
          </p>

          <nav className="space-y-1">
            {menuItems.map(item => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `
                    group flex items-center gap-3 rounded-xl px-3 py-2.5
                    text-sm font-medium transition-all
                    ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }
                    `
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon size={19} strokeWidth={isActive ? 2.5 : 2} />

                      <span>{item.name}</span>

                      {item.name === 'Tasks' && (
                        <span className="ml-auto rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-semibold text-indigo-600">
                          8
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User */}

        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="profile"
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold uppercase text-white">
                  {user?.displayName?.charAt(0) || 'U'}
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">
                {user?.displayName || 'User'}
              </p>

              <p className="truncate text-xs text-slate-500">
                {user?.email || 'user@example.com'}
              </p>
            </div>

            <button
              onClick={handleLogout}
              title="Logout"
              className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MAIN AREA ================= */}

      <div className="lg:ml-64">
        {/* ================= TOP NAVBAR ================= */}

        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-md sm:px-6 lg:px-8">
          {/* Left */}

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 hover:bg-slate-50 lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>

          {/* Right */}

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search */}

            <div className="hidden md:flex">
              <div className="flex w-64 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <Search size={18} className="text-slate-400" />

                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Notification */}

            <button className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
              <Bell size={20} />
            </button>

            {/* Message */}

            <button className="hidden rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 sm:block">
              <MessageSquare size={20} />
            </button>

            {/* Profile */}

            <button className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-100">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="profile"
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold uppercase text-white">
                  {user?.displayName?.charAt(0) || 'U'}
                </div>
              )}
            </button>
          </div>
        </header>

        {/* ================= PAGE CONTENT ================= */}

        <main className="min-h-[calc(100vh-80px)] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
