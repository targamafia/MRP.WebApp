import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material';
import { ReactElement } from 'react';

const theme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: '#2C5F86',
    },
    secondary: {
      main: '#D58A3F',
    },
  },
  typography: {
    fontFamily: [
      'DM Sans',
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    button: {
      fontWeight: 700,
    },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: 'DM Sans',
          padding: '.125rem .0875rem',
          fontWeight: 700,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          color: '#fff',
          textTransform: 'none',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: 'var(--main)',
        },
      },
    },
  },
});

export const MUIThemeProvider = (props: {
  children: ReactElement | ReactElement[];
}) => <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
