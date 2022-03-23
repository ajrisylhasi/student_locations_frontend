import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { storeContext } from "components/provider/Provider";
import Paper from "@mui/material/Paper";
import { useMediaQuery } from "react-responsive";
import Map from "components/maps/Map";
import { layoutActions } from "store/layout-reducer";
import SwipeablePlaceForm from "components/places/SwipeablePlaceForm";
import NewPlaceForm from "components/places/NewPlaceForm";
import { mapsActions } from "../../store/maps-reducer";

const NewPlace = () => {
  const { dispatch } = useContext(storeContext);
  const isPhone = useMediaQuery({ query: "(max-width: 768px)" });
  const [center, setCenter] = useState({ lat: 47.5399565, lng: 21.6286541 });

  const loadMap = (map, maps) => {
    const marker = new maps.Marker({
      position: center,
      map,
      draggable: true,
    });

    marker.addListener("dragend", (event) => {
      setCenter({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
      dispatch({
        type: mapsActions.MAPS_SET_ALL,
        payload: {
          newPlaceForm: true,
        },
      });
    });
  };

  useEffect(() => {
    dispatch({
      type: layoutActions.LAYOUT_SET_ALL,
      payload: {
        pageTitle: "Add New Place",
      },
    });
  }, []);

  return (
    <Grid container spacing={3} sx={{ height: "100%" }}>
      {!isPhone ? (
        <Grid item xs={12} md={5} xl={5}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              alignItems: "center",
              margin: "auto",
            }}
          >
            <NewPlaceForm center={center} />
          </Paper>
        </Grid>
      ) : (
        <SwipeablePlaceForm center={center} />
      )}
      <Grid item xs={12} md={7} xl={7}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Map
            lng={center.lng}
            zoom={14}
            lat={center.lat}
            onGoogleApiLoaded={({ map, maps }) => loadMap(map, maps)}
            yesIWantToUseGoogleMapApiInternals
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default NewPlace;
