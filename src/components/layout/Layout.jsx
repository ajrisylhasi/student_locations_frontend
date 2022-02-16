import React, { useEffect } from "react";
import axios from "axios";
import { Route, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import Home from "../home/Home";
import Register from "../register/Register";
import { storeContext } from "../provider/Provider";
import { authActions } from "../../store/auth-reducer";

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
      history.push("/");
    } else {
      history.push("/login");
    }
  }, []);

  return (
    <>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/settings">
        <Register />
      </Route>
    </>
  );
};

export default Layout;
