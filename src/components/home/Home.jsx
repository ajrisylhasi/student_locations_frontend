import React, { useContext, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Map from "components/maps/Map";
import Marker from "components/maps/Marker";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { mapsActions } from "store/maps-reducer";
import SwipeableEdgeDrawer from "./SwipeableEdgeDrawer";
import { storeContext } from "../provider/Provider";

const { REACT_APP_SITE_URL } = process.env;
const HomeContent = () => {
  const { state, dispatch } = useContext(storeContext);
  const isPhone = useMediaQuery({ query: "(max-width: 768px)" });

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

  useEffect(() => {}, [state.maps.selectedDrawer]);
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
            <Typography variant="body2" component="p" mt={2}>
              {state.maps.selectedPlace?.description}
            </Typography>
          </Paper>
        </Grid>
      ) : (
        <SwipeableEdgeDrawer />
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
          <Map lng={21.6286541} zoom={14} lat={47.5399565}>
            {state.maps.allPlaces?.map((place) => (
              <Marker
                key={place.id}
                lat={place.lat}
                lng={place.lng}
                place={place}
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
