import React, { Component } from 'react';
import TableInList from "./TableInList"
import { connect } from "react-redux"
import MenuTable from "./MenuTable"
import '../style/App.css';
import TablesList from "./TablesList"

class App extends Component {

  render() {
    return (
      <div className="App">
        <TablesList />
      </div>
    );
  }
}

export default App;
