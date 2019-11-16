import React, { Component } from 'react';
import '../style/App.css';
import MainTableComponent from "./homePage/MainTableComponent"
import { BrowserRouter, Route } from "react-router-dom";
import '../style/App.css';
import TablesList from './tables/TablesList';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
            <div className="App">
                <Route exact path="/" component={TablesList} />
                <Route path="/tableComponent" component={MainTableComponent} />
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
