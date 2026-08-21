import React from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import {
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  User,
  ChevronDown,
} from 'lucide-react';

import Logo from './Logo';
import useAuth from '../hooks/useAuth';

const Naver = () => {
  const { user, logoutUser } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handelLogout = () => {
    logoutUser()
      .then(() => {
        setProfileOpen(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const navItems = [
    {
      name: 'Features',
      href: '#features',
    },
    {
      name: 'Solutions',
      href: '#solutions',
    },
    {
      name: 'About',
      href: '#about',
    },
    {
      name: 'Contact',
      href: '#contact',
    },
  ];

  return (
    <header className=" border-b border-white/10 text-white ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* ================= LOGO ================= */}

          <div className="flex items-center">
            <Link to="/" className="shrink-0">
              <Logo />
            </Link>
          </div>

          {/* ================= DESKTOP NAV ================= */}

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map(item => (
              <a
                key={item.name}
                href={item.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                {item.name}
              </a>
            ))}

            {user && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `ml-2 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <LayoutDashboard size={17} />
                Dashboard
              </NavLink>
            )}
          </nav>

          {/* ================= RIGHT SIDE ================= */}

          <div className="hidden items-center gap-3 lg:flex">
            {!user ? (
              <>
                <Link
                  to="/auth/login"
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-300 transition hover:text-white"
                >
                  Login
                </Link>

                <Link
                  to="/auth/sign-up"
                  className="rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-600"
                >
                  Get Started
                </Link>
              </>
            ) : (
              /* ================= USER MENU ================= */

              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2 py-1.5 transition hover:bg-white/10"
                >
                  {/* Avatar */}

                  <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-indigo-500 font-semibold">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User size={18} />
                    )}
                  </div>

                  <div className="hidden text-left xl:block">
                    <p className="max-w-32 truncate text-sm font-semibold text-white">
                      {user?.displayName || 'User'}
                    </p>

                    <p className="max-w-32 truncate text-xs text-slate-400">
                      {user?.email}
                    </p>
                  </div>

                  <ChevronDown
                    size={16}
                    className={`text-slate-400 transition ${
                      profileOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown */}

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl">
                    {/* User info */}

                    <div className="border-b border-slate-800 p-4">
                      <p className="truncate text-sm font-semibold text-white">
                        {user?.displayName || 'User'}
                      </p>

                      <p className="mt-1 truncate text-xs text-slate-400">
                        {user?.email}
                      </p>
                    </div>

                    {/* Dashboard */}

                    <Link
                      to="/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
                    >
                      <LayoutDashboard size={17} />
                      Dashboard
                    </Link>

                    {/* Logout */}

                    <button
                      onClick={handelLogout}
                      className="flex w-full items-center gap-3 border-t border-slate-800 px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ================= MOBILE BUTTON ================= */}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-300 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}

        {mobileMenuOpen && (
          <div className="border-t border-white/10 py-4 lg:hidden">
            <nav className="flex flex-col gap-1">
              {navItems.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  {item.name}
                </a>
              ))}

              {user && (
                <NavLink
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </NavLink>
              )}
            </nav>

            {/* Mobile Auth */}

            <div className="mt-4 border-t border-white/10 pt-4">
              {!user ? (
                <div className="flex gap-2">
                  <Link
                    to="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 rounded-lg border border-white/10 px-4 py-2.5 text-center text-sm font-semibold text-slate-300"
                  >
                    Login
                  </Link>

                  <Link
                    to="/auth/sign-up"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 rounded-lg bg-indigo-500 px-4 py-2.5 text-center text-sm font-semibold text-white"
                  >
                    Get Started
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => {
                    handelLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-400"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Naver;