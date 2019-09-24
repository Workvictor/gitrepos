import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const savedToken = window.localStorage.getItem('token');

interface IAuth {
  isAuthenticated: boolean;
  login: () => Promise<void>;
}

const initialState = {
  isAuthenticated: Boolean(savedToken),
  login: () => new Promise<void>(() => {})
};

const Auth = createContext<IAuth>(initialState);

export const saveToken = (token: string) =>
  window.localStorage.setItem('token', token);

export const useAuth = () => useContext(Auth);

export const AuthProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<IAuth>(initialState);

  const login = (code: string) => {
    axios
      .post<{ token: string }>('/api/code', { code })
      .then(({ data: { token } }) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.get('https://api.github.com/user/repos').then(r => {
          console.log(r);
        });
      });
  }

  useEffect(()=>{
    saveToken(state.)
  }, [state])

  return <Auth.Provider value={state}>{children}</Auth.Provider>;
};
