import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router';

const Signup = () => {
  const { createUser } = useAuth()
  const navigate=useNavigate()
  const { handleSubmit, register, } = useForm();
  const handelSignup = data => {
    console.log(data);
    createUser(data.email, data.password).then(user => {
      console.log(user)
      navigate('/onboarding')
    }).catch(error => {
      console.log(error)
    })
  }
  return (
    <div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleSubmit(handelSignup)}>
          <div className="card-body">
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                {...register('name')}
                type="text"
                className="input"
                placeholder="Name"
              />
              <label className="label">Email</label>
              <input
                {...register('email')}
                type="email"
                className="input"
                placeholder="Email"
              />
              <label className="label">Password</label>
              <input
                {...register('password')}
                type="password"
                className="input"
                placeholder="Password"
              />

              <button className="btn btn-neutral mt-4">Sign Up</button>
            </fieldset>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;