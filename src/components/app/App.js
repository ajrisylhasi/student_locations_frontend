import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import React from "react";
// import { ThemeProvider } from "@mui/material/styles";
// // import { Typography } from "@material-ui/core";
// import theme from "../../theme";
import Provider from "../provider/Provider";
import Login from "../login/Login";
import Register from "../register/Register";
// import Home from "../home/Home";
import Layout from "../layout/Layout";

function App() {
  return (
    <Provider>
      <div className="root" data-testid="app_test_id">
        <Router>
          <Switch>
            <Route path={["/login"]}>
              <Login />
            </Route>
            <Route path={["/reset-password/:email/:code", "/reset-password"]}>
              <p>Reset Password</p>
            </Route>
            <Route path={["/register/:email/:code", "/register"]}>
              <Register />
            </Route>
            <Route path={["", "/"]}>
              <Layout />
            </Route>
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
