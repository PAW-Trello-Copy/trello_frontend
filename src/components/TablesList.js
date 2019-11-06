import React, { Component } from 'react';
import TableInList from "./TableInList";
import CircularProgress from '@material-ui/core/CircularProgress';
import AddTable from "./AddTable"

class TablesList extends Component {

  constructor(props) {
    super(props);
    this.fetchTables = this.fetchTables.bind(this);
  }
  state = {
    isLoading: true,
    tables: [],
    error: null

  }


  render() {
    const { isLoading, tables, error } = this.state
    return (
      <div className="TableListComponent" >
         <div className="buttonAdd">  <AddTable fetchTables={this.fetchTables}/></div>
        {error ? <p>{error.message}</p> : null}
        <div style={styles.listTableStyle}>
          {!isLoading ? (
            tables.map(table => {
              const { title, id } = table;
              return (
                <TableInList title={title} id={id} />);
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
    marginLeft: 10,
    paddingTop:20
  }


};

export default TablesList;
