import Typography from "@mui/material/Typography";
import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import ListItemIcon from "@mui/material/ListItemIcon";
import CancelIcon from "@mui/icons-material/Cancel";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import axios from "axios";
import getDate from "shared/utils/formattedDate";

const { REACT_APP_SITE_URL } = process.env;
const SelectedParticipationFields = ({ participation, refresh }) => {
  const handleCancel = () => {
    axios
      .delete(`${REACT_APP_SITE_URL}/api/participations/${participation.id}`)
      .then((res) => {
        if (res.status === 204) {
          refresh();
        }
      });
  };
  return (
    <>
      <Typography variant="h5" component="p" mt={2}>
        Place Name: {participation.name}
      </Typography>
      <Typography variant="h5" component="p" mt={2}>
        Event Name: {participation.event_name}
      </Typography>
      <Grid container display="flex" flexWrap="wrap">
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" component="p" mt={2}>
            Time: {getDate(participation.time)}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} textAlign="right">
          <ListItemButton onClick={handleCancel}>
            <ListItemIcon>
              <CancelIcon />
            </ListItemIcon>
            <ListItemText primary="Cancel" />
          </ListItemButton>
        </Grid>
      </Grid>
    </>
  );
};

SelectedParticipationFields.propTypes = {
  participation: PropTypes.shape({
    id: PropTypes.number,
    event_name: PropTypes.string,
    name: PropTypes.string,
    time: PropTypes.string,
  }).isRequired,
  refresh: PropTypes.func.isRequired,
};

export default SelectedParticipationFields;
