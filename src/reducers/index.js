import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux"
import TableComponent from "../components/TableComponent"

const AppRouter = () => {
  return (
      <Switch>
        <Route path="/tableComponent" exact component={TableComponent}/>
      </Switch>
  );
};

export default AppRouter;