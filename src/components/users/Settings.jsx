import React, { useContext, useEffect } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { storeContext } from "components/provider/Provider";
import { authActions } from "store/auth-reducer";
import { layoutActions } from "../../store/layout-reducer";

const { REACT_APP_SITE_URL } = process.env;
const Settings = () => {
  const { state, dispatch } = useContext(storeContext);

  useEffect(() => {
    dispatch({
      type: layoutActions.LAYOUT_SET_ALL,
      payload: {
        pageTitle: "Settings",
      },
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      user: {
        username: formData.get("username"),
        fullname: formData.get("fullname"),
        faculty: formData.get("faculty"),
        course: formData.get("course"),
        nationality: formData.get("nationality"),
      },
    };
    axios.patch(`${REACT_APP_SITE_URL}/api/me/`, data).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: authActions.AUTH_SET_ALL,
          payload: {
            user: res.data,
          },
        });
        dispatch({
          type: layoutActions.LAYOUT_SET_ALL,
          payload: {
            openMessage: true,
            error: false,
            signalMessage: "Account Updated!",
          },
        });
      } else {
        dispatch({
          type: layoutActions.LAYOUT_SET_ALL,
          payload: {
            openMessage: true,
            error: true,
            signalMessage: "Something went wrong!",
          },
        });
      }
    });
  };

  return (
    <Box
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Profile Information
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              defaultValue={state.auth.user.username}
              autoComplete="username"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="fullname"
              label="Full Name"
              name="fullname"
              autoComplete="fullname"
              defaultValue={state.auth.user.fullname}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="faculty"
              label="Faculty"
              id="faculty"
              autoComplete="faculty"
              defaultValue={state.auth.user.faculty}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="course"
              label="Course"
              id="course"
              autoComplete="course"
              defaultValue={state.auth.user.course}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="nationality"
              label="Nationality"
              id="nationality"
              autoComplete="nationality"
              defaultValue={state.auth.user.nationality}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update Settings
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;
