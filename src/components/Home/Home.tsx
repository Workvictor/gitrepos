import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';

import { useAuth } from '../Auth';
import { LoginButton } from '../LoginButton/LoginButton';

export const Home = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Box mt={3}>
      {isAuthenticated ? (
        <>
          go to <Link to="/repos">repos</Link>
        </>
      ) : (
        <>
          <LoginButton />
        </>
      )}
    </Box>
  );
};
