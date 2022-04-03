import Typography from "@mui/material/Typography";
import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import AddIcon from "@mui/icons-material/Add";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import getDate from "shared/utils/formattedDate";

const SelectedEventFields = ({ event }) => {
  const history = useHistory();
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
          <ListItemButton
            onClick={() => {
              history.push(`/`);
            }}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Participate" />
          </ListItemButton>
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
  }).isRequired,
};

export default SelectedEventFields;
