import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import React from "react";
import { ThemeProvider } from "@mui/material";
import Login from "components/users/Login";
import Register from "components/users/Register";
import Layout from "components/layout/Layout";
import generalTheme from "theme";
import Provider from "components/provider/Provider";
import SignalHandler from "components/layout/SignalHandler";

const App = () => (
  <Provider>
    <ThemeProvider theme={generalTheme}>
      <div className="root" data-testid="app_test_id">
        <SignalHandler />
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
            <Route path={["", "/", "/settings"]}>
              <Layout />
            </Route>
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  </Provider>
);

export default App;
