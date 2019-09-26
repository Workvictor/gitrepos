import React, { useEffect } from 'react';
import { Redirect } from 'react-router';

import { useAuth } from './Auth';

export const LoginCallback: React.FC = () => {
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      const code =
        new URLSearchParams(window.location.search).get('code') || '';
      login(code);
    }
  }, [isAuthenticated, login]);

  return isAuthenticated ? <Redirect to="/" /> : <div>...login</div>;
};
