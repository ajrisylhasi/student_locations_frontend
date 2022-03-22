import React from "react";
import { useHistory } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import ThumbsUpDown from "@mui/icons-material/ThumbsUpDown";
import AddCircleIcon from "@mui/icons-material/AddCircle";
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
      <ListItemButton>
        <ListItemIcon>
          <BookmarksIcon />
        </ListItemIcon>
        <ListItemText primary="Favorite Locations" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <ThumbsUpDown />
        </ListItemIcon>
        <ListItemText primary="Reviews" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          history.push("/");
          closeDrawer();
        }}
      >
        <ListItemIcon>
          <AddCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Add a Place" />
      </ListItemButton>
    </>
  );
};

MainListItems.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
};
export default MainListItems;
