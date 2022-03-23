import React, { useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { storeContext } from "components/provider/Provider";
import Paper from "@mui/material/Paper";
import { useMediaQuery } from "react-responsive";
import Map from "components/maps/Map";
import { layoutActions } from "store/layout-reducer";
import Marker from "components/maps/Marker";
import SelectedPlaceFields from "components/home/SelectedPlaceFields";
import SwipeableSelectedPlace from "components/home/SwipeableSelectedPlace";
import axios from "axios";
import { mapsActions } from "../../store/maps-reducer";

const { REACT_APP_SITE_URL } = process.env;

const MyPlaces = () => {
  const { state, dispatch } = useContext(storeContext);
  const isPhone = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    dispatch({
      type: layoutActions.LAYOUT_SET_ALL,
      payload: {
        pageTitle: "My Places",
      },
    });
    dispatch({
      type: mapsActions.MAPS_INITIAL_SELECTED_PLACE,
    });
  }, []);

  useEffect(() => {
    axios.get(`${REACT_APP_SITE_URL}/api/me/places/`).then((res) => {
      dispatch({
        type: mapsActions.MAPS_SET_ALL,
        payload: {
          userPlaces: res.data,
        },
      });
    });
  }, []);

  return (
    <Grid container spacing={3} sx={{ height: "100%" }}>
      {!isPhone ? (
        <Grid item xs={12} md={4} xl={3}>
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
            <Map
              lng={state.maps.selectedPlace.lng}
              zoom={16}
              lat={state.maps.selectedPlace.lat}
              options={(map) => ({
                disableDefaultUI: true,
                rotateControl: false,
                mapTypeId: map.MapTypeId.HYBRID,
                fullscreenControl: true,
              })}
            >
              <Marker
                lat={state.maps.selectedPlace.lat}
                lng={state.maps.selectedPlace.lng}
              />
            </Map>
            <SelectedPlaceFields />
          </Paper>
        </Grid>
      ) : (
        <SwipeableSelectedPlace />
      )}
      <Grid item xs={12} md={8} xl={9}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Map
            lng={state.maps.selectedPlace.lng}
            zoom={14}
            lat={state.maps.selectedPlace.lat}
          >
            {state.maps.userPlaces.map((place) => (
              <Marker
                key={place.id}
                lat={place.lat}
                lng={place.lng}
                handleClick={() => {
                  dispatch({
                    type: mapsActions.MAPS_SET_ALL,
                    payload: {
                      selectedPlace: place,
                      selectedDrawer: true,
                    },
                  });
                }}
              />
            ))}
          </Map>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MyPlaces;
