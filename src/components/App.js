import React, { Component } from 'react';
import TableInList from "./TableInList"
import { connect } from "react-redux"
import MenuTable from "./MenuTable"
import '../style/App.css';
import TablesList from "./TablesList"
import { BrowserRouter } from "react-router-dom";


class App extends Component {

  render() {
    return (
        <BrowserRouter>
            <div className="App">
                <TablesList />
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
