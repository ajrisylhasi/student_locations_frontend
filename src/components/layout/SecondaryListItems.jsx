import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useHistory } from "react-router-dom";
import { authActions } from "../../store/auth-reducer";
import { storeContext } from "../provider/Provider";

const SecondaryListItems = () => {
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
      <ListItemButton>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
      <ListItemButton onClick={() => history.push("/settings")}>
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
export default SecondaryListItems;
