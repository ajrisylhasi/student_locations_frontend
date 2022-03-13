import * as React from "react";
import { useMediaQuery } from "react-responsive";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Map from "components/maps/Map";
import Marker from "components/maps/Marker";
import Deposits from "components/home/Deposits";

const HomeContent = () => {
  const isPhone = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <Grid container spacing={3} sx={{ height: "100%" }}>
      {!isPhone && (
        <Grid item xs={12} md={4} xl={2}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Deposits />
          </Paper>
        </Grid>
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
            <Marker lat={47.5289} lng={21.6254} text="This is a test marker" />
          </Map>
        </Paper>
      </Grid>
    </Grid>
  );
};

const Home = () => <HomeContent />;

export default Home;
