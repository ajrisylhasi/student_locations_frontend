import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import React from "react";

const Copyright = (props) => (
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {"Copyright © "}
    <Link color="inherit" href="https://ajri.dev/" target="_blank">
      ajri.dev
    </Link>{" "}
    {new Date().getFullYear()}.
  </Typography>
);
export default Copyright;
