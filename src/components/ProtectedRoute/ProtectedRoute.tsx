import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useAuth } from '../Auth';

export const ProtectedRoute = (props: RouteProps) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: '/',
        state: { from: props.location }
      }}
    />
  );
};
