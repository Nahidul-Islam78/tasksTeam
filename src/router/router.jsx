import { createBrowserRouter } from 'react-router';
import RootLayout from '../layout/RootLayout';
import HomePage from '../pages/home/HomePage';
import AuthLayout from '../layout/AuthLayout';
import Signup from '../pages/auth/Signup';
import Login from '../pages/auth/Login';
import Onboarding from '../pages/onboarding/Onboarding';
import DashboardLayout from '../layout/DashboardLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import Project from '../pages/dashboard/Project';
import ProjectKanbanBoard from '../pages/dashboard/ProjectKanbanBoard';
import InviteAccept from '../pages/invite/InviteAccept';
import PrivetRoute from './PrivetRoute';
import Workspaces from '../pages/dashboard/Workspaces';
import Workspace from '../pages/dashboard/Workspace';
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
        Component: Workspaces,
      },
      {
        path: 'workspaces/:id',
        Component: Workspace,
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
