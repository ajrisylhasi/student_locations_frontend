import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import ListItemIcon from "@mui/material/ListItemIcon";
import AddIcon from "@mui/icons-material/Add";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import getDate from "shared/utils/formattedDate";
import axios from "axios";
import { storeContext } from "components/provider/Provider";
import CancelIcon from "@mui/icons-material/Cancel";

const { REACT_APP_SITE_URL } = process.env;
const SelectedEventFields = ({ event, refresh }) => {
  const { state } = useContext(storeContext);
  const handleParticipate = () => {
    axios
      .post(`${REACT_APP_SITE_URL}/api/participations/`, {
        user_id: state.auth.user.id,
        event_id: event.id,
      })
      .then(() => {
        refresh();
      });
  };

  const handleCancel = () => {
    axios
      .delete(`${REACT_APP_SITE_URL}/api/events/${event.id}/participation`)
      .then(() => {
        refresh();
      });
  };

  return (
    <>
      <Typography variant="h5" component="p" mt={2}>
        Event Name: {event.name}
      </Typography>
      <Grid container display="flex" flexWrap="wrap">
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" component="p" mt={2}>
            Time: {getDate(event.time)}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} textAlign="right">
          {event.participated ? (
            <ListItemButton onClick={handleCancel}>
              <ListItemIcon>
                <CancelIcon />
              </ListItemIcon>
              <ListItemText primary="Cancel" />
            </ListItemButton>
          ) : (
            <ListItemButton onClick={handleParticipate}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Participate" />
            </ListItemButton>
          )}
        </Grid>
      </Grid>
    </>
  );
};

SelectedEventFields.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    time: PropTypes.string,
    participated: PropTypes.bool,
  }).isRequired,
  refresh: PropTypes.func.isRequired,
};

export default SelectedEventFields;
