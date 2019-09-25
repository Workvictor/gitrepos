import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

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

  useEffect(() => {
    if (savedToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
    }
  }, []);

  const login = (code: string, redirectUrl?: string) =>
    axios
      .post<{ token: string }>('/api/code', { code })
      .then(({ data: { token } }) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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
      {children}
    </Auth.Provider>
  );
};
