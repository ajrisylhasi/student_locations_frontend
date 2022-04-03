import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import Settings from "components/users/Settings";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Home from "components/home/Home";
import { authActions } from "store/auth-reducer";
import { storeContext } from "components/provider/Provider";
import Sidebar from "components/layout/Sidebar";
import NewPlace from "components/places/NewPlace";
import Places from "components/places/Places";
import Users from "components/users/Users";
import Events from "components/events/Events";
import NewEvent from "components/events/NewEvent";
import EditPlace from "components/places/EditPlace";

const { REACT_APP_SITE_URL } = process.env;

const Layout = () => {
  const history = useHistory();
  const { dispatch } = React.useContext(storeContext);
  const [cookies] = useCookies(["auth"]);
  const [user, setUser] = useState(false);

  const getMeData = () => {
    axios.get(`${REACT_APP_SITE_URL}/api/me/`).then((res) => {
      dispatch({
        type: authActions.AUTH_SET_ALL,
        payload: {
          user: res.data,
        },
      });
      setUser(true);
    });
    dispatch({
      type: authActions.AUTH_SET_ALL,
      payload: {
        isLoggedIn: true,
      },
    });
  };

  useEffect(() => {
    if (cookies.id) {
      axios.defaults.headers.common.Authorization = cookies.id;
      getMeData();
    } else {
      history.push("/login");
    }
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar />
      {user && (
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Toolbar />
          <Container sx={{ height: "100%", mt: 3 }}>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/new-place">
              <NewPlace />
            </Route>
            <Route exact path={["/new-event", "/new-event/:placeId"]}>
              <NewEvent />
            </Route>
            <Route exact path={["/users/:id/places", "/places"]}>
              <Places />
            </Route>
            <Route
              exact
              path={[
                "/users/:userId/events",
                "/places/:placeId/events",
                "/events",
              ]}
            >
              <Events />
            </Route>
            <Route exact path="/places/:id/edit">
              <EditPlace />
            </Route>
            <Route exact path="/users">
              <Users />
            </Route>
            {/* <Copyright sx={{ mt: 5 }} /> */}
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default Layout;
