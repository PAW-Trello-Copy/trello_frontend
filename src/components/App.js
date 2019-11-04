import React, { Component } from 'react';
import TableInList from "./TableInList"
import { connect } from "react-redux"
import MenuTable from "./MenuTable"
import '../style/App.css';

class App extends Component {

  fetchTables() {
    fetch('https://paw-trello-backend.herokuapp.com//tables')
      .then(response => response.json())
      .then(data =>
        this.setState({
          tables: data,
          isLoading: false
        }))
      .catch(error => this.setState({error, isLoading: false }));
  }

  constructor() {
    super();
    this.state = { // TODO: MOVE TO SEPARATE COMPONENT!?
      tables: [],
      isLoading: true,
      error: null
    }
  }

  componentDidMount() {
    this.fetchTables();
  }

  render() {
    // const {lists} = this.props;
    const { isLoading, tables, error } = this.state
    return (
      <div className="App">
        // Display a message if we encounter an error
        {error ? <p>{error.message}</p> : null}
        <div style={styles.listTableStyle}>
          {!isLoading ? (
            tables.map(table => {
              const { title, id } = table;
              return (<TableInList title={table.title} id={table.id} />);
            })
          ) : (
              <h3>Loading tables...</h3>
            )}
        </div>
        {/* <div style={styles.listTableStyle}>
          {lists.map(list => <TableInList title={list.title} />)}
        </div> */}


      </div>
    );
  }
}

const styles = {
  listTableStyle: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 10
  }
};

const mapStateToProps = state => ({
  lists: state.lists
})




export default connect(mapStateToProps)(App);
