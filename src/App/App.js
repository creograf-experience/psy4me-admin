import React, { Component } from "react";
import { Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { cyan, red } from "@material-ui/core/colors";

import CssBaseline from "@material-ui/core/CssBaseline";

import "./App.scss";

import { HomeRouter, Login, Home } from "../components";

const theme = createMuiTheme({
  palette: {
    primary: {
      extralight: cyan[50],
      light: cyan[300],
      main: cyan[500],
      dark: cyan[700]
    },
    error: { light: red[300], main: red[500], dark: red[700] }
  },
  typography: {
    useNextVariants: true
  }
});

class AppComponent extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <CssBaseline />

          <Route path="/login" component={Login} />

          <HomeRouter path="/" component={Home} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default AppComponent;
