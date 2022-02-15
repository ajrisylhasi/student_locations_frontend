import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Typography } from "@material-ui/core";
import theme from "../../theme";
import Provider from "../provider/Provider";

function App() {
  return (
    <Provider>
      <ThemeProvider theme={theme}>
        <div className="root" data-testid="app_test_id">
          <Router>
            <Routes>
              <Route path={["/login"]}>
                <Typography>Login</Typography>
              </Route>
              <Route path={["/reset-password/:email/:code", "/reset-password"]}>
                <Typography>Reset Password</Typography>
              </Route>
              <Route path={["/register/:email/:code", "/register"]}>
                <Typography>Register</Typography>
              </Route>
              <Route path={["", "/"]}>
                <Typography>Main Page</Typography>
                <p>hello</p>
              </Route>
              <Route>
                <Navigate to="/" />
              </Route>
            </Routes>
          </Router>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
