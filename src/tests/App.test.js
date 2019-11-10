import React from 'react';
import ReactDOM from 'react-dom'; 
import TablesList from '../components/tables/TablesList';



it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TablesList />, div);
});