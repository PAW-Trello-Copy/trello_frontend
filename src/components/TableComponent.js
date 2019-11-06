import React, { Component } from 'react';
import ListInTable from "./ListInTable";



class TableComponent extends Component {

    state = {
        isLoading: true,
        lists: [],
        error: null
    }

    constructor(props) {
        super(props);
        var index = window.location.href.indexOf('/tableComponent');
        var urlData = window.location.href.substr(index).replace('/tableComponent/','');
        var arr = urlData.split('/');
        this.tableTitle = arr[0].replace('_',' ');
        this.tableId = parseInt(arr[1],10);
        this.addNewList = this.addNewList.bind(this)
    }

    addNewList() {
        var newListName = document.getElementById("new_list_name").value;
        fetch('https://paw-trello-backend.herokuapp.com/lists/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tableId: this.tableId,
                title: newListName+'',
            })
        })
        window.location.reload();
    }

    render() {
        const { isLoading, lists, error } = this.state
        return (
            <div className="TableListComponent">
                <div>
                    {this.tableTitle}
                </div>
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
                    <div style={styles.container}>
                        <input type="text"
                               id="new_list_name"
                               required="required"
                               value={this.state.body}
                               className="form-control"/>
                        <button onClick={this.addNewList}> Add new list </button>
                    </div>
                </div>
             </div>
          )
    }

    componentDidMount() {
        this.fetchLists();
    }

    fetchLists() {
        fetch('https://paw-trello-backend.herokuapp.com/tables/' + this.tableId + '/lists')
            .then(response => response.json())
            .then(data =>
                this.setState({
                lists: data,
                isLoading: false
            }))
        .catch(error => this.setState({error, isLoading: false }));
    }
}

const styles = {
    listTableStyle: {
      display: "flex",
      flexDirection: "row",
      marginLeft: 10
    },
    container: {
        backgroundColor: "#dfe3e6",
        borderRadius: 3,
        textAlign: "center",
        marginLeft: 10,
        width: 300
    }
};

export default TableComponent;