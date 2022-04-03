import React from "react";
import { useHistory } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import PropTypes from "prop-types";

const MainListItems = ({ closeDrawer }) => {
  const history = useHistory();

  return (
    <>
      <ListItemButton
        onClick={() => {
          history.push("/");
          closeDrawer();
        }}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          history.push("/events");
          closeDrawer();
        }}
      >
        <ListItemIcon>
          <EventAvailableIcon />
        </ListItemIcon>
        <ListItemText primary="Events" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          history.push("/users");
          closeDrawer();
        }}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          history.push("/new-place");
          closeDrawer();
        }}
      >
        <ListItemIcon>
          <AddLocationAltIcon />
        </ListItemIcon>
        <ListItemText primary="Add a Place" />
      </ListItemButton>

      <ListItemButton
        onClick={() => {
          history.push("/new-event");
          closeDrawer();
        }}
      >
        <ListItemIcon>
          <AddCircleOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Add an Event" />
      </ListItemButton>
    </>
  );
};

MainListItems.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
};
export default MainListItems;
