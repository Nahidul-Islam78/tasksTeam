import { createBrowserRouter } from 'react-router';
import RootLayout from '../layout/RootLayout';
import HomePage from '../pages/home/HomePage';
import AuthLayout from '../layout/AuthLayout';
import Signup from '../pages/auth/Signup';
import Login from '../pages/auth/Login';
export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component:HomePage
      }
    ]
  },
  {
    path: 'auth',
    Component: AuthLayout,
    children: [
      {
        path: 'sign-up',
        Component:Signup
      },
      {
        path: 'login',
        Component:Login
      }
    ]
  }
]);
