import 'styled-components';
import { DefaultTheme, createGlobalStyle, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const breakpoints = [425, 768, 1180];

const device = {
  xs: `(max-width: ${breakpoints[0]}px)`,
  md: `(max-width: ${breakpoints[1]}px)`,
  lg: `(max-width: ${breakpoints[2]}px)`
};

const colors = {
  accent: '#c34080'
};

interface ThemePalette {
  accent: string;
  bg: string;
  main: string;
  shadow: string;
}

export type TThemeType = 'light' | 'dark';

const palette: { [key in TThemeType]: ThemePalette } = {
  light: {
    ...colors,
    main: '#191919',
    bg: '#ebebeb',
    shadow: '0 10px 15px hsla(0, 0%, 0%, 0.15)'
  },
  dark: {
    ...colors,
    bg: '#131313',
    main: '#d6d6d6',
    shadow: '0 10px 15px hsla(0, 0%, 100%, 0.15)'
  }
};

const animations = {
  fadeIn
};

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof colors;
    animations: typeof animations;
    breakpoints: typeof breakpoints;
    device: typeof device;
    palette: ThemePalette;
  }
}

export const theme = (themeType?: TThemeType): DefaultTheme => ({
  colors,
  animations,
  breakpoints,
  device,
  palette: palette[themeType || 'light']
});

export const AppGlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
  }
  body {
    font-size: 1.15rem;
    padding: 0;
    margin: 0;
  }
  body * {
    padding: 0;
    margin: 0;
  }
`;
