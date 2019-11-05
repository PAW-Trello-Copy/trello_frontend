import React, { Component } from 'react';
import TableInListOfTables from "./TableInListOfTables";
import CircularProgress from '@material-ui/core/CircularProgress';


class TablesList extends Component {

  state = {
    isLoading: true,
    tables: [],
    error: null

  }


  render() {
    const { isLoading, tables, error } = this.state
    return (
      <div className="TableListComponent" >
        {error ? <p>{error.message}</p> : null}
        <div style={styles.listTableStyle}>
          {!isLoading ? (
            tables.map(table => {
              const { title, id } = table;
              return (

                <TableInListOfTables title={title} id={id} />);
            })
          ) : (
              <CircularProgress color="secondary" />
            )}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.fetchTables();
  }

  fetchTables() {
    fetch('https://paw-trello-backend.herokuapp.com/tables')
      .then(response => response.json())
      .then(data =>
        this.setState({
          tables: data,
          isLoading: false
        }))
      .catch(error => this.setState({ error, isLoading: false }));
  }
}

const styles = {
  listTableStyle: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 10
  }


};

export default TablesList;