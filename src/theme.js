/* eslint-disable no-useless-computed-key */
import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 500,
      sm: 768,
      md: 992,
      lg: 1260,
      xl: 1920,
    },
  },
});

export default theme;
