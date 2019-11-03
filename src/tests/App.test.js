import React from 'react';
import ReactDOM from 'react-dom'; 
import TableInList from './../components/TableInList';



it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TableInList />, div);
});