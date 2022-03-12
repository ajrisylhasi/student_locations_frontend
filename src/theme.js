import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    mode: "light",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 420,
      md: 768,
      lg: 992,
      xl: 1260,
    },
  },
});

export default theme;
