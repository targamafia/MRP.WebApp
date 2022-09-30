import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material";
import { ReactElement } from "react";

const theme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: "#2C5F86",
    },
    secondary: {
      main: "#D58A3F",
    },
  },
  typography: {
    fontFamily: "Roboto",
    button: {
      fontWeight: 600,
    },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          padding: ".25rem .125rem",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          color: "#fff",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "var(--main)",
        },
      },
    },
  },
});

export const MUIThemeProvider = (props: {
  children: ReactElement | ReactElement[];
}) => <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
