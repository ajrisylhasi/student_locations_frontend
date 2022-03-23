import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import Link from "@mui/material/Link";
import { storeContext } from "../provider/Provider";

const SelectedPlaceFields = () => {
  const { state } = useContext(storeContext);
  return (
    <>
      <Typography variant="h4" component="h4">
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
    </>
  );
};
export default SelectedPlaceFields;
