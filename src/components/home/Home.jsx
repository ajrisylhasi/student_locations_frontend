import React, { useContext, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Map from "components/maps/Map";
import Marker from "components/maps/Marker";
import axios from "axios";
import { mapsActions } from "store/maps-reducer";
import SelectedPlaceFields from "components/places/SelectedPlaceFields";
import SwipeableSelectedPlace from "../places/SwipeableSelectedPlace";
import { storeContext } from "../provider/Provider";
import { layoutActions } from "../../store/layout-reducer";

const { REACT_APP_SITE_URL } = process.env;
const HomeContent = () => {
  const { state, dispatch } = useContext(storeContext);
  const isPhone = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    dispatch({
      type: layoutActions.LAYOUT_SET_ALL,
      payload: {
        pageTitle: "Dashboard",
      },
    });
  }, []);

  useEffect(() => {
    axios.get(`${REACT_APP_SITE_URL}/api/places/`).then((res) => {
      dispatch({
        type: mapsActions.MAPS_SET_ALL,
        payload: {
          allPlaces: res.data,
        },
      });
    });
  }, []);

  return (
    <Grid container spacing={3} sx={{ height: "100%" }}>
      {!isPhone ? (
        <Grid item xs={12} md={4} xl={2}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <SelectedPlaceFields />
          </Paper>
        </Grid>
      ) : (
        <SwipeableSelectedPlace />
      )}
      <Grid item xs={12} md={8} xl={10}>
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
            {state.maps.allPlaces?.map((place) => (
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

const Home = () => <HomeContent />;

export default Home;
