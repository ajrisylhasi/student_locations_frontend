import * as React from "react";
import Drawer from "@mui/material/Drawer";
import PropTypes from "prop-types";

const MobileDrawer = ({ closeDrawer, open, children }) => (
  <Drawer anchor="left" open={open} onClose={closeDrawer}>
    {children}
  </Drawer>
);

MobileDrawer.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default MobileDrawer;
