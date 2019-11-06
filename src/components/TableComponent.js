import React, { Component } from 'react';
import ListInTable from "./ListInTable"
import { connect } from "react-redux"


class TableComponent extends Component {

    state = {
        isLoading: true,
        lists: [],
        error: null
    }

    render() {
        const { isLoading, lists, error } = this.state
        return (
          <div className="TableListComponent">
            {error ? <p>{error.message}</p> : null}
            <div style={styles.listTableStyle}>
              {!isLoading ? (
                lists.map(list => {
                  const { title, id } = list;
                  return (<ListInTable title={title} id={id} />);
                })
              ) : (
                  <h3>Loading lists...</h3>
                )}
            </div>
          </div>
          )
    }

    componentDidMount() {
        this.fetchLists();
    }

    fetchLists() {
      fetch('https://paw-trello-backend.herokuapp.com/tables/1/lists')
        .then(response => response.json())
        .then(data =>
          this.setState({
            lists: data,
            isLoading: false
          }))
        .catch(error => this.setState({error, isLoading: false }));
        console.log(this.state.lists);
    }
}

const styles = {
    listTableStyle: {
      display: "flex",
      flexDirection: "row",
      marginLeft: 10
    }
  };

export default TableComponent;