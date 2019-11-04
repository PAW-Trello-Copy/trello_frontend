import React, { Component } from 'react';
import TableInListOfTables from "./TableInListOfTables"
import { connect } from "react-redux"
import MenuTable from "./menuTable/MenuTable"
import '../style/App.css';
import TablesList from "./TablesList"

class App extends Component {

  render() {
    return (
      <div className="App">
        <MenuTable />
        <TablesList />
      </div>
    );
  }
}

export default App;
