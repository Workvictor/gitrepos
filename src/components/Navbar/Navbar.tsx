import React from 'react';
import styled from 'styled-components';
import {
  AppBar,
  Box,
  FormControlLabel,
  Switch,
  Toolbar
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { useAuth } from '../Auth';
import { useThemeSwitcher } from '../../theme/CustomProvider';
import { Avatar } from '../layout/Avatar';
import { LoginButton } from '../LoginButton/LoginButton';

const StyledAppBar = styled(AppBar)`
  &&& {
    box-shadow: ${({ theme }) => theme.palette.shadow};
    background-color: inherit;
    color: inherit;
  }
`;

export const Navbar = () => {
  const { user } = useAuth();

  const { switchThemeType, themeType } = useThemeSwitcher();

  return (
    <>
      <StyledAppBar color="inherit">
        <Toolbar>
          <Box mr={2}>
            <Link to="/">go to home</Link>
          </Box>
          <Box mr={2}>
            <Link to="/repos">go to repos</Link>
          </Box>
          <FormControlLabel
            control={
              <Switch
                checked={themeType === 'dark'}
                onChange={switchThemeType}
              />
            }
            label={`${themeType} theme`}
          />
          {user && (
            <Box ml={2} display="flex" alignItems="center">
              <LoginButton /> <Avatar image={user.picture} />
              {user.nickname}
            </Box>
          )}
        </Toolbar>
      </StyledAppBar>
      <Toolbar />
    </>
  );
};
