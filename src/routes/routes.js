import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';


//
import Page404 from '../pages/Page404';
import LoadingScreen from '../components/loading/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
  <Suspense fallback={<LoadingScreen/>}>
    <Component {...props} />
  </Suspense>


export default function Router() {
  const routes = useRoutes([
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      path: '/',
      element: <HomeLayout />,
      children: [
        { element: <Landing />, index: true },
      ]
    },
    {
      path: 'thumbnail',
      element: <AuthGuard> <HomeLayout /></AuthGuard>,
      children: [
        { element: <Navigate to="/thumbnail/create" />, index: true },
        { path: 'create', element: <CreateThumbnail /> },
        { path: 'list', element: <ListThumbnail /> },
        { path: ':id', element: <ThumbnailDetails /> },
      ]
    },
    {
      element: <SimpleLayout />,
      children: [
        // { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

// layouts
const SimpleLayout = Loadable(lazy(() => import('../layouts/simple')));
const HomeLayout = Loadable(lazy(() => import('../layouts/home')));

// guards
const AuthGuard = Loadable(lazy(() => import('../guards/AuthGuard')));

// auth
const RegisterPage = Loadable(lazy(() => import('../pages/RegisterPage')));
const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));

// pages
const Landing = Loadable(lazy(() => import('../pages/Landing/Landing')));
const CreateThumbnail = Loadable(lazy(() => import('../pages/thumbnail/CreateThumbnail')));
const ListThumbnail = Loadable(lazy(() => import('../pages/thumbnail/ListThumbnail')));
const ThumbnailDetails = Loadable(lazy(() => import('../pages/thumbnail/ThumbnailDetails')));