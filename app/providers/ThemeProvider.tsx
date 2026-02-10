'use client';

import { ReactNode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

interface AppThemeProviderProps {
  children: ReactNode;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#2e6b50',
      light: 'rgba(46, 107, 80, 0.1)',
    },
    background: {
      default: '#f6f7f7',
      paper: '#ffffff',
    },
    text: {
      primary: '#131615',
      secondary: '#6c7f76',
    },
    grey: {
      100: '#f1f3f2',
      200: '#dee3e1',
      300: '#2d3a34',
    },
  },
  typography: {
    fontFamily: '"Manrope", sans-serif',
  },
});

export default function AppThemeProvider({ children }: AppThemeProviderProps) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}