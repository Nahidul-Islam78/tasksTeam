import React from 'react';
import Logo from './Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../hooks/useAuth';

const Naver = () => {
  const { user, logoutUser } = useAuth();
  const handelLogout = () => {
    logoutUser().then(() => {
      
    }).catch(error=>{
      
    })
  }
  return (
    <div>
      <div className="navbar text-[#ffffff] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {' '}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{' '}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Features</a>
              </li>
              <li>
                <a>Solutions</a>
              </li>
              <li>
                <a>About</a>
              </li>
              <li>
                <a>Contact</a>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
          <Logo></Logo>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Features</a>
            </li>
            <li>
              <a>Solutions</a>
            </li>
            <li>
              <a>About</a>
            </li>
            <li>
              <a>Contact</a>
            </li>
            {user && (
              <>
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <button onClick={handelLogout} className="btn  mr-2">
              Logout
            </button>
          ) : (
            <Link to={'/auth/login'} className="btn mr-2">
              Login
            </Link>
          )}
          {!user && (
            <Link to={'/auth/sign-up'} className="btn">
              Get Free
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Naver;