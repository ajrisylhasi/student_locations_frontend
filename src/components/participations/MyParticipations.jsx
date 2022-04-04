import React, { useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { storeContext } from "components/provider/Provider";
import Paper from "@mui/material/Paper";
import { layoutActions } from "store/layout-reducer";
import axios from "axios";
import { participationsActions } from "store/participations-reducer";
import { Typography } from "@material-ui/core";
import SelectedParticipationFields from "components/participations/SelectedParticipationFields";

const { REACT_APP_SITE_URL } = process.env;

const Events = () => {
  const { state, dispatch } = useContext(storeContext);

  useEffect(() => {
    dispatch({
      type: layoutActions.LAYOUT_SET_ALL,
      payload: {
        pageTitle: "My Participations",
      },
    });
  }, []);

  const refreshParticipations = () => {
    axios.get(`${REACT_APP_SITE_URL}/api/me/participations/`).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: participationsActions.PARTICIPATIONS_SET_ALL,
          payload: {
            allParticipations: res.data,
          },
        });
      }
    });
  };
  useEffect(() => {
    refreshParticipations();
  }, []);

  return (
    <Grid container spacing={3} sx={{ height: "100%" }} pb={2}>
      {state.participations.allParticipations.length === 0 && (
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
      {state.participations.allParticipations.map((participation) => (
        <Grid item xs={12} md={6} xl={4} key={participation.id}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              minHeight: 140,
            }}
          >
            <SelectedParticipationFields
              participation={participation}
              refresh={refreshParticipations}
            />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Events;
