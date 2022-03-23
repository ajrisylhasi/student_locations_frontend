import { Alert, Snackbar } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const Signal = ({ open, handleClose, type, message }) => (
  <Snackbar
    open={open}
    autoHideDuration={5000}
    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    onClose={handleClose}
  >
    <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
      {message}
    </Alert>
  </Snackbar>
);

Signal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Signal;
