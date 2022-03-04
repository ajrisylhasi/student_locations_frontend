import React, { useEffect } from "react";
import axios from "axios";
import { Route, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import Settings from "components/users/Settings";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Home from "../home/Home";
import { storeContext } from "../provider/Provider";
import { authActions } from "../../store/auth-reducer";
import Sidebar from "./Sidebar";
import Copyright from "../../shared/components/Copyright";

const { REACT_APP_SITE_URL } = process.env;

const Layout = () => {
  const history = useHistory();
  const { dispatch } = React.useContext(storeContext);
  const [cookies] = useCookies(["auth"]);

  const getData = () => {
    axios.get(`${REACT_APP_SITE_URL}/api/me/`).then((res) => {
      dispatch({
        type: authActions.AUTH_SET_ALL,
        payload: {
          user: res.data,
        },
      });
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
      getData();
    } else {
      history.push("/login");
    }
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar />
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
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
