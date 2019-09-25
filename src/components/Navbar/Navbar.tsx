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

const StyledAppBar = styled(AppBar)`
  &&& {
    box-shadow: ${({ theme }) => theme.palette.shadow};
    background-color: inherit;
    color: inherit;
  }
`;

export const Navbar = () => {
  const { isAuthenticated } = useAuth();

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
          {isAuthenticated && <div>logged in</div>}
        </Toolbar>
      </StyledAppBar>
      <Toolbar />
    </>
  );
};
