import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import GoogleMapReact from "google-map-react";
import Deposits from "./Deposits";

const { REACT_APP_MAPS_API_KEY } = process.env;

const HomeContent = () => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={4} lg={3}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: 240,
        }}
      >
        <Deposits />
      </Paper>
    </Grid>
    <Grid item xs={12} md={4} lg={3}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: 240,
        }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{
            key: `${REACT_APP_MAPS_API_KEY}`,
          }}
          options={{ keyboardShortcuts: false }}
          defaultCenter={{ lat: 47.5289, lng: 21.6254 }}
          defaultZoom={14}
        >
          <p lat={47.5289} lng={21.6254}>
            Ajri
          </p>
        </GoogleMapReact>
      </Paper>
    </Grid>
  </Grid>
);

const Home = () => <HomeContent />;

export default Home;
