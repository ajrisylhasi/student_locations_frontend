import * as React from "react";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { mapsActions } from "../../store/maps-reducer";
import { storeContext } from "../provider/Provider";

const Marker = ({ place }) => {
  const { dispatch } = useContext(storeContext);

  return (
    <Box position="absolute" sx={{ transform: "translate(-50%,-50%)" }}>
      <FmdGoodIcon
        color="secondary"
        sx={{ cursor: "pointer", fontSize: "2rem" }}
        onClick={() => {
          dispatch({
            type: mapsActions.MAPS_SET_ALL,
            payload: {
              selectedPlace: place,
            },
          });
        }}
      />
    </Box>
  );
};

Marker.propTypes = {
  place: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
  }).isRequired,
};

export default Marker;
