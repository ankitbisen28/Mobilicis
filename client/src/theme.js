import { createTheme } from "@mui/material/styles";
import "@fontsource/roboto/300.css";

const theme = createTheme({
  typography: {
    fontFamily: "roboto",
  },
  palette: {
    primary: {
      main: "#1E2875",
    },
    secondary: {
      main: "#1A1558",
    },
    info: {
      main: "#222222",
    },
    success: {
      main: "#373B5C",
    },
    light: {
      main: "#FFFFF"
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  // ... other theme options ...
});

export default theme;
