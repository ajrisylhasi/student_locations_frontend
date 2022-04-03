import Typography from "@mui/material/Typography";
import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const SelectedUserFields = ({ user }) => {
  const history = useHistory();
  return (
    <>
      <Typography variant="h4" component="h4">
        Full Name: {user.fullname}
      </Typography>
      <Typography variant="h5" component="p" mt={2}>
        Username: {user.username}
      </Typography>
      <Grid container display="flex" flexWrap="wrap">
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" component="p" mt={2}>
            Faculty: {user.faculty}
          </Typography>
          <Typography variant="subtitle2" component="p" mt={2}>
            Course: {user.course}
          </Typography>
          <Typography variant="subtitle2" component="p" mt={2}>
            Nationality: {user.nationality}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} textAlign="right">
          <ListItemButton
            onClick={() => {
              history.push(`/users/${user.id}/places`);
            }}
          >
            <ListItemIcon>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Places" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              history.push(`/users/${user.id}/events`);
            }}
          >
            <ListItemIcon>
              <EventAvailableIcon />
            </ListItemIcon>
            <ListItemText primary="Events" />
          </ListItemButton>
        </Grid>
      </Grid>
    </>
  );
};

SelectedUserFields.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    fullname: PropTypes.string,
    username: PropTypes.string,
    faculty: PropTypes.string,
    course: PropTypes.string,
    nationality: PropTypes.string,
  }).isRequired,
};

export default SelectedUserFields;
