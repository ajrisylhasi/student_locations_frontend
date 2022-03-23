import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { authActions } from "store/auth-reducer";
import { storeContext } from "components/provider/Provider";

const SecondaryListItems = ({ closeDrawer }) => {
  const { dispatch } = React.useContext(storeContext);
  const history = useHistory();

  const handleLogout = () => {
    dispatch({ type: authActions.LOGOUT });
    history.push("/login");
  };

  return (
    <>
      <ListSubheader component="div" inset>
        Account Information
      </ListSubheader>
      <ListItemButton
        onClick={() => {
          history.push("/my-places");
          closeDrawer();
        }}
      >
        <ListItemIcon>
          <ShareLocationIcon />
        </ListItemIcon>
        <ListItemText primary="My Places" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          history.push("/settings");
          closeDrawer();
        }}
      >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </>
  );
};

SecondaryListItems.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
};
export default SecondaryListItems;
