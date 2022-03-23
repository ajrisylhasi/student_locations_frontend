import * as React from "react";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

const Marker = ({ handleClick }) => (
  <Box position="absolute" sx={{ transform: "translate(-50%,-50%)" }}>
    <FmdGoodIcon
      color="secondary"
      sx={{ cursor: "pointer", fontSize: "2rem" }}
      onClick={handleClick}
    />
  </Box>
);

Marker.propTypes = {
  handleClick: PropTypes.func,
};

Marker.defaultProps = {
  handleClick: () => {},
};

export default Marker;
