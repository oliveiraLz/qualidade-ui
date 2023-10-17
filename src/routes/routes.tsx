import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import React from 'react';
import Device from '../pages/Device';

interface IRoutes {
  path: string;
  element: JSX.Element;
}

export const AppRoutes: React.FC = () => {
  const routes: IRoutes[] = [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/device',
      element: <Device />,
    },
  ];

  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route path={path} element={element} key={path} />
      ))}
    </Routes>
  );
};
