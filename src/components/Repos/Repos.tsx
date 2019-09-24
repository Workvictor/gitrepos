import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import axios from 'axios';

import { useAuth0 } from '../AuthWrapper';

export const Repos = () => {
  const { getTokenSilently, user } = useAuth0();

  useEffect(() => {
    if (user && getTokenSilently) {
      getTokenSilently().then(accessToken => {
        axios.post('https://api.github.com/authorizations').then(res=>{

          console.log(res);
        });
        axios
          .get(`https://api.github.com/user/repos`, {
            method: 'GET',
            headers: {
              Accept: 'application/vnd.github.v3+json',
              Authorization: `Bearer ${accessToken}`
            }
          })
          .then(res => {
            console.log(res);
          });
      });
    }
  }, [user]);

  return <Box mt={3}>repos here</Box>;
};
