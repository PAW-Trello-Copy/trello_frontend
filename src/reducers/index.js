import React from "react";
import { Switch, Route } from "react-router-dom";
import MainTableComponent from "../components/homePage/MainTableComponent";

const AppRouter = () => {
  return (
      <Switch>
        <Route path="/tableComponent" exact component={MainTableComponent}/>
      </Switch>
  );
};

export default AppRouter;
