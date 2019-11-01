import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux"  //The <Provider /> makes the Redux store available to any nested components that have been wrapped in the connect() function.
import App from './components/App';
import store from "./store/store"

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store ={store}><App /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
