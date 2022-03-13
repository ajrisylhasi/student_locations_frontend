import * as React from "react";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

const Marker = ({ text }) => (
  <Box position="absolute" sx={{ transform: "translate(-50%,-50%)" }}>
    <FmdGoodIcon
      color="secondary"
      sx={{ cursor: "pointer" }}
      onClick={() => alert(text)}
    />
  </Box>
);

Marker.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Marker;
