import React, { createContext, useContext, useEffect, useState } from 'react';

import { api } from '../api';

const savedToken = window.localStorage.getItem('token');

interface IAuth {
  isAuthenticated: boolean;
  login: (code: string, redirectUrl?: string) => Promise<void>;
}

const initialState = {
  isAuthenticated: Boolean(savedToken),
  login: () => new Promise<void>(() => {})
};

const Auth = createContext<IAuth>(initialState);

const saveToken = (token: string) =>
  window.localStorage.setItem('token', token);

export const useAuth = () => useContext(Auth);

export const AuthProvider: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    Boolean(savedToken)
  );

  const [pending, setPending] = useState(true);

  useEffect(() => {
    if (savedToken) {
      api.setToken(savedToken);
    }
    setPending(false);
  }, []);

  const login = (code: string, redirectUrl?: string) =>
    api.getToken(code).then(token => {
      saveToken(token);
      setIsAuthenticated(true);
      redirectUrl && window.location.replace(redirectUrl);
    });

  return (
    <Auth.Provider
      value={{
        isAuthenticated,
        login
      }}
    >
      {pending ? null : children}
    </Auth.Provider>
  );
};
