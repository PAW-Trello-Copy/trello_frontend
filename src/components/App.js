import React, { Component } from 'react';
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
