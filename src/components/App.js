import React, { Component } from 'react';
import TableInList from "./TableInList"
import { connect } from "react-redux"
import MenuTable from "./MenuTable"
import '../style/App.css';
import TablesList from "./TablesList"
import TableComponent from "./TableComponent"
import { BrowserRouter, Route } from "react-router-dom";


class App extends Component {

  render() {
    return (
        <BrowserRouter>
            <div className="App">
                <Route exact path="/" component={TablesList} />
                <Route path="/tableComponent" component={TableComponent} />
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
