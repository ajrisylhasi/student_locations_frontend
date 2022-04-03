import React, { useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { storeContext } from "components/provider/Provider";
import Paper from "@mui/material/Paper";
import { layoutActions } from "store/layout-reducer";
import axios from "axios";
import { usersActions } from "store/users-reducer";
import SelectedUserFields from "components/users/SelectedUserFields";

const { REACT_APP_SITE_URL } = process.env;

const Users = () => {
  const { state, dispatch } = useContext(storeContext);

  useEffect(() => {
    dispatch({
      type: layoutActions.LAYOUT_SET_ALL,
      payload: {
        pageTitle: "Users",
      },
    });
  }, []);

  useEffect(() => {
    axios.get(`${REACT_APP_SITE_URL}/api/users/`).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: usersActions.USERS_SET_ALL,
          payload: {
            allUsers: res.data,
          },
        });
      }
    });
  }, []);

  return (
    <Grid container spacing={3} sx={{ height: "100%" }}>
      {state.users.allUsers.map((user) => (
        <Grid item xs={12} md={6} xl={4} key={user.id}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <SelectedUserFields user={user} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Users;
