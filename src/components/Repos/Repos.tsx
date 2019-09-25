import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import axios from 'axios';

export const Repos = () => {
  useEffect(() => {
    axios.get(`https://api.github.com/user/repos`).then(res => {
      console.log(res);
    });
  }, []);

  return <Box mt={3}>repos here</Box>;
};
