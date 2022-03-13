import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CustomMap from "components/maps/CustomMap";
import Marker from "components/maps/Marker";
import Deposits from "./Deposits";

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
        <CustomMap lng={21.6254} zoom={14} lat={47.5289}>
          <Marker lat={47.5289} lng={21.6254} text="This is a test marker" />
        </CustomMap>
      </Paper>
    </Grid>
  </Grid>
);

const Home = () => <HomeContent />;

export default Home;
