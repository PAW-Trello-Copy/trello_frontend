import React, { Component } from 'react';
import ListElement from "../lists/ListElement"
import api from '../../networking/api';
import '../../style/MainTableComponent.css'


class MainTableComponent extends Component {

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
        api.request({
            url: '/lists/create',
            method: 'POST',
            body: JSON.stringify({
                tableId: this.tableId,
                title: newListName+'',
            })
        })
        .then(result => this.fetchLists())
        .catch(error => {console.log("failed to add new list")});
    }

    render() {
        const { isLoading, lists, error } = this.state
        return (
            <div className="listClass">
                <div className="title">
                    {this.tableTitle}
                </div>
                {error ? <p>{error.message}</p> : null}
                <div className="ListTableStyle">
                    {!isLoading ? (
                        lists.map(list => {
                            const { title, id } = list;
                            return (<ListElement title={title} id={id} />);
                        })
                    ) : (
                        <h3>Loading lists...</h3>
                    )}
                    <div className="ContainerList">
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
        api.request({
            url: `/tables/${this.tableId}/lists`
        })
        .then(lists => {
            this.setState({
                lists: lists,
                isLoading: false
            })
        })
    }
}



export default MainTableComponent;