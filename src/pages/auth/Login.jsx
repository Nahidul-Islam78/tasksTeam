import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

const Login = () => {
  const { loginUser } = useAuth();
  const { handleSubmit, register } = useForm();
  const navigate=useNavigate()

  const handelLogin = (data) => {
  
    loginUser(data.email, data.password).then(data => {
      console.log(data);
      navigate('/dashboard')
    }).catch(error=>{
      console.log(error)
    })
    
  }
  return (
    <div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSubmit(handelLogin)} className="fieldset">
            <label className="label">Email</label>
            <input {...register('email')} type="email" className="input" placeholder="Email" />
            <label className="label">Password</label>
            <input {...register('password')} type="password" className="input" placeholder="Password" />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;