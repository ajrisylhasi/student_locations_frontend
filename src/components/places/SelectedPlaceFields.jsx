import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import Link from "@mui/material/Link";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ListItemText from "@mui/material/ListItemText";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import { storeContext } from "../provider/Provider";

const SelectedPlaceFields = () => {
  const { state } = useContext(storeContext);
  const history = useHistory();
  return (
    <>
      <Typography variant="h4" component="h4" textAlign="center">
        {state.maps.selectedPlace?.name}
      </Typography>
      <Typography variant="subtitle2" component="p" mt={2}>
        {state.maps.selectedPlace?.category}
      </Typography>
      {state.maps.selectedPlace?.average_rating && (
        <Typography variant="subtitle2" component="p" mt={2}>
          Average Rating: {state.maps.selectedPlace?.average_rating}/5
        </Typography>
      )}
      {state.maps.selectedPlace?.lat && state.maps.selectedPlace?.lng && (
        <Typography variant="body2" color="text.secondary">
          <Link
            color="inherit"
            href={`https://www.google.com/maps/search/?api=1&query=${state.maps.selectedPlace?.lat},${state.maps.selectedPlace?.lng}`}
            target="_blank"
          >
            Open in Maps
          </Link>
        </Typography>
      )}
      <Typography variant="body2" component="p" mt={2}>
        {state.maps.selectedPlace?.description}
      </Typography>
      <Box>
        <ListItemButton
          onClick={() => {
            history.push(`/places/${state.maps.selectedPlace.id}/events`);
          }}
        >
          <ListItemIcon>
            <EventAvailableIcon />
          </ListItemIcon>
          <ListItemText primary="Events" />
        </ListItemButton>
        {state.maps.selectedPlace.current && (
          <>
            <ListItemButton
              onClick={() => {
                history.push(`/places/${state.maps.selectedPlace.id}/edit`);
              }}
            >
              <ListItemIcon>
                <EditLocationIcon />
              </ListItemIcon>
              <ListItemText primary="Edit Place" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                history.push(`/new-event/${state.maps.selectedPlace.id}`);
              }}
            >
              <ListItemIcon>
                <AddCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Add an Event" />
            </ListItemButton>
          </>
        )}
      </Box>
    </>
  );
};
export default SelectedPlaceFields;
