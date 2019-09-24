import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useAuth0 } from '../AuthWrapper';

export const ProtectedRoute = (props: RouteProps) => {
  const { isAuthenticated } = useAuth0();
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
