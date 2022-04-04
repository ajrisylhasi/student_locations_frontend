import React, { useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { storeContext } from "components/provider/Provider";
import Paper from "@mui/material/Paper";
import { layoutActions } from "store/layout-reducer";
import axios from "axios";
import { eventsActions } from "store/events-reducer";
import { Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import SelectedEventFields from "./SelectedEventFields";

const { REACT_APP_SITE_URL } = process.env;

const Events = () => {
  const { placeId, userId } = useParams();
  const { state, dispatch } = useContext(storeContext);

  const getTitle = () => {
    if (userId) {
      return "User Events";
    }
    if (placeId) {
      return "Place Events";
    }
    return "Events";
  };

  const getRequest = () => {
    if (userId) {
      return `users/${userId}/`;
    }
    if (placeId) {
      return `places/${placeId}/`;
    }
    return "";
  };

  useEffect(() => {
    dispatch({
      type: layoutActions.LAYOUT_SET_ALL,
      payload: {
        pageTitle: getTitle(),
      },
    });
  }, [placeId, userId]);

  const refreshEvents = () => {
    axios
      .get(`${REACT_APP_SITE_URL}/api/${getRequest()}events/`)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: eventsActions.EVENTS_SET_ALL,
            payload: {
              allEvents: res.data,
            },
          });
        }
      });
  };

  useEffect(() => {
    refreshEvents();
  }, [userId, placeId]);

  return (
    <Grid container spacing={3} sx={{ height: "100%" }} pb={2}>
      {state.events.allEvents.length === 0 && (
        <Grid item xs={12} md={6} xl={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography component="p" variant="h5">
              No Events
            </Typography>
          </Paper>
        </Grid>
      )}
      {state.events.allEvents.map((event) => (
        <Grid item xs={12} md={6} xl={4} key={event.id}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              minHeight: 140,
            }}
          >
            <SelectedEventFields event={event} refresh={refreshEvents} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Events;
