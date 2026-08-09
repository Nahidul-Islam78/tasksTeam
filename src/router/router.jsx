import { createBrowserRouter } from 'react-router';
import RootLayout from '../layout/RootLayout';
import HomePage from '../pages/home/HomePage';
import AuthLayout from '../layout/AuthLayout';
import Signup from '../pages/auth/Signup';
import Login from '../pages/auth/Login';
import Onboarding from '../pages/onboarding/Onboarding';
import DashboardLayout from '../layout/DashboardLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import Workspace from '../pages/dashboard/Workspaces';
import Project from '../pages/dashboard/Project';
import ProjectKanbanBoard from '../pages/dashboard/projectKanbanBoard';
import SingleWorkspace from '../pages/dashboard/SingleWorkspace';
import InviteAccept from '../pages/invite/InviteAccept';
import PrivetRoute from './PrivetRoute';
export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
    ],
  },
  {
    path: 'auth',
    Component: AuthLayout,
    children: [
      {
        path: 'sign-up',
        Component: Signup,
      },
      {
        path: 'login',
        Component: Login,
      },
    ],
  },
  {
    path: '/',
    element: (
      <PrivetRoute>
        <DashboardLayout></DashboardLayout>
      </PrivetRoute>
    ),
    children: [
      {
        path: 'dashboard',
        Component:Dashboard
      },
      {
        path: 'workspace',
        Component: Workspace,
      },
      {
        path: 'workspaces/:id',
        Component: SingleWorkspace,
      },
      {
        path: 'project',
        Component: Project,
      },
      {
        path: 'projects/:id',
        Component: ProjectKanbanBoard,
      },
    ],
  },
  {
    path: 'onboarding',
    Component: Onboarding,
  },
  {
    path: 'invite/:token',
    Component: InviteAccept,
  },
]);
