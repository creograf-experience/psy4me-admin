import React from "react";
import { Route, Redirect } from "react-router-dom";

import { getTokenFromStorage } from "../../utils";

export const HomeRouter = ({ component: Component, ...rest }) => {
  const token = getTokenFromStorage();
  return (
    <Route
      {...rest}
      render={props =>
        token ? <Component {...props} /> : <Redirect to={"/login"} />
      }
    />
  );
};
