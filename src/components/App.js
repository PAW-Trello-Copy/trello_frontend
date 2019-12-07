import React, { Component } from 'react';
import '../style/App.css';
import MainTableComponent from "./homePage/MainTableComponent"
import AppHeader from "./homePage/AppHeader"
import { BrowserRouter, Route } from "react-router-dom";
import '../style/App.css';
import TablesList from './tables/TablesList';
import Login from './login/Login';
import Registration from './registration/Registration';


class App extends Component {

  render() {
    return (
      <BrowserRouter>
            <div className="App">
            <AppHeader/>
              <div className="App2">

                <Route exact path="/"component={Registration}/>
                <Route exact path="/"component={Login}/>  
                </div>              
                <Route exact path="/home" component={TablesList} />
                <Route path="/tableComponent" component={MainTableComponent} />
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
