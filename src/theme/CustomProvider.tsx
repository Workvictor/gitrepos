import React, { createContext, useContext, useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { AppGlobalStyle, theme, TThemeType } from './theme';

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.bg};
  color: ${({ theme }) => theme.palette.main};
  min-height: 100vh;
`;

const getSavedThemeType = window.localStorage.getItem(
  'themeType'
) as TThemeType;

const ThemeContext = createContext({
  switchThemeType: () => {},
  themeType: getSavedThemeType
});

const saveThemeType = (type: TThemeType) =>
  window.localStorage.setItem('themeType', type);

export const useThemeSwitcher = () => useContext(ThemeContext);

export const CustomProvider: React.FC = ({ children }) => {
  const [themeType, switchThemeType] = useState<TThemeType>(
    getSavedThemeType || 'light'
  );
  const themeNow = theme(themeType);

  const providerValue = {
    switchThemeType: () =>
      switchThemeType(themeType === 'light' ? 'dark' : 'light'),
    themeType
  };

  useEffect(() => saveThemeType(themeType), [themeType]);

  return (
    <ThemeProvider theme={themeNow}>
      <ThemeContext.Provider value={providerValue}>
        <Wrapper>
          <AppGlobalStyle />
          {children}
        </Wrapper>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};
