import axios from 'axios';

const setToken = (token: string) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export interface IRepo {
  id: string;
  name: string;
  full_name: string;
  git_url: string;
  updated_at: string;
}

export const api = {
  setToken,
  getToken: (code: string) =>
    axios
      .post<{ token: string }>('/api/code', { code })
      .then(({ data: { token } }) => {
        setToken(token);
        return token;
      }),
  getRepos: () =>
    axios
      .get<IRepo[]>('https://api.github.com/user/repos')
      .then(({ data }) => data)
};
