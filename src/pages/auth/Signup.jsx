import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import useAxios from '../../hooks/useAxios';
import { Eye, EyeOff } from 'lucide-react';
import Logo from '../../component/Logo';
import { FcGoogle } from 'react-icons/fc';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const axios = useAxios();
  const { handleSubmit, register, } = useForm();
  
  const handelSignup = data => {
   
    createUser(data.email, data.password).then(user => {
      updateUser({ displayName: data.name, photoURL: null }).then(() => {
        axios.post(`/users`, data).then(res => {
          console.log(res);
        });
        navigate('/onboarding');
      }).catch(error => {
        console.log(error);
      })
    }).catch(error => {
      console.log(error)
    })
  }
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center">
        <div className="w-full">
          {/* Logo */}
          <div className="mb-8 text-center">
            <Link to="/" className="inline-flex items-center gap-2">
              <Logo></Logo>
            </Link>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            {/* Heading */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900">
                Create your account
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Start managing your projects with taskTeam.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(handelSignup)}
              className="mt-8 space-y-5"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Full Name
                </label>

                <input
                  {...register('name')}
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email Address
                </label>

                <input
                  {...register('email')}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    {...register('password')}
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>
              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create Account
              </button>
            </form>
            {/*google*/}
            <div>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 mt-3"
              >
                <FcGoogle size={20} />
                Continue with Google
              </button>
            </div>

            {/* Login */}
            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{' '}
              <Link
                to="/auth/login"
                className="font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} taskTeam. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;