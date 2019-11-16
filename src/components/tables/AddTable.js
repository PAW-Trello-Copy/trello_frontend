import React, { Component } from "react";
//import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import api from "../../networking/api";
import '../../style/AddTable.css'

class AddTable extends Component {


    constructor(props) {
        super(props);
        this.addConfirmed = this.addConfirmed.bind(this);
      }
    state = {
        title: "",
        isInEditMode: false

    };
    addTableMode = () => {      

        return (
            <div className="AddTable">
                <input className="forInput"
                    defaultValue={this.state.value}
                    ref="TableTitleInput"
                />
                <div >
                    <Button  variant="contained" color="primary" className="forButton" onClick={this.addConfirmed}>Ok</Button>
                    <Button  variant="contained" color="secondary" className="forButton" onClick={this.changeEditMode}>X</Button>
                </div>
            </div>);
    }

    changeEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
    }

    reloadTables() {
        this.props.fetchTables();
    }

    addConfirmed() {
        let tableTitle = this.refs.TableTitleInput.value
        api.request({
            url: '/tables/create',
            method: 'POST',
            body: JSON.stringify({
                title: tableTitle
            })
        })
        .then(response => {
            this.reloadTables()
            this.setState({
                isInEditMode: false,
                title: tableTitle
    
            })
        })
        .catch(error => {
            console.log('failed to add table')
        })
    }

    rederAddButtonTable = () => {
        return (
            <div >
                <Button  variant="contained" color="secondary" className="addButton" onClick={this.changeEditMode}>Add Table</Button>
            </div>
        );
    }

    render() {
        const { isInEditMode } = this.state;
        return (
            isInEditMode ?
                this.addTableMode() :
                this.rederAddButtonTable()

        );
    }
}

export default AddTable;