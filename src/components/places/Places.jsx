import React, { useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { storeContext } from "components/provider/Provider";
import Paper from "@mui/material/Paper";
import { useMediaQuery } from "react-responsive";
import Map from "components/maps/Map";
import { layoutActions } from "store/layout-reducer";
import Marker from "components/maps/Marker";
import SelectedPlaceFields from "components/places/SelectedPlaceFields";
import SwipeableSelectedPlace from "components/places/SwipeableSelectedPlace";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { mapsActions } from "../../store/maps-reducer";

const { REACT_APP_SITE_URL } = process.env;

const Places = () => {
  const { id } = useParams();
  const { state, dispatch } = useContext(storeContext);
  const isPhone = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    dispatch({
      type: layoutActions.LAYOUT_SET_ALL,
      payload: {
        pageTitle: id ? "User Places" : "My Places",
      },
    });
    dispatch({
      type: mapsActions.MAPS_INITIAL_SELECTED_PLACE,
    });
  }, []);

  useEffect(() => {
    axios
      .get(`${REACT_APP_SITE_URL}/api/${id ? `users/${id}` : "me"}/places/`)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: mapsActions.MAPS_SET_ALL,
            payload: {
              userPlaces: res.data,
            },
          });
          if (res.data.length > 0) {
            dispatch({
              type: mapsActions.MAPS_SET_ALL,
              payload: {
                selectedPlace: {
                  ...state.maps.selectedPlace,
                  id: res.data[0].id,
                  name: res.data[0].name,
                  category: res.data[0].category,
                  description: res.data[0].description,
                  current: res.data[0].current,
                },
              },
            });
          }
        }
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
            {state.maps.userPlaces.length > 0 ? (
              <>
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
              </>
            ) : (
              <Typography variant="p" component="p">
                No Created Places
              </Typography>
            )}
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

export default Places;
